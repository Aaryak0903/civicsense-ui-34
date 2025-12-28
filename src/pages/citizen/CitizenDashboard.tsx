import { Link } from "react-router-dom";
import { CitizenNavbar } from "@/components/layout/CitizenNavbar";
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
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { issueService } from "@/services/issueService";
import { useAuth } from "@/context/AuthContext";
import { Issue } from "@/types";

export default function CitizenDashboard() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['issues'],
    queryFn: () => issueService.getAllIssues(),
  });

  const issues = data?.data || [];

  // Filter for my issues
  const myIssues = issues.filter((issue: Issue) => issue.reportedBy?._id === user?._id);

  const totalIssues = myIssues.length;
  const resolvedIssues = myIssues.filter((i: Issue) => i.status === "resolved").length;
  const pendingIssues = myIssues.filter((i: Issue) => i.status === "open" || i.status === "in-progress").length;

  return (
    <div className="min-h-screen bg-background">
      <CitizenNavbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              My Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your reported issues
            </p>
          </div>
          <Link to="/citizen/report">
            <Button variant="hero" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Report New Issue
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Total Reported"
            value={totalIssues}
            icon={FileText}
            variant="primary"
          />
          <StatCard
            title="Resolved"
            value={resolvedIssues}
            icon={CheckCircle2}
            variant="secondary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Pending"
            value={pendingIssues}
            icon={Clock}
            variant="accent"
          />
        </div>

        {/* Issues Table */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-display text-lg font-semibold text-foreground">
              My Issues
            </h2>
          </div>
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground">Loading issues...</div>
            ) : myIssues.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No issues reported yet.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myIssues.map((issue: Issue) => (
                    <TableRow key={issue._id}>
                      <TableCell className="font-medium text-primary">
                        {issue._id.substring(0, 8)}...
                      </TableCell>
                      <TableCell>{issue.text.substring(0, 30)}...</TableCell>
                      <TableCell className="text-muted-foreground">
                        {issue.category}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={issue.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/citizen/issues/${issue._id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            View
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
