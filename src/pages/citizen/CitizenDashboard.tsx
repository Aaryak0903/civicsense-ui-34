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
  MapPin,
} from "lucide-react";

// Helper to extract a displayable location string
const cityExtract = (addr: string | undefined) => {
  if (!addr) return null;
  const parts = addr.split(',');
  // simplistic extraction: return first part or last part (city/zip)
  return parts.slice(0, 2).join(', ');
};
import { useQuery } from "@tanstack/react-query";
import { issueService } from "@/services/issueService";
import { useAuth } from "@/context/AuthContext";
import { Issue } from "@/types";

import heroBg from "@/assets/landing-bg-user.jpg";

export default function CitizenDashboard() {
  const { user } = useAuth();

  // Fetch my issues for stats and history
  const { data: myData, isLoading: isLoadingMy } = useQuery({
    queryKey: ['issues', 'my'],
    queryFn: () => issueService.getMyIssues({ limit: 100 }),
  });

  // Fetch all issues for Community Issues section
  const { data: communityData, isLoading: isLoadingCommunity } = useQuery({
    queryKey: ['issues', 'community'],
    queryFn: () => issueService.getAllIssues({ limit: 50 }),
  });

  const myIssues = myData?.data || [];
  const communityIssues = communityData?.data || [];

  const totalIssues = myIssues.length;
  const resolvedIssues = myIssues.filter((i: Issue) => i.status === "resolved" || i.status === "closed").length;
  const pendingIssues = totalIssues - resolvedIssues;

  const recentMyIssues = myIssues.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-dashboard">
      {/* Background Image with Rich Overlay - Consistent with Landing/Login */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed -z-20 opacity-40 mix-blend-soft-light"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-secondary/35 -z-10" />

      <CitizenNavbar />

      <main className="flex-1 container mx-auto px-4 py-8 relative">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Citizen Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your reported issues
          </p>
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
          />
          <StatCard
            title="Pending"
            value={pendingIssues}
            icon={Clock}
            variant="accent"
          />
        </div>

        {/* My Recent Issues section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-foreground">
              My Recent Issues
            </h2>
            <Link to="/citizen/my-issues">
              <Button variant="link" className="text-primary hover:underline group">
                View All My Issues <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingMy ? (
              <div className="col-span-full p-8 text-center text-muted-foreground border border-dashed rounded-xl">Loading your issues...</div>
            ) : recentMyIssues.length === 0 ? (
              <div className="col-span-full p-8 text-center bg-card/50 border border-dashed rounded-xl flex flex-col items-center gap-4">
                <p className="text-muted-foreground">You haven't reported any issues yet.</p>
                <Link to="/citizen/report">
                  <Button variant="hero" size="sm" className="gap-2">
                    <PlusCircle className="h-4 w-4" /> Report Your First Issue
                  </Button>
                </Link>
              </div>
            ) : (
              recentMyIssues.map((issue: Issue) => (
                <div key={issue._id} className="bg-card rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
                  <div className="h-40 bg-muted relative overflow-hidden">
                    {issue.imageLink ? (
                      <img src={issue.imageLink} alt="Issue" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                        <FileText className="h-8 w-8 opacity-20" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <StatusBadge status={issue.status} className="shadow-lg backdrop-blur-md bg-background/80" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-1 line-clamp-1">{issue.text.split('\n')[0] || "Issue Report"}</h3>
                    <p className="text-muted-foreground text-xs mb-3 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Reported on {new Date(issue.createdAt).toLocaleDateString()}
                    </p>
                    <Link to={`/citizen/issues/${issue._id}`}>
                      <Button variant="secondary" size="sm" className="w-full">View Details</Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Community Issues across platform */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">
              Community Issues
            </h2>
            {/* Optional: Add location filter or sort here if needed, but for now just listing all */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingCommunity ? (
              <div className="col-span-full p-12 text-center text-muted-foreground">Loading community issues...</div>
            ) : communityIssues.length === 0 ? (
              <div className="col-span-full p-12 text-center text-muted-foreground">No issues reported in the community yet.</div>
            ) : (
              communityIssues.map((issue: Issue) => (
                <div key={issue._id} className="bg-card rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
                  {/* Card Image */}
                  <div className="h-48 bg-muted relative overflow-hidden">
                    {issue.imageLink ? (
                      <img
                        src={issue.imageLink}
                        alt="Issue"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                        <FileText className="h-10 w-10 opacity-20" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <StatusBadge status={issue.status} className="shadow-lg backdrop-blur-md bg-background/80" />
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {issue.region || cityExtract(issue.location?.address) || "Unknown Location"}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{issue.category}</span>
                      <span className="text-xs text-muted-foreground">{new Date(issue.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-1">
                      {issue.text.split('\n')[0] || "Issue Report"}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 h-10">
                      {issue.text}
                    </p>

                    <Link to={`/citizen/issues/${issue._id}`}>
                      <Button variant="secondary" className="w-full h-9">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
