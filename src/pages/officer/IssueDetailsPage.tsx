

import { useParams, Link } from "react-router-dom";
import { OfficerSidebar } from "@/components/layout/OfficerSidebar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  MessageSquare,
  AlertTriangle,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { issueService } from "@/services/issueService";
import heroBg from "@/assets/landing-bg-user.jpg";

const officers = [
  { id: "1", name: "Officer James Miller" },
  { id: "2", name: "Officer Patricia Lee" },
  { id: "3", name: "Officer Robert Chen" },
  { id: "4", name: "Officer Maria Garcia" },
];

export default function IssueDetailsPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedOfficer, setSelectedOfficer] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ['issue', id],
    queryFn: () => issueService.getIssueById(id!),
    enabled: !!id
  });

  const issue = data?.data;

  const statusMutation = useMutation({
    mutationFn: (status: string) => issueService.updateIssueStatus(id!, status),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['issue', id], { success: true, data: updatedData.data });
      toast({
        title: "Status Updated",
        description: `Issue status changed to ${updatedData.data.status}`,
      });
    }
  });

  const handleAssign = () => {
    if (!selectedOfficer) {
      toast({
        title: "Error",
        description: "Please select an officer to assign",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Officer Assigned",
      description: `Issue has been assigned successfully.`,
    });
  };

  const handleStatusChange = (status: string) => {
    statusMutation.mutate(status);
  };

  if (isLoading) return <div className="flex min-h-screen bg-background items-center justify-center">Loading...</div>;
  if (!issue) return <div className="flex min-h-screen bg-background items-center justify-center">Issue not found</div>;

  return (
    <div className="flex min-h-screen bg-background font-sans relative isolate overflow-hidden">
      <OfficerSidebar />

      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8">
          {/* Back Button */}
          <Link to="/officer/dashboard">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Issue Header */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-primary font-medium mb-1">{issue._id}</p>
                    <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
                      {issue.text.split('\n')[0]}
                    </h1>
                  </div>
                  <div className="flex gap-2">
                    <StatusBadge status={issue.priority || 'medium'} />
                    <StatusBadge status={issue.status} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {issue.reportedBy?.name || "Unknown"}
                  </div>
                </div>
              </div>

              {/* Image */}
              {issue.imageLink && (
                <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
                  <img
                    src={issue.imageLink}
                    alt="Evidence"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {issue.text}
                </p>
              </div>

              <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Location
                </h2>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{issue.location.address}</p>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Comments ({issue.comments?.length || 0})
                </h2>

                <div className="space-y-4">
                  {issue.comments?.map((comment: any, idx: number) => (
                    <div key={idx} className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-foreground">{comment.text}</p>
                    </div>
                  ))}
                  {(!issue.comments || issue.comments.length === 0) && (
                    <p className="text-muted-foreground text-sm italic">No comments yet.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Actions */}
            <div className="space-y-6">
              {/* Status Update */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Update Status
                </h3>
                <Select value={issue.status} onValueChange={handleStatusChange} disabled={statusMutation.isPending}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Assign Officer (Mock) */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Assign Officer
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Officer</Label>
                    <Select value={selectedOfficer} onValueChange={setSelectedOfficer}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an officer" />
                      </SelectTrigger>
                      <SelectContent>
                        {officers.map((officer) => (
                          <SelectItem key={officer.id} value={officer.id}>
                            {officer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAssign} className="w-full gap-2">
                    <UserPlus className="h-4 w-4" />
                    Assign Officer
                  </Button>
                </div>
              </div>

              {/* Citizen Info */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Citizen Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{issue.reportedBy?.name || "Anonymous"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{issue.reportedBy?.email || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
