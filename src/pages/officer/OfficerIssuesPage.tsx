import { OfficerSidebar } from "@/components/layout/OfficerSidebar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Search, Eye, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const issuesData = [
  {
    id: "ISS-001",
    citizen: "John Smith",
    title: "Large pothole on Main Street",
    category: "Pothole",
    severity: "high" as const,
    status: "pending" as const,
    region: "Downtown",
    date: "2024-01-15",
  },
  {
    id: "ISS-002",
    citizen: "Sarah Johnson",
    title: "Street light not working",
    category: "Street Light",
    severity: "medium" as const,
    status: "in-progress" as const,
    region: "Suburb East",
    date: "2024-01-14",
  },
  {
    id: "ISS-003",
    citizen: "Mike Brown",
    title: "Garbage pile near community park",
    category: "Garbage",
    severity: "low" as const,
    status: "resolved" as const,
    region: "North District",
    date: "2024-01-13",
  },
  {
    id: "ISS-004",
    citizen: "Emily Davis",
    title: "Water leakage flooding street",
    category: "Water Leakage",
    severity: "high" as const,
    status: "pending" as const,
    region: "Downtown",
    date: "2024-01-12",
  },
  {
    id: "ISS-005",
    citizen: "Robert Wilson",
    title: "Clogged drainage causing flooding",
    category: "Drainage",
    severity: "medium" as const,
    status: "in-progress" as const,
    region: "Industrial Zone",
    date: "2024-01-11",
  },
  {
    id: "ISS-006",
    citizen: "Lisa Martinez",
    title: "Broken bench in central park",
    category: "Public Property",
    severity: "low" as const,
    status: "pending" as const,
    region: "North District",
    date: "2024-01-10",
  },
  {
    id: "ISS-007",
    citizen: "David Lee",
    title: "Traffic signal malfunction",
    category: "Traffic Signal",
    severity: "high" as const,
    status: "in-progress" as const,
    region: "Suburb East",
    date: "2024-01-09",
  },
];

export default function OfficerIssuesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const filteredIssues = issuesData.filter((issue) => {
    const matchesSearch =
      issue.citizen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === "all" || issue.severity === filterSeverity;
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <OfficerSidebar />

      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              All Issues
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage all reported civic issues
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-xl shadow-card border border-border/50 mb-6 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, citizen, or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Citizen</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium text-primary">
                        {issue.id}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {issue.title}
                      </TableCell>
                      <TableCell>{issue.citizen}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {issue.category}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={issue.severity} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={issue.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {issue.date}
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

          {filteredIssues.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No issues found matching your filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
