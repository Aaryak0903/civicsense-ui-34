import { OfficerSidebar } from "@/components/layout/OfficerSidebar";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  FileText,
  AlertTriangle,
  UserX,
  TrendingUp,
  Search,
  Eye,
  UserPlus,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { issueService } from "@/services/issueService";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import useIssueTracker from "@/hooks/useIssueTracker";
import { Issue } from "@/types";
import { useEffect } from "react";

export default function OfficerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const updates = useIssueTracker();

  useEffect(() => {
    if (updates.length > 0) {
      const latest = updates[0];
      let title = "Update Received";
      let description = "Data has been updated.";

      if (latest.type === 'ISSUE_CREATED') {
        title = "New Issue Reported";
        const issueText = latest.data.text || latest.data.title || 'New issue in your area';
        description = `A new issue was reported: ${issueText.substring(0, 50)}${issueText.length > 50 ? '...' : ''}`;
      } else if (latest.type === 'ISSUE_UPDATED') {
        title = "Issue Updated";
        description = `Issue status changed to: ${latest.data.status}`;
      } else if (latest.type === 'ISSUE_UPVOTED') {
        title = "Issue Upvoted";
        description = "An issue has been upvoted!";
      }

      toast({
        title: title,
        description: description,
      });
    }
  }, [updates, toast]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ['issues', 'officer', filterStatus],
    queryFn: () => issueService.getOfficerDashboardIssues({
      status: filterStatus === 'all' ? undefined : filterStatus,
      limit: 100
    }),
  });

  const queryClient = useQueryClient();

  const handleStatusUpdate = async (issueId: string, newStatus: string) => {
    try {
      await issueService.updateIssueStatus(issueId, newStatus);
      toast({
        title: "Status Updated",
        description: `Issue status changed to ${newStatus}`,
      });
      // Invalidate queries to refresh the list
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    } catch (error) {
      console.error("Failed to update status:", error);
      toast({
        title: "Update Failed",
        description: "Could not update issue status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const issues = data?.data || [];

  // Filter and Sort Issues
  const filteredIssues = issues
    .filter((issue: Issue) => {
      // 1. Search filter
      const matchesSearch =
        (issue.reportedBy?.name || "Unknown").toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue._id.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Priority filter
      const matchesPriority = filterPriority === "all" || (issue.priority || 'medium').toLowerCase() === filterPriority;

      // 3. Location filter (Officer Location == Issue Location/Region)
      const officerLocation = user?.location?.address?.toLowerCase() || "";
      const issueLocation = issue.location?.address?.toLowerCase() || "";
      const issueRegion = issue.region?.toLowerCase() || "";

      // Check if officer location matches issue region or issue address contains officer location keywords
      const matchesLocation = !officerLocation ||
        issueRegion.includes(officerLocation) ||
        officerLocation.includes(issueRegion) ||
        issueLocation.includes(officerLocation);

      return matchesSearch && matchesPriority && matchesLocation;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by newest first

  const totalComplaints = issues.length;
  const highPriority = issues.filter((i: Issue) => (i.priority || "medium").toLowerCase() === "high").length;
  const resolvedCount = issues.filter((i: Issue) => i.status === "resolved" || i.status === "closed").length;
  const pendingCount = totalComplaints - resolvedCount;
  const inProgressCount = issues.filter((i: Issue) => i.status === "in-progress").length;

  return (
    <div className="flex min-h-screen bg-background font-sans selection:bg-primary/10">
      <OfficerSidebar />

      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0 animate-slide-up">
        <div className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Officer Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Showing issues within 10km of your registered location.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Issues Solved"
              value={resolvedCount}
              icon={CheckCircle2}
              variant="primary"
            />
            <StatCard
              title="Issues Pending"
              value={pendingCount}
              icon={Clock}
              variant="secondary"
            />
            <StatCard
              title="High Priority"
              value={highPriority}
              icon={AlertTriangle}
              variant="accent"
            />
            <StatCard
              title="In Progress"
              value={inProgressCount}
              icon={TrendingUp}
              variant="default"
            />
          </div>

          {/* Filters */}
          <div className="bg-card rounded-xl shadow-card border border-border/50 mb-6 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by description or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Issues List (One below the other) */}
          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">
              Assigned Area Issues
            </h2>

            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground">Loading complaints...</div>
            ) : filteredIssues.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-border rounded-xl bg-muted/30">
                <p className="text-muted-foreground">No issues found matching your criteria.</p>
              </div>
            ) : (
              filteredIssues.map((issue: Issue) => (
                <div key={issue._id} className="bg-card rounded-xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image Section */}
                    {issue.imageLink && (
                      <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <img src={issue.imageLink} alt="Issue" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold border border-border rounded px-2 py-0.5">
                              {issue.category}
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                            {issue.text.split('\n')[0] || "Issue Report"}
                          </h3>
                        </div>
                        <div className="hidden sm:block text-right">
                          <span className="text-xs text-muted-foreground block">Reported on</span>
                          <span className="text-sm font-medium">
                            {new Date(issue.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {issue.text}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>ID: {issue._id.substring(0, 8)}...</span>
                        </div>
                        {issue.reportedBy && (
                          <div className="flex items-center gap-1">
                            <UserX className="h-4 w-4" />
                            <span>{issue.reportedBy.name || "Anonymous"}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          <span className="capitalize">{issue.priority || 'medium'} Priority</span>
                        </div>
                      </div>
                    </div>

// In the component body, modify actions part for each issue map
                    {/* Actions */}
                    <div className="flex md:flex-col justify-end items-end gap-3 md:justify-center border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                      <Select
                        defaultValue={issue.status}
                        onValueChange={(value) => handleStatusUpdate(issue._id, value)}
                      >
                        <SelectTrigger className="w-full h-8 text-xs bg-background">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>

                      <Link to={`/officer/issues/${issue._id}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
