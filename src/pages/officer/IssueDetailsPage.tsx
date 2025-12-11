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

const issueData = {
  id: "ISS-001",
  title: "Large Pothole Causing Traffic Issues",
  description:
    "There is a significant pothole on Main Street near the intersection with Oak Avenue. It has been growing in size over the past week and is now causing vehicles to swerve dangerously. Multiple residents have reported near-miss accidents. The pothole is approximately 2 feet wide and 6 inches deep. Urgent repair is needed to prevent accidents and vehicle damage.",
  category: "Pothole",
  severity: "high" as const,
  sentiment: "Very Negative",
  status: "pending" as const,
  citizen: "John Smith",
  citizenPhone: "+1 (555) 123-4567",
  location: "Main Street & Oak Avenue, Downtown",
  date: "2024-01-15",
  image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop",
};

const officers = [
  { id: "1", name: "Officer James Miller" },
  { id: "2", name: "Officer Patricia Lee" },
  { id: "3", name: "Officer Robert Chen" },
  { id: "4", name: "Officer Maria Garcia" },
];

export default function IssueDetailsPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(issueData.status);

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
    setSelectedStatus(status as typeof issueData.status);
    toast({
      title: "Status Updated",
      description: `Issue status changed to ${status}`,
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
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
                    <p className="text-sm text-primary font-medium mb-1">{id}</p>
                    <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
                      {issueData.title}
                    </h1>
                  </div>
                  <div className="flex gap-2">
                    <StatusBadge status={issueData.severity} />
                    <StatusBadge status={selectedStatus} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {issueData.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {issueData.citizen}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Sentiment: {issueData.sentiment}
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
                {/* Map Placeholder */}
                <div className="mt-4 h-48 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">
                    Map Integration Placeholder
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar Actions */}
            <div className="space-y-6">
              {/* AI Analysis */}
              <div className="bg-accent rounded-xl p-6 border border-accent-foreground/10">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-accent-foreground" />
                  <h3 className="font-display font-semibold text-accent-foreground">
                    AI Analysis
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-accent-foreground/80">
                  <li>• Category: Road Infrastructure</li>
                  <li>• Priority: High (Safety Risk)</li>
                  <li>• Sentiment: Very Negative</li>
                  <li>• Estimated Resolution: 2-3 days</li>
                  <li>• Similar reports: 3 in this area</li>
                </ul>
              </div>

              {/* Status Update */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Update Status
                </h3>
                <Select value={selectedStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Assign Officer */}
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
                    <span className="font-medium">{issueData.citizen}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">{issueData.citizenPhone}</span>
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
