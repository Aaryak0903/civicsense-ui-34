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
    default: "bg-card border-border shadow-sm hover:shadow-md",
    primary: "bg-card border-primary/20 shadow-sm hover:shadow-md hover:border-primary/30",
    secondary: "bg-card border-secondary/20 shadow-sm hover:shadow-md hover:border-secondary/30",
    accent: "bg-card border-accent/20 shadow-sm hover:shadow-md hover:border-accent/30",
  };

  const iconVariants = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary ring-1 ring-primary/20",
    secondary: "bg-secondary/10 text-secondary ring-1 ring-secondary/20",
    accent: "bg-accent/10 text-accent ring-1 ring-accent/20",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-5 border transition-all duration-300 group",
        variants[variant],
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div
          className={cn(
            "rounded-lg p-2 transition-transform duration-300 group-hover:scale-110",
            iconVariants[variant]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="flex items-end gap-2">
        <h3 className="text-3xl font-display font-bold text-foreground tracking-tight">
          {value}
        </h3>
        {trend && (
          <span
            className={cn(
              "text-xs font-semibold mb-1.5 flex items-center gap-0.5",
              trend.isPositive ? "text-emerald-500" : "text-destructive"
            )}
          >
            {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
}
