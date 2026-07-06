import type { ReactNode } from "react";
import { PageTitle } from "@/components/customUi/page-title";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  /** Page title (rendered as the gradient H1). */
  title: string;
  /** Optional subtitle line under the divider. */
  subtitle?: ReactNode;
  /** Wrapper classes; defaults to the centered header block spacing. */
  className?: string;
}

/**
 * The centered page header — gradient title, divider, optional subtitle — shared
 * by the top-level list/section pages (Movies, Blog, Events, Contact, About,
 * Palmares). Keeps title/divider/subtitle markup identical across pages.
 */
export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      <PageTitle title={title} />
      <div className="section-divider w-24 mx-auto mb-8" />
      {subtitle && (
        <div className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">{subtitle}</div>
      )}
    </div>
  );
}
