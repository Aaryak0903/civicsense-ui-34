import { cn } from "@/lib/utils";

export type StatusType = "pending" | "in-progress" | "resolved" | "high" | "medium" | "low" | "open" | "closed";

interface StatusBadgeProps {
  status: StatusType | string; // Allow string to support API values loosely, but config handles known ones
  className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  open: {
    label: "Open",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  resolved: {
    label: "Resolved",
    className: "bg-secondary/20 text-secondary border-secondary/30",
  },
  closed: {
    label: "Closed",
    className: "bg-slate-100 text-slate-700 border-slate-200",
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
  const config = statusConfig[status] || statusConfig['pending']; // Fallback

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
