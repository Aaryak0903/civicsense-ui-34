import { Link } from "react-router-dom";
import { CitizenSidebar } from "@/components/layout/CitizenSidebar";
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
  FileText,
  CheckCircle2,
  Clock,
  PlusCircle,
  ExternalLink,
  MapPin,
} from "lucide-react";

// Helper to extract a displayable location string
const cityExtract = (addr: string | undefined) => {
  if (!addr) return null;
  const parts = addr.split(',');
  // simplistic extraction: return first part or last part (city/zip)
  return parts.slice(0, 2).join(', ');
};
import { useQuery } from "@tanstack/react-query";
import { issueService } from "@/services/issueService";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import useIssueTracker from "@/hooks/useIssueTracker";
import { Issue } from "@/types";
import { useEffect } from "react";

export default function CitizenDashboard() {
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
        // Adjust based on actual data structure, assuming text or title exists
        const issueText = latest.data.text || latest.data.title || 'Check the community feed';
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

  // Fetch my issues for stats and history
  const { data: myData, isLoading: isLoadingMy } = useQuery({
    queryKey: ['issues', 'my'],
    queryFn: () => issueService.getMyIssues({ limit: 100 }),
  });

  // Fetch all issues for Community Issues section
  const { data: communityData, isLoading: isLoadingCommunity } = useQuery({
    queryKey: ['issues', 'community'],
    queryFn: () => issueService.getAllIssues({ limit: 50 }),
  });

  const myIssues = myData?.data || [];
  const communityIssues = communityData?.data || [];

  const totalIssues = myIssues.length;
  const resolvedIssues = myIssues.filter((i: Issue) => i.status === "resolved" || i.status === "closed").length;
  const pendingIssues = totalIssues - resolvedIssues;

  const recentMyIssues = myIssues.slice(0, 3);

  return (
    <div className="flex min-h-screen bg-background font-sans selection:bg-primary/10">
      <CitizenSidebar />

      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0 animate-slide-up">
        <div className="p-4 md:p-6 lg:p-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Citizen Overview
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your reported issues
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard
              title="Total Reported"
              value={totalIssues}
              icon={FileText}
              variant="secondary"
            />
            <StatCard
              title="Resolved"
              value={resolvedIssues}
              icon={CheckCircle2}
              variant="secondary"
            />
            <StatCard
              title="Pending"
              value={pendingIssues}
              icon={Clock}
              variant="secondary"
            />
          </div>

          {/* My Recent Issues section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">
                My Recent Issues
              </h2>
              <Link to="/citizen/my-issues">
                <Button variant="link" className="text-primary hover:underline group">
                  View All My Issues <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingMy ? (
                <div className="col-span-full p-8 text-center text-muted-foreground border border-dashed rounded-xl">Loading your issues...</div>
              ) : recentMyIssues.length === 0 ? (
                <div className="col-span-full p-8 text-center bg-card/50 border border-dashed rounded-xl flex flex-col items-center gap-4">
                  <p className="text-muted-foreground">You haven't reported any issues yet.</p>
                  <Link to="/citizen/report">
                    <Button variant="hero" size="sm" className="gap-2">
                      <PlusCircle className="h-4 w-4" /> Report Your First Issue
                    </Button>
                  </Link>
                </div>
              ) : (
                recentMyIssues.map((issue: Issue) => (
                  <div key={issue._id} className="group flex flex-col bg-card rounded-xl border border-border transition-all duration-300 hover:shadow-md hover:border-primary/20 overflow-hidden">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {issue.imageLink ? (
                        <img
                          src={issue.imageLink}
                          alt="Issue"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted/50 text-muted-foreground/30">
                          <FileText className="h-10 w-10" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <StatusBadge status={issue.status} className="bg-background/90 backdrop-blur shadow-sm" />
                      </div>
                    </div>

                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded-md font-medium text-foreground">
                          {issue.category}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {issue.text.split('\n')[0] || "Issue Report"}
                      </h3>

                      <div className="mt-auto pt-4">
                        <Link to={`/citizen/issues/${issue._id}`}>
                          <Button variant="outline" size="sm" className="w-full bg-background hover:bg-muted group-hover:border-primary/30">
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

          {/* Community Issues across platform */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-foreground">
                Community Issues
              </h2>
              {/* Optional: Add location filter or sort here if needed, but for now just listing all */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingCommunity ? (
                <div className="col-span-full p-12 text-center text-muted-foreground">Loading community issues...</div>
              ) : communityIssues.length === 0 ? (
                <div className="col-span-full p-12 text-center text-muted-foreground">No issues reported in the community yet.</div>
              ) : (
                communityIssues.map((issue: Issue) => (
                  <div key={issue._id} className="group flex flex-col bg-card rounded-xl border border-border transition-all duration-300 hover:shadow-md hover:border-primary/20 overflow-hidden">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {issue.imageLink ? (
                        <img
                          src={issue.imageLink}
                          alt="Issue"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted/50 text-muted-foreground/30">
                          <FileText className="h-10 w-10" />
                        </div>
                      )}

                      <div className="absolute top-2 right-2">
                        <StatusBadge status={issue.status} className="bg-background/90 backdrop-blur shadow-sm" />
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1.5 rounded-lg max-w-fit">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{issue.region || cityExtract(issue.location?.address) || "Unknown Location"}</span>
                      </div>
                    </div>

                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {issue.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {issue.text.split('\n')[0] || "Issue Report"}
                      </h3>

                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                        {issue.text}
                      </p>

                      <div className="mt-auto">
                        <Link to={`/citizen/issues/${issue._id}`}>
                          <Button variant="outline" size="sm" className="w-full bg-background hover:bg-muted group-hover:border-primary/30">
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
        </div>
      </main>
    </div>
  );
}
