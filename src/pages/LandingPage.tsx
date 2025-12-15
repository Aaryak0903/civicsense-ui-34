import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Report",
    description: "Submit your civic issue with details and precise location",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Cpu,
    title: "AI Analyzes",
    description: "Smart AI categorizes, prioritizes, and routes your report",
    color: "from-cyan-500 to-teal-500",
  },
  {
    icon: CheckCircle2,
    title: "Resolved",
    description: "Assigned officers take action and resolve your issue",
    color: "from-emerald-500 to-green-500",
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

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 lg:py-32">
        {/* Animated background */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="floating-orb orb-primary w-[500px] h-[500px] -top-40 -left-40" />
        <div className="floating-orb orb-secondary w-[400px] h-[400px] top-20 -right-32" style={{ animationDelay: '-5s' }} />
        <div className="floating-orb orb-primary w-[300px] h-[300px] bottom-20 left-1/4" style={{ animationDelay: '-10s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect text-sm font-medium mb-8 animate-fade-in">
              <Zap className="h-4 w-4 text-secondary" />
              <span className="text-gradient">AI-Powered Public Welfare System</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 animate-slide-up">
              <span className="text-foreground">Report Issues.</span>
              <br />
              <span className="text-gradient">Transform Your City.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.15s" }}>
              CivicSense connects citizens with government for smarter, faster resolution 
              of civic problems. From potholes to power outages — report it, track it, solve it.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/signup">
                <Button variant="hero" size="xl" className="group">
                  Report an Issue
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline-hero" size="xl">
                  <Shield className="h-5 w-5" />
                  Officer Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-border/50">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl gradient-hero mb-4 group-hover:shadow-glow-sm transition-shadow duration-500">
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
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
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                
                <div className="relative p-8 rounded-3xl glass-card hover:shadow-glow transition-all duration-500 group-hover:-translate-y-2">
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 h-10 w-10 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/30">
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
        <div className="absolute inset-0 gradient-mesh opacity-50" />
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
            <div className="absolute inset-0 gradient-hero rounded-[2.5rem] blur-3xl opacity-20" />
            
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
                    className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
