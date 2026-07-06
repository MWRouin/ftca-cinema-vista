import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Max content width; keeps the per-page `max-w-*` values from drifting. */
type ContainerWidth = "3xl" | "4xl" | "5xl" | "6xl" | "7xl";

const WIDTHS: Record<ContainerWidth, string> = {
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

const VERTICAL_PADDING: Record<8 | 12, string> = {
  8: "py-8",
  12: "py-12",
};

interface PageContainerProps {
  children: ReactNode;
  /** Content max width. Default "7xl" (event pages use "5xl"). */
  width?: ContainerWidth;
  /** Vertical page padding. Default 12 (Person/MoviePlayer use 8). */
  py?: 8 | 12;
  /** Extra classes merged onto the inner max-w container (e.g. "2xl:max-w-5xl"). */
  className?: string;
}

/**
 * The standard page shell: a full-height, vertically-padded outer band wrapping
 * a centered, horizontally-padded content column. Single source of truth so the
 * `max-w`/`py` don't drift page to page.
 */
export function PageContainer({ children, width = "7xl", py = 12, className }: PageContainerProps) {
  return (
    <div className={cn("min-h-screen", VERTICAL_PADDING[py])}>
      <div className={cn(WIDTHS[width], "mx-auto px-4 sm:px-6 lg:px-8", className)}>{children}</div>
    </div>
  );
}
