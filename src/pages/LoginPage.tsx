import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
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
import { Zap, Eye, EyeOff, LogIn, User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login({
        email: formData.email,
        password: formData.password,
      });

      toast({
        title: "Welcome back!",
        description: "Login successful.",
      });

      // Determine navigation
      const userRole = (user as any)?.role || formData.role;

      if (userRole === "government_officer" || userRole === "officer") {
        navigate("/officer/dashboard");
      } else {
        navigate("/citizen/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: "Invalid credentials or server error.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 relative">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="floating-orb orb-primary w-[400px] h-[400px] -top-32 -left-32" />
        <div className="floating-orb orb-secondary w-[300px] h-[300px] bottom-0 -right-20" style={{ animationDelay: '-7s' }} />

        <div className="w-full max-w-md relative z-10 animate-slide-up">
          <div className="text-center mb-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-hero shadow-glow mb-6">
              <Zap className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Login to your CivicSense account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 bg-muted/50 border-border/50 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 bg-muted/50 border-border/50 focus:border-primary pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground">Login as</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id="role" className="h-12 bg-muted/50 border-border/50">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  <SelectItem value="citizen">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Citizen
                    </div>
                  </SelectItem>
                  <SelectItem value="officer">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Government Officer
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" variant="hero" className="w-full" size="lg">
              <LogIn className="h-5 w-5" />
              Login
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
