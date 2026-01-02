import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/landing-bg-user.jpg";
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
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[92vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Deep, premium gradient overlay to avoid white look */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/60 to-secondary/30" />
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]" />

        {/* Animated accent orbs */}
        <div className="floating-orb orb-primary w-[600px] h-[600px] -top-32 -left-32 opacity-20" />
        <div className="floating-orb orb-secondary w-[500px] h-[500px] bottom-0 -right-20 opacity-20" style={{ animationDelay: '-8s' }} />

        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-effect border-primary/20 text-xs font-semibold mb-6 animate-fade-in shadow-xl bg-primary/10 backdrop-blur-md">
            <Building2 className="h-3.5 w-3.5 text-primary" />
            <span className="text-primary font-bold tracking-wide uppercase">Official Government Portal</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-[1.15] mb-6 animate-slide-up max-w-4xl tracking-tight text-foreground drop-shadow-xl">
            A platform where <br />
            <span className="text-primary">
              citizen concerns meet
            </span>
            <br />
            <span className="text-foreground">government action</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 animate-slide-up leading-relaxed" style={{ animationDelay: "0.15s" }}>
            A digital bridge between citizens and authorities
          </p>

          <div className="flex flex-col sm:flex-row gap-6 animate-slide-up items-center justify-center w-full" style={{ animationDelay: "0.3s" }}>
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-primary text-primary-foreground border-0">
                <MessageSquare className="h-5 w-5 mr-3" />
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
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