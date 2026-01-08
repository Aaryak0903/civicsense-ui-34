import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CitizenSidebar } from "@/components/layout/CitizenSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, MapPin, X, Send, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { issueService } from "@/services/issueService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = [
  "Pothole",
  "Street Light",
  "Garbage",
  "Water Leakage",
  "Road Damage",
  "Public Property",
  "Drainage",
  "Traffic Signal",
  "Other",
  "Road" // Added to match earlier usage if needed
];

export default function ReportIssuePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates([longitude, latitude]);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.display_name) {
            setFormData((prev) => ({ ...prev, location: data.display_name }));
            toast({
              title: "Location Detected",
              description: "Address updated based on your current location.",
            });
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          toast({
            title: "Address Lookup Failed",
            description: "Could not fetch address details. Please enter manually.",
            variant: "default",
          });
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error("Error getting location", error);
        toast({
          title: "Location Access Denied",
          description: "Please enable location services or enter address manually.",
          variant: "destructive",
        });
        setIsGettingLocation(false);
      }
    );
  };

  // Get user location on mount (silent)
  useEffect(() => {
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: nearbyIssuesData } = useQuery({
    queryKey: ['nearbyIssues', coordinates],
    queryFn: () => issueService.getNearbyIssues(coordinates![0], coordinates![1]),
    enabled: !!coordinates,
  });

  const nearbyIssues = nearbyIssuesData?.data || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        text: formData.title + "\n\n" + formData.description,
        imageLink: imagePreview || "", // Send data URL or empty string
        location: {
          coordinates: coordinates || [0, 0], // Fallback if no location
          address: formData.location
        },
        category: formData.category,
        region: "Bangalore" // Default region as form doesn't have it
      };

      await issueService.createIssue(payload);

      toast({
        title: "Issue Reported!",
        description: "Your issue has been submitted successfully.",
      });

      navigate("/citizen/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Submission Failed",
        description: "Could not report issue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-dashboard font-sans relative isolate overflow-hidden">
      <CitizenSidebar />

      <main className="flex-1 pt-14 lg:pt-0 animate-slide-up overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Report an Issue
            </h1>
            <p className="text-muted-foreground mt-1">
              Help improve your community by reporting civic problems
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl shadow-sm border border-border p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title & Category Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Issue Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Deep pothole on Main St"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="bg-background"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger id="category" className="bg-background">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue in detail..."
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-background resize-none"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="location">Location</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 px-2 text-xs text-primary hover:bg-primary/10"
                        onClick={getCurrentLocation}
                        disabled={isGettingLocation}
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        {isGettingLocation ? "Detecting..." : "Detect my location"}
                      </Button>
                    </div>
                    <div className="relative">
                      <Input
                        id="location"
                        placeholder="Enter address or detect location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="pr-10 bg-background"
                        required
                      />
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Evidence Photo</Label>
                    <div className="mt-1">
                      {imagePreview ? (
                        <div className="relative rounded-lg overflow-hidden border border-border group max-w-sm">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => setImagePreview(null)}
                            >
                              <X className="h-4 w-4 mr-2" /> Remove
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all bg-muted/20">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="h-8 w-8 text-muted-foreground mb-3" />
                              <p className="text-sm text-muted-foreground">
                                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full md:w-auto min-w-[200px]" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" /> Submit Report
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Tips & Nearby */}
            <div className="lg:col-span-1 space-y-6">
              {/* Similar Issues Card */}
              <div className={cn(
                "bg-card rounded-xl border p-5 transition-all text-sm",
                nearbyIssues.length > 0 ? "border-amber-200 bg-amber-50/50" : "border-border shadow-sm"
              )}>
                <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                  {nearbyIssues.length > 0 ? <AlertCircle className="h-4 w-4 text-amber-500" /> : <MapPin className="h-4 w-4 text-primary" />}
                  {nearbyIssues.length > 0 ? "Similar Reports Nearby" : "No Nearby Reports"}
                </h3>

                {nearbyIssues.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      We found {nearbyIssues.length} issues in this area. Please check to avoid duplicates.
                    </p>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                      {nearbyIssues.slice(0, 5).map((issue: any) => (
                        <Link key={issue._id} to={`/citizen/issues/${issue._id}`} className="block">
                          <div className="bg-background border border-amber-100/50 hover:border-amber-300 p-3 rounded-lg transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">{issue.category}</span>
                            </div>
                            <p className="text-foreground text-xs line-clamp-2 mb-1 group-hover:text-primary">{issue.text}</p>
                            <p className="text-[10px] text-muted-foreground text-right">View Details →</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-xs">
                    Great! No other issues have been reported in this exact location recently.
                  </p>
                )}
              </div>

              {/* Guidelines Card */}
              <div className="bg-muted/30 rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Reporting Guidelines</h3>
                <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
                  <li>Take clear photos of the issue from a safe distance.</li>
                  <li>Provide specific details about the location (landmarks).</li>
                  <li>Keep the description objective and factual.</li>
                  <li>Avoid including personal information in the description.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
