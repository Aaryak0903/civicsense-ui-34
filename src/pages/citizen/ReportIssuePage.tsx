import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CitizenNavbar } from "@/components/layout/CitizenNavbar";
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
import heroBg from "@/assets/landing-bg-user.jpg";

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
    <div className="min-h-screen bg-dashboard relative isolate">
      {/* Background Image with Rich Overlay - Consistent with Landing/Login */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed -z-20 opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10" />

      <CitizenNavbar />

      <main className="container mx-auto px-4 py-8 max-w-2xl relative">
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Report an Issue
          </h1>
          <p className="text-muted-foreground mt-1">
            Help improve your community by reporting civic problems
          </p>
        </div>

        {nearbyIssues.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-400 mb-1">
                  Similar Issues Nearby
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-500 mb-3">
                  We found {nearbyIssues.length} issues reported near your location. Please check if your issue is already listed.
                </p>
                <ul className="space-y-2">
                  {nearbyIssues.slice(0, 3).map((issue: any) => (
                    <li key={issue._id} className="text-sm bg-background/50 p-2 rounded border border-amber-100 dark:border-amber-900/50">
                      <span className="font-medium">{issue.category}</span>: {issue.text.substring(0, 60)}...
                      <Link to={`/citizen/issues/${issue._id}`} className="text-primary hover:underline ml-2 text-xs">View</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="bg-card rounded-none md:rounded-xl shadow-2xl border-y md:border border-border overflow-hidden max-w-lg mx-auto">
          <div className="bg-primary/5 p-6 border-b border-border/50 text-center">
            <h2 className="font-display text-xl font-bold text-foreground">Report Issue Details</h2>
            <p className="text-xs text-muted-foreground mt-1">Please provide accurate information</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 space-y-5"
          >
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Issue Title</Label>
              <Input
                id="title"
                placeholder="Brief title of the issue"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-background"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</Label>
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

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</Label>
              <Textarea
                id="description"
                placeholder="Detailed description..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-background resize-none"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Location</Label>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-xs text-primary"
                  onClick={getCurrentLocation}
                  disabled={isGettingLocation}
                >
                  {isGettingLocation ? "Detecting..." : "Detect Location"}
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="location"
                  placeholder="Address"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="pr-10 bg-background"
                  required
                />
                <MapPin
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Evidence</Label>
              {imagePreview ? (
                <div className="relative rounded-lg overflow-hidden border border-border mt-1 group">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setImagePreview(null)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors mt-1 bg-background">
                  <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground">
                    Upload Photo
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" variant="hero" size="lg" className="w-full gap-2 mt-4 rounded-lg">
              <Send className="h-4 w-4" />
              Submit Issue
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
