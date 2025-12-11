import { Link } from "react-router-dom";
import { CitizenNavbar } from "@/components/layout/CitizenNavbar";
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
import { Search, ExternalLink, PlusCircle } from "lucide-react";
import { useState } from "react";

const issuesData = [
  {
    id: "ISS-001",
    title: "Pothole on Main Street",
    category: "Road",
    status: "in-progress" as const,
    date: "2024-01-15",
    location: "Main Street & Oak Ave",
  },
  {
    id: "ISS-002",
    title: "Street light not working",
    category: "Electricity",
    status: "pending" as const,
    date: "2024-01-14",
    location: "5th Avenue",
  },
  {
    id: "ISS-003",
    title: "Garbage pile near park",
    category: "Sanitation",
    status: "resolved" as const,
    date: "2024-01-10",
    location: "Central Park",
  },
  {
    id: "ISS-004",
    title: "Water leakage on 5th Avenue",
    category: "Water",
    status: "in-progress" as const,
    date: "2024-01-12",
    location: "5th Avenue",
  },
  {
    id: "ISS-005",
    title: "Broken bench in Central Park",
    category: "Public Property",
    status: "pending" as const,
    date: "2024-01-11",
    location: "Central Park",
  },
];

export default function MyIssuesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredIssues = issuesData.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <CitizenNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              My Issues
            </h1>
            <p className="text-muted-foreground mt-1">
              View all your reported civic issues
            </p>
          </div>
          <Link to="/citizen/report">
            <Button variant="hero" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Report New
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 mb-6 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
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
                  <TableHead>Issue ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium text-primary">
                      {issue.id}
                    </TableCell>
                    <TableCell>{issue.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {issue.category}
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[150px] truncate">
                      {issue.location}
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

        {filteredIssues.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No issues found matching your filters.
          </div>
        )}
      </main>
    </div>
  );
}
