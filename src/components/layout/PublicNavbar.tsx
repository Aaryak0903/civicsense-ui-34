import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
];

// Custom CivicSense Logo Component
function CivicSenseLogo() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      {/* Outer ring with gradient */}
      <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(175 70% 45%)" />
            <stop offset="100%" stopColor="hsl(38 95% 55%)" />
          </linearGradient>
        </defs>
        {/* Hexagonal city shape */}
        <path
          d="M24 4 L42 14 L42 34 L24 44 L6 34 L6 14 Z"
          fill="url(#logoGradient)"
          className="drop-shadow-lg"
        />
        {/* Inner building silhouette */}
        <g fill="hsl(220 25% 6%)">
          <rect x="14" y="22" width="6" height="14" rx="1" />
          <rect x="21" y="18" width="6" height="18" rx="1" />
          <rect x="28" y="24" width="6" height="12" rx="1" />
          {/* Network dots */}
          <circle cx="17" cy="16" r="2" fill="hsl(38 95% 55%)" />
          <circle cx="24" cy="12" r="2" fill="hsl(175 70% 55%)" />
          <circle cx="31" cy="16" r="2" fill="hsl(38 95% 55%)" />
          {/* Connection lines */}
          <line x1="17" y1="16" x2="24" y2="12" stroke="hsl(175 70% 55%)" strokeWidth="1" opacity="0.6" />
          <line x1="24" y1="12" x2="31" y2="16" stroke="hsl(175 70% 55%)" strokeWidth="1" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}

export function PublicNavbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <CivicSenseLogo />
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-gradient leading-tight">
                CivicSense
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Smart City Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={location.pathname === link.href ? "glow" : "ghost"}
                  size="sm"
                  className="text-sm"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link to="/signup" className="ml-3">
              <Button variant="hero" size="default" className="group">
                <Sparkles className="h-4 w-4" />
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 glass-effect border-l border-border/50">
              <div className="flex flex-col gap-3 mt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                  >
                    <Button
                      variant={location.pathname === link.href ? "glow" : "ghost"}
                      className="w-full justify-start text-base"
                      size="lg"
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <Link to="/signup" onClick={() => setOpen(false)} className="mt-4">
                  <Button variant="hero" className="w-full" size="lg">
                    <Sparkles className="h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}