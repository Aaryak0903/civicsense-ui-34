import { cn } from "@/lib/utils";

export type StatusType = "pending" | "in-progress" | "resolved" | "high" | "medium" | "low";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  resolved: {
    label: "Resolved",
    className: "bg-secondary/20 text-secondary border-secondary/30",
  },
  high: {
    label: "High",
    className: "bg-destructive/20 text-destructive border-destructive/30",
  },
  medium: {
    label: "Medium",
    className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  low: {
    label: "Low",
    className: "bg-secondary/20 text-secondary border-secondary/30",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
