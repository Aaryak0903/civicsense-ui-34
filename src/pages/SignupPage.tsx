import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Eye, EyeOff, MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import landingBg from "@/assets/landing-bg-user.jpg";

export default function SignupPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "citizen",
    password: "",
    confirmPassword: "",
  });

  const [location, setLocation] = useState<{
    address: string;
    coordinates: [number, number] | null;
  }>({
    address: "",
    coordinates: null,
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          setLocation({
            coordinates: [longitude, latitude],
            address: data.display_name || `${latitude}, ${longitude}`,
          });
        } catch (error) {
          setLocation({
            coordinates: [longitude, latitude],
            address: `${latitude}, ${longitude}`,
          });
        }

        setIsGettingLocation(false);
      },
      (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Unable to retrieve your location",
          variant: "destructive",
        });
        setIsGettingLocation(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        location: formData.role === 'government_officer' ? location : undefined,
        password: formData.password,
      });

      toast({
        title: "Account Created!",
        description: "Welcome to NagrikSeva. You can now login.",
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      toast({
        title: "Signup Failed",
        description: "Something went wrong during signup.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden bg-background">
      {/* Left Panel: Form */}
      <div className="flex flex-col justify-center items-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-lg space-y-6 animate-slide-up">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <Link to="/" className="inline-block transition-transform hover:scale-105">
                <Logo className="h-16" scale="scale-100" />
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Create an account
            </h1>
            <p className="text-muted-foreground mt-2">
              Join our community to start making a difference.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-11 bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-11 bg-background"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-11 bg-background"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id="role" className="h-11 bg-background">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizen">Citizen</SelectItem>
                  <SelectItem value="government_officer">Government Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role === "government_officer" && (
              <div className="space-y-2 p-4 bg-muted/40 rounded-lg border border-border/50 animate-in fade-in zoom-in-95">
                <Label htmlFor="location" className="text-xs font-semibold uppercase text-muted-foreground">Assigned Jurisdiction</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Search or detect location..."
                    value={location.address}
                    onChange={(e) =>
                      setLocation({ ...location, address: e.target.value })
                    }
                    className="h-11 bg-background"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 shrink-0"
                    onClick={getLocation}
                    disabled={isGettingLocation}
                    title="Get Current Location"
                  >
                    {isGettingLocation ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <MapPin className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  * Required for officer verification. Use the map pin for current GPS location.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-11 bg-background pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="h-11 bg-background pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 mt-4 font-medium text-base shadow-sm hover:shadow-md transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline underline-offset-4">
              Sign in
            </Link>
          </div>

          <div className="pt-8 mt-8 border-t border-border/40 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Back to Home</Link>
          </div>
        </div>
      </div>

      {/* Right Panel: Visual */}
      <div className="hidden lg:block relative bg-muted">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${landingBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Join the movement.</h2>
          <p className="text-lg text-white/80 max-w-md leading-relaxed">
            "A platform built for the people, by the people. Together we can build safer, smarter, and cleaner cities."
          </p>
        </div>
      </div>
    </div>
  );
}
