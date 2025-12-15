import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/citizen/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/citizen/report", label: "Report Issue", icon: PlusCircle },
  { href: "/citizen/my-issues", label: "My Issues", icon: FileText },
  { href: "/citizen/settings", label: "Settings", icon: Settings },
];

export function CitizenNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-effect">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <Link to="/citizen/dashboard" className="flex items-center gap-3 group">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl gradient-hero shadow-lg shadow-primary/30 group-hover:shadow-glow-sm transition-shadow duration-300">
                <Zap className="h-6 w-6 text-primary-foreground" />
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-secondary animate-pulse" />
              </div>
              <span className="font-display text-2xl font-bold text-gradient">
                CivicSense
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link key={link.href} to={link.href}>
                    <Button
                      variant={isActive ? "glow" : "ghost"}
                      size="default"
                      className="gap-2"
                    >
                      <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                      {link.label}
                      {isActive && <Sparkles className="h-3 w-3 text-primary" />}
                    </Button>
                  </Link>
                );
              })}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="ml-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 z-40 glass-effect border-b border-border/50 animate-slide-up">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                >
                  <Button
                    variant={isActive ? "glow" : "ghost"}
                    className="w-full justify-start gap-3 h-12"
                    size="lg"
                  >
                    <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                    {link.label}
                    {isActive && <Sparkles className="h-3 w-3 ml-auto text-primary" />}
                  </Button>
                </Link>
              );
            })}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start gap-3 h-12 text-muted-foreground hover:text-destructive hover:bg-destructive/10 mt-2"
              size="lg"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}
