import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Shield,
  FileText,
  Cpu,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Users,
  TrendingUp,
  Bell,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Report",
    description: "Submit your civic issue with details and location",
  },
  {
    icon: Cpu,
    title: "AI Analyzes",
    description: "Our AI categorizes, prioritizes, and routes your report",
  },
  {
    icon: CheckCircle2,
    title: "Government Resolves",
    description: "Assigned officers take action and resolve your issue",
  },
];

const features = [
  {
    icon: MapPin,
    title: "Location-Based Reporting",
    description: "Pinpoint exact locations for faster response and resolution",
  },
  {
    icon: Cpu,
    title: "AI-Powered Analysis",
    description: "Smart categorization and priority assignment using machine learning",
  },
  {
    icon: Bell,
    title: "Real-Time Updates",
    description: "Get notified as your issue progresses through the system",
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Transparent insights into community issues and resolutions",
  },
];

const stats = [
  { value: "50K+", label: "Issues Resolved" },
  { value: "100+", label: "Cities Connected" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24hrs", label: "Avg Response Time" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-in">
              <Shield className="h-4 w-4" />
              AI-Powered Public Welfare System
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
              Report Issues.{" "}
              <span className="gradient-hero bg-clip-text text-transparent">
                Transform Your City.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              CivicSense connects citizens with government for faster, smarter resolution 
              of everyday civic problems. From potholes to power outages – report it, track it, solve it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/signup">
                <Button variant="hero" size="xl">
                  Report an Issue
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline-hero" size="xl">
                  Officer Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold gradient-hero bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three simple steps to make your city better
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative text-center p-8 rounded-2xl bg-card shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>
                <div className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6">
                  <step.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built with cutting-edge technology for maximum efficiency
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card shadow-card border border-border/50 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl gradient-hero flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl gradient-hero shadow-elevated">
            <Users className="h-12 w-12 text-primary-foreground/80 mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Join Thousands of Active Citizens
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Be part of the change. Report issues in your neighborhood and help 
              create a cleaner, safer, and more efficient city for everyone.
            </p>
            <Link to="/signup">
              <Button
                size="xl"
                className="bg-card text-primary hover:bg-card/90 shadow-lg"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
