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
import { Zap, Eye, EyeOff, UserPlus, User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Account Created!",
      description: "Welcome to CivicSense. You can now login.",
    });

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 relative">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="floating-orb orb-secondary w-[400px] h-[400px] -top-32 -right-32" />
        <div className="floating-orb orb-primary w-[300px] h-[300px] bottom-0 -left-20" style={{ animationDelay: '-7s' }} />

        <div className="w-full max-w-md relative z-10 animate-slide-up">
          <div className="text-center mb-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-hero-reverse shadow-glow mb-6">
              <Zap className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-muted-foreground">
              Join CivicSense and make a difference
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 glass-card p-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 bg-muted/50 border-border/50 focus:border-primary"
                required
              />
            </div>

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
              <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12 bg-muted/50 border-border/50 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground">Role</Label>
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

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
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
              <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="h-12 bg-muted/50 border-border/50 focus:border-primary pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" variant="hero" className="w-full" size="lg">
              <UserPlus className="h-5 w-5" />
              Create Account
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
