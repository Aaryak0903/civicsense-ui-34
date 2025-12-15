import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Zap, Sparkles } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
];

export function PublicNavbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
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
