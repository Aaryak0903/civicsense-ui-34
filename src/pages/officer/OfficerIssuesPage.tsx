
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
import { useQuery } from "@tanstack/react-query";
import { issueService } from "@/services/issueService";
import { Issue } from "@/types";
import heroBg from "@/assets/landing-bg-user.jpg";

export default function OfficerIssuesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ['issues', 'all'],
    queryFn: () => issueService.getAllIssues({ limit: 100 }), // Get more issues for the list
  });

  const issues = data?.data || [];

  const filteredIssues = issues.filter((issue: Issue) => {
    const matchesSearch =
      (issue.reportedBy?.name || "Unknown").toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "all" || (issue.priority || 'medium') === filterPriority; // API might not always return priority
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-dashboard font-sans relative isolate overflow-hidden">
      <OfficerSidebar />

      <main className="flex-1 pt-14 lg:pt-0 overflow-y-auto">
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
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-8 text-center text-muted-foreground">Loading issues...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Citizen</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIssues.map((issue: Issue) => (
                      <TableRow key={issue._id}>
                        <TableCell className="font-medium text-primary">
                          {issue._id.substring(0, 8)}...
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {issue.text.substring(0, 30)}...
                        </TableCell>
                        <TableCell>{issue.reportedBy?.name || "Unknown"}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {issue.category}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={issue.priority || 'medium'} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={issue.status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(issue.createdAt).toLocaleDateString()}
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

          {!isLoading && filteredIssues.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No issues found matching your filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
