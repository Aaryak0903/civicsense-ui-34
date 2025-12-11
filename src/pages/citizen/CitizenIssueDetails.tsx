import { useParams, Link } from "react-router-dom";
import { CitizenNavbar } from "@/components/layout/CitizenNavbar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Clock, User } from "lucide-react";

const issueData = {
  id: "ISS-001",
  title: "Large Pothole on Main Street",
  description:
    "There is a significant pothole on Main Street near the intersection with Oak Avenue. It has been growing in size over the past week and is now causing vehicles to swerve dangerously. Multiple neighbors have also noticed this issue. Urgent repair is needed to prevent accidents.",
  category: "Road",
  status: "in-progress" as const,
  date: "2024-01-15",
  location: "Main Street & Oak Avenue, Downtown",
  image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop",
  assignedOfficer: "Officer James Miller",
  lastUpdate: "2024-01-16",
  timeline: [
    { date: "2024-01-15", status: "Submitted", description: "Issue reported by citizen" },
    { date: "2024-01-15", status: "AI Analysis", description: "Categorized as high priority road issue" },
    { date: "2024-01-16", status: "Assigned", description: "Assigned to Officer James Miller" },
    { date: "2024-01-16", status: "In Progress", description: "Repair crew dispatched" },
  ],
};

export default function CitizenIssueDetails() {
  const { id } = useParams();

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
                  <p className="text-sm text-primary font-medium mb-1">{id}</p>
                  <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {issueData.title}
                  </h1>
                </div>
                <StatusBadge status={issueData.status} />
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Reported: {issueData.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Last Update: {issueData.lastUpdate}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
              <img
                src={issueData.image}
                alt={issueData.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

            {/* Description */}
            <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {issueData.description}
              </p>
            </div>

            {/* Location */}
            <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Location
              </h2>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-muted-foreground">{issueData.location}</p>
              </div>
              <div className="mt-4 h-48 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  Map View Placeholder
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assigned Officer */}
            <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">
                Assigned Officer
              </h3>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-hero flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {issueData.assignedOfficer}
                  </p>
                  <p className="text-sm text-muted-foreground">Public Works Dept.</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">
                Status Timeline
              </h3>
              <div className="space-y-4">
                {issueData.timeline.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      {index < issueData.timeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-foreground">
                        {item.status}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Info */}
            <div className="bg-accent rounded-xl p-6 border border-accent-foreground/10">
              <h3 className="font-display font-semibold text-accent-foreground mb-3">
                Issue Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-accent-foreground/70">Category</span>
                  <span className="font-medium text-accent-foreground">
                    {issueData.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent-foreground/70">Priority</span>
                  <span className="font-medium text-accent-foreground">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent-foreground/70">Est. Resolution</span>
                  <span className="font-medium text-accent-foreground">2-3 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
