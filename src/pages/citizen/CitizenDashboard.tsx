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

const issuesData = [
  {
    id: "ISS-001",
    title: "Pothole on Main Street",
    category: "Road",
    status: "in-progress" as const,
    date: "2024-01-15",
  },
  {
    id: "ISS-002",
    title: "Street light not working",
    category: "Electricity",
    status: "pending" as const,
    date: "2024-01-14",
  },
  {
    id: "ISS-003",
    title: "Garbage pile near park",
    category: "Sanitation",
    status: "resolved" as const,
    date: "2024-01-10",
  },
  {
    id: "ISS-004",
    title: "Water leakage on 5th Avenue",
    category: "Water",
    status: "in-progress" as const,
    date: "2024-01-12",
  },
  {
    id: "ISS-005",
    title: "Broken bench in Central Park",
    category: "Public Property",
    status: "pending" as const,
    date: "2024-01-11",
  },
];

export default function CitizenDashboard() {
  const totalIssues = issuesData.length;
  const resolvedIssues = issuesData.filter((i) => i.status === "resolved").length;
  const pendingIssues = issuesData.filter((i) => i.status === "pending").length;

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
                {issuesData.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium text-primary">
                      {issue.id}
                    </TableCell>
                    <TableCell>{issue.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {issue.category}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={issue.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {issue.date}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/citizen/issues/${issue.id}`}>
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
          </div>
        </div>
      </main>
    </div>
  );
}
