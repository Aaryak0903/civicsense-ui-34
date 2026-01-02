import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Logo } from "@/components/layout/Logo";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import heroBg from "@/assets/landing-bg-user.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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


      const userRole = (user as any)?.role;

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
    <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden bg-background">
      {/* Left Panel: Form */}
      <div className="flex flex-col justify-center items-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-sm space-y-8 animate-slide-up">
          <div className="text-center">
            <Link to="/" className="inline-block mb-6 transition-transform hover:scale-105">
              <Logo className="h-12" scale="scale-100" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-muted-foreground mt-2">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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

            <Button
              type="submit"
              className="w-full h-11 font-medium text-base shadow-sm hover:shadow-md transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline underline-offset-4">
              Sign up
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
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <blockquote className="space-y-2">
            <p className="text-2xl font-medium leading-relaxed">
              "CivicSense has transformed how we interact with our local government. It's transparent, fast, and empowering."
            </p>
            <footer className="text-white/80 text-sm font-medium mt-4">
              &mdash; Priya Sharma, Community Leader
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
