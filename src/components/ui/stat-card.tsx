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
    default: "bg-card",
    primary: "bg-primary/5 border-primary/20",
    secondary: "bg-secondary/5 border-secondary/20",
    accent: "bg-accent border-accent-foreground/10",
  };

  const iconVariants = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent-foreground/10 text-accent-foreground",
  };

  return (
    <div
      className={cn(
        "rounded-xl border p-6 shadow-card transition-all duration-200 hover:shadow-elevated",
        variants[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-display font-bold text-foreground">
            {value}
          </p>
          {trend && (
            <p
              className={cn(
                "mt-1 text-sm font-medium",
                trend.isPositive ? "text-secondary" : "text-destructive"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div
          className={cn(
            "rounded-lg p-3",
            iconVariants[variant]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
