import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-card/50">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-hero shadow-lg shadow-primary/30">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold text-gradient">
                NagrikSeva
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-6">
              AI-Powered Public Welfare System. Making cities smarter, one report at a time.
              Report issues, track progress, and see real change in your community.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2.5 rounded-lg glass-effect hover:bg-primary/20 transition-colors">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="p-2.5 rounded-lg glass-effect hover:bg-primary/20 transition-colors">
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="p-2.5 rounded-lg glass-effect hover:bg-primary/20 transition-colors">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-5">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                support@NagrikSeva.gov
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                1800-CIVIC-01
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                City Hall, Main Street
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} NagrikSeva. All rights reserved. A Government Initiative.
          </p>
        </div>
      </div>
    </footer>
  );
}
