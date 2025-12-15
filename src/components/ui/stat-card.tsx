import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "secondary" | "accent";
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatCardProps) {
  const variants = {
    default: "glass-card",
    primary: "glass-card border-primary/20",
    secondary: "glass-card border-secondary/20",
    accent: "glass-card border-accent/30",
  };

  const iconVariants = {
    default: "bg-muted text-muted-foreground",
    primary: "gradient-hero text-primary-foreground shadow-lg shadow-primary/30",
    secondary: "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30",
    accent: "bg-accent text-accent-foreground",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300 hover:shadow-glow-sm hover:-translate-y-1",
        variants[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-4xl font-display font-bold text-gradient">
            {value}
          </p>
          {trend && (
            <p
              className={cn(
                "mt-2 text-sm font-semibold flex items-center gap-1",
                trend.isPositive ? "text-secondary" : "text-destructive"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div
          className={cn(
            "rounded-xl p-3",
            iconVariants[variant]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
