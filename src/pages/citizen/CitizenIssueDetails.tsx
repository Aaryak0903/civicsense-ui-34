import { useParams, Link } from "react-router-dom";
import { CitizenNavbar } from "@/components/layout/CitizenNavbar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Calendar, Clock, ThumbsUp, MessageCircle, Send, User } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { issueService } from "@/services/issueService";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export default function CitizenIssueDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ['issue', id],
    queryFn: () => issueService.getIssueById(id!),
    enabled: !!id
  });

  const issue = data?.data;

  const upvoteMutation = useMutation({
    mutationFn: () => issueService.upvoteIssue(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issue', id] });
      toast({ title: "Upvoted!", description: "You have upvoted this issue." });
    }
  });

  const commentMutation = useMutation({
    mutationFn: (text: string) => issueService.addComment(id!, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issue', id] });
      setCommentText("");
      toast({ title: "Comment Added", description: "Your comment has been posted." });
    }
  });

  const handleUpvote = () => {
    upvoteMutation.mutate();
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    commentMutation.mutate(commentText);
  };

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  if (!issue) return <div className="min-h-screen bg-background flex items-center justify-center">Issue not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <CitizenNavbar />

      <main className="container mx-auto px-4 py-8">
        <Link to="/citizen/dashboard">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-primary font-medium mb-1">{issue._id}</p>
                  <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {issue.text.split('\n')[0]}
                  </h1>
                </div>
                <StatusBadge status={issue.status} />
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Reported: {new Date(issue.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Upvotes: {issue.upvotes}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleUpvote}
                disabled={upvoteMutation.isPending}
              >
                <ThumbsUp className="h-4 w-4" />
                Upvote ({issue.upvotes})
              </Button>
            </div>

            {/* Image */}
            {issue.imageLink && (
              <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
                <img
                  src={issue.imageLink}
                  alt="Issue Evidence"
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

            {/* Location */}
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
                <MessageCircle className="h-5 w-5" />
                Comments ({issue.comments?.length || 0})
              </h2>

              <div className="space-y-4 mb-6">
                {issue.comments?.map((comment, idx) => (
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

              <form onSubmit={handleCommentSubmit} className="flex gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button type="submit" size="icon" disabled={commentMutation.isPending}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Info */}
            <div className="bg-accent rounded-xl p-6 border border-accent-foreground/10">
              <h3 className="font-display font-semibold text-accent-foreground mb-3">
                Issue Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-accent-foreground/70">Category</span>
                  <span className="font-medium text-accent-foreground">
                    {issue.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent-foreground/70">Priority</span>
                  <span className="font-medium text-accent-foreground">{issue.priority || 'Normal'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent-foreground/70">Region</span>
                  <span className="font-medium text-accent-foreground">{issue.region}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
