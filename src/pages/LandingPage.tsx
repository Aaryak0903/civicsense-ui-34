import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Zap,
  FileText,
  Cpu,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Users,
  TrendingUp,
  Bell,
  Sparkles,
  Globe,
  Shield,
  Building2,
  MessageSquare,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Report",
    description: "Submit your civic issue with details and precise location",
    color: "from-primary to-teal-400",
  },
  {
    icon: Cpu,
    title: "AI Analyzes",
    description: "Smart AI categorizes, prioritizes, and routes your report",
    color: "from-secondary to-orange-400",
  },
  {
    icon: CheckCircle2,
    title: "Resolved",
    description: "Assigned officers take action and resolve your issue",
    color: "from-emerald-500 to-green-400",
  },
];

const features = [
  {
    icon: MapPin,
    title: "Geo-Location Tracking",
    description: "Pinpoint exact locations with GPS integration for faster response",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Machine learning categorizes and prioritizes reports automatically",
  },
  {
    icon: Bell,
    title: "Live Notifications",
    description: "Real-time updates as your issue progresses through resolution",
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "Transparent insights into community issues and performance metrics",
  },
];

const stats = [
  { value: "50K+", label: "Issues Resolved", icon: CheckCircle2 },
  { value: "100+", label: "Cities Connected", icon: Globe },
  { value: "98%", label: "Satisfaction", icon: Sparkles },
  { value: "2hrs", label: "Avg Response", icon: Zap },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <PublicNavbar />

      {/* Hero Section with Background Image */}
      <section className="relative min-h-[95vh] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/60" />
        
        {/* Animated accent orbs */}
        <div className="floating-orb orb-primary w-[400px] h-[400px] -top-20 -left-20" />
        <div className="floating-orb orb-secondary w-[300px] h-[300px] top-40 -right-20" style={{ animationDelay: '-8s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-sm font-medium mb-8 animate-fade-in">
              <Building2 className="h-4 w-4 text-secondary" />
              <span className="text-foreground/90">AI-Powered Public Welfare System</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 animate-slide-up">
              <span className="text-foreground">Your Voice.</span>
              <br />
              <span className="text-gradient">Your City.</span>
              <br />
              <span className="text-gradient-warm">Your Impact.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-xl mb-10 animate-slide-up" style={{ animationDelay: "0.15s" }}>
              CivicSense connects citizens directly with city officials. Report infrastructure issues, 
              track progress in real-time, and watch your community transform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/signup">
                <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                  <MessageSquare className="h-5 w-5" />
                  Report an Issue
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline-hero" size="xl" className="w-full sm:w-auto">
                  <Shield className="h-5 w-5" />
                  Officer Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-border/30">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-hero mb-4 group-hover:shadow-glow-sm transition-shadow duration-500">
                  <stat.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <p className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full glass-effect text-xs font-semibold text-secondary uppercase tracking-wider mb-4">
              Simple Process
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Three simple steps to make your city better
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/40 to-transparent" />
                )}
                
                <div className="relative p-8 rounded-3xl glass-card hover:shadow-glow transition-all duration-500 group-hover:-translate-y-2">
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 h-10 w-10 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                    {index + 1}
                  </div>
                  
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full glass-effect text-xs font-semibold text-secondary uppercase tracking-wider mb-4">
              Capabilities
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Built with cutting-edge technology for maximum efficiency
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl glass-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-14 w-14 rounded-xl gradient-hero flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-glow-sm transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="relative max-w-5xl mx-auto">
            {/* Glow effect */}
            <div className="absolute inset-0 gradient-hero rounded-[2.5rem] blur-3xl opacity-15" />
            
            <div className="relative p-12 md:p-16 rounded-[2.5rem] gradient-hero overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative text-center">
                <Users className="h-14 w-14 text-white/80 mx-auto mb-8" />
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                  Join Thousands of Active Citizens
                </h2>
                <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
                  Be part of the change. Report issues in your neighborhood and help 
                  create a cleaner, safer, and more efficient city for everyone.
                </p>
                <Link to="/signup">
                  <Button
                    size="xl"
                    className="bg-background text-foreground hover:bg-background/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Get Started Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}