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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { issueService } from "@/services/issueService";
import { Issue } from "@/types";

export default function OfficerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ['issues', 'officer'],
    queryFn: () => issueService.getAllIssues({ limit: 100 }),
  });

  const issues = data?.data || [];

  const filteredIssues = issues.filter((issue: Issue) => {
    const matchesSearch =
      (issue.reportedBy?.name || "Unknown").toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === "all" || issue.region === filterRegion;
    const matchesPriority = filterPriority === "all" || (issue.priority || 'medium') === filterPriority; // API might not return priority always
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus;

    return matchesSearch && matchesRegion && matchesPriority && matchesStatus;
  });

  const totalComplaints = issues.length;
  const highPriority = issues.filter((i: Issue) => i.priority === "high").length;
  const unassigned = issues.filter((i: Issue) => i.status === "open").length;
  const resolvedCount = issues.filter((i: Issue) => i.status === "resolved" || i.status === "closed").length;
  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedCount / totalComplaints) * 100) : 0;

  return (
    <div className="flex min-h-screen bg-background">
      <OfficerSidebar />

      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Officer Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and resolve citizen complaints
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Complaints"
              value={totalComplaints}
              icon={FileText}
              variant="primary"
            />
            <StatCard
              title="High Priority"
              value={highPriority}
              icon={AlertTriangle}
              variant="default"
            />
            <StatCard
              title="Unassigned"
              value={unassigned}
              icon={UserX}
              variant="accent"
            />
            <StatCard
              title="Resolution Rate"
              value={`${resolutionRate}%`}
              icon={TrendingUp}
              variant="secondary"
            />
          </div>

          {/* Filters */}
          <div className="bg-card rounded-xl shadow-card border border-border/50 mb-6 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by citizen or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Downtown">Downtown</SelectItem>
                  {/* Add more regions dynamically if possible */}
                </SelectContent>
              </Select>
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

          {/* Issues Table */}
          <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Incoming Complaints
              </h2>
            </div>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-8 text-center text-muted-foreground">Loading complaints...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Citizen</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIssues.map((issue: Issue) => (
                      <TableRow key={issue._id}>
                        <TableCell className="font-medium text-primary">
                          {issue._id.substring(0, 8)}...
                        </TableCell>
                        <TableCell>{issue.reportedBy?.name || "Anonymous"}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {issue.category}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={issue.priority || 'medium'} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={issue.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link to={`/officer/issues/${issue._id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            {issue.status === "open" && (
                              <Button variant="outline" size="sm" className="gap-1">
                                <UserPlus className="h-3 w-3" />
                                Assign
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
