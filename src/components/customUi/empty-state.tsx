import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  /** Lucide icon shown above the message. */
  icon: LucideIcon;
  /** Primary message. */
  title: ReactNode;
  /** Optional secondary line (e.g. "check back soon"). */
  subtitle?: ReactNode;
  /** Icon sizing; defaults to w-20 h-20 (Blog uses a larger w-40 h-40). */
  iconClassName?: string;
  /** Extra classes merged onto the outer panel. */
  className?: string;
}

/** Centered "nothing here yet" panel, shared by the Blog and Events lists. */
export function EmptyState({ icon: Icon, title, subtitle, iconClassName, className }: EmptyStateProps) {
  return (
    <div className={cn("text-center py-12 bg-muted/50 rounded-lg space-y-4", className)}>
      <Icon className={cn("mx-auto text-muted-foreground", iconClassName ?? "w-20 h-20")} />
      <p className="text-lg text-muted-foreground">{title}</p>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
