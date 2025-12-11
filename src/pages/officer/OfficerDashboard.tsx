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

const issuesData = [
  {
    id: "ISS-001",
    citizen: "John Smith",
    category: "Pothole",
    severity: "high" as const,
    sentiment: "Negative",
    status: "pending" as const,
    region: "Downtown",
  },
  {
    id: "ISS-002",
    citizen: "Sarah Johnson",
    category: "Street Light",
    severity: "medium" as const,
    sentiment: "Neutral",
    status: "in-progress" as const,
    region: "Suburb East",
  },
  {
    id: "ISS-003",
    citizen: "Mike Brown",
    category: "Garbage",
    severity: "low" as const,
    sentiment: "Neutral",
    status: "resolved" as const,
    region: "North District",
  },
  {
    id: "ISS-004",
    citizen: "Emily Davis",
    category: "Water Leakage",
    severity: "high" as const,
    sentiment: "Very Negative",
    status: "pending" as const,
    region: "Downtown",
  },
  {
    id: "ISS-005",
    citizen: "Robert Wilson",
    category: "Drainage",
    severity: "medium" as const,
    sentiment: "Negative",
    status: "in-progress" as const,
    region: "Industrial Zone",
  },
];

export default function OfficerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredIssues = issuesData.filter((issue) => {
    const matchesSearch =
      issue.citizen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === "all" || issue.region === filterRegion;
    const matchesSeverity = filterSeverity === "all" || issue.severity === filterSeverity;
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus;
    return matchesSearch && matchesRegion && matchesSeverity && matchesStatus;
  });

  const totalComplaints = issuesData.length;
  const highPriority = issuesData.filter((i) => i.severity === "high").length;
  const unassigned = issuesData.filter((i) => i.status === "pending").length;

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
              trend={{ value: 8, isPositive: true }}
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
              value="94%"
              icon={TrendingUp}
              variant="secondary"
              trend={{ value: 5, isPositive: true }}
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
                  <SelectItem value="Downtown">Downtown</SelectItem>
                  <SelectItem value="Suburb East">Suburb East</SelectItem>
                  <SelectItem value="North District">North District</SelectItem>
                  <SelectItem value="Industrial Zone">Industrial Zone</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Citizen</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium text-primary">
                        {issue.id}
                      </TableCell>
                      <TableCell>{issue.citizen}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {issue.category}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={issue.severity} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {issue.sentiment}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={issue.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={`/officer/issues/${issue.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          {issue.status === "pending" && (
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
