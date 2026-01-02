import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { HeroTitle } from "@/components/ui/hero-title";
import { Link } from "react-router-dom";
import {
  FileText,
  Cpu,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Bell,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "1. Report",
    description: "Submit your issue with details and location.",
  },
  {
    icon: Cpu,
    title: "2. Analyze",
    description: "Our system categorizes and routes your report.",
  },
  {
    icon: CheckCircle2,
    title: "3. Resolve",
    description: "Officers take action and update you in real-time.",
  },
];

const features = [
  {
    icon: MapPin,
    title: "Geo-Location",
    description: "Pinpoint exact locations for faster response times.",
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    description: "Smart categorization helps prioritize critical issues.",
  },
  {
    icon: Bell,
    title: "Real-time Updates",
    description: "Stay informed as your issue progresses.",
  },
  {
    icon: TrendingUp,
    title: "Open Data",
    description: "View community issues and resolution metrics.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/10">
      <PublicNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-10 pb-20 md:pt-32 md:pb-32 px-6">
          <div className="container mx-auto max-w-5xl text-center">
            <HeroTitle className="animate-slide-up" />
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light animate-slide-up opacity-0" style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
              Connect directly with your local government to report issues, track progress, and improve your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <Link to="/signup">
                <Button size="lg" className="h-12 px-8 text-base rounded-full font-medium transition-transform hover:scale-105">
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" size="lg" className="h-12 px-8 text-base rounded-full text-foreground/80 hover:text-foreground">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-start">
                  <div className="mb-6 p-3 bg-background rounded-xl shadow-sm border border-border/50">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-6 border-t border-border/40">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Built for efficiency</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Advanced tools to help citizens and officials collaborate effectively.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {features.map((feature, index) => (
                <div key={index} className="group">
                  <div className="mb-4 text-foreground/80 group-hover:text-primary transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Minimal CTA */}
        <section className="py-32 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to make a difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Join your neighbors in building a better city for everyone. start reporting today.
            </p>
            <Link to="/signup">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                Create Account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}