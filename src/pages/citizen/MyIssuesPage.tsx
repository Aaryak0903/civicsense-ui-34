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
import { useQuery } from "@tanstack/react-query";
import { issueService } from "@/services/issueService";
import { useAuth } from "@/context/AuthContext";
import { Issue } from "@/types";

export default function MyIssuesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['issues'],
    queryFn: () => issueService.getAllIssues(),
  });

  const issues = data?.data || [];
  const myIssues = issues.filter((issue: Issue) => issue.reportedBy?._id === user?._id);

  const filteredIssues = myIssues.filter((issue: Issue) => {
    const matchesSearch =
      issue.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue._id.toLowerCase().includes(searchTerm.toLowerCase());
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
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground">Loading issues...</div>
            ) : (
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
                  {filteredIssues.map((issue: Issue) => (
                    <TableRow key={issue._id}>
                      <TableCell className="font-medium text-primary">
                        {issue._id.substring(0, 8)}...
                      </TableCell>
                      <TableCell>{issue.text.substring(0, 30)}...</TableCell>
                      <TableCell className="text-muted-foreground">
                        {issue.category}
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-[150px] truncate">
                        {issue.location.address}
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

        {!isLoading && filteredIssues.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No issues found matching your filters.
          </div>
        )}
      </main>
    </div>
  );
}
