import { Facebook, Instagram, Youtube, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type SocialLink = {
  icon: LucideIcon;
  href: string;
  label: string;
  /** Brand color: always on in the "brand" variant, on hover in "chip". */
  color: string;
};

/** Single source of truth for the club's social profiles (URLs in one place). */
const SOCIAL_LINKS: SocialLink[] = [
  { icon: Facebook, href: "https://www.facebook.com/ftcahamhama/", label: "Facebook", color: "#0866ff" },
  { icon: Instagram, href: "https://www.instagram.com/ftca.hlif/", label: "Instagram", color: "#e7009a" },
  { icon: Youtube, href: "https://www.youtube.com/@ftcahammamlif", label: "YouTube", color: "#ff0033" },
];

/**
 * Presentation styles:
 *  - "brand"   — centered row of brand-colored icons (event CTA cards).
 *  - "chip"    — plain green icons that take their brand color on hover (footer).
 *  - "labeled" — icon + label, primary colored (contact page).
 */
type SocialVariant = "brand" | "chip" | "labeled";

const VARIANTS: Record<SocialVariant, { container: string; anchor: string; icon: string }> = {
  brand: {
    container: "flex justify-center gap-6",
    anchor: "flex items-center justify-center w-10 h-10 hover:scale-125 transition-transform",
    icon: "w-7 h-7 text-[var(--social)]",
  },
  chip: {
    container: "flex space-x-4",
    anchor:
      "w-9 h-9 rounded-lg flex items-center justify-center text-brand hover:text-[var(--social)] transition-colors",
    icon: "w-5 h-5",
  },
  labeled: {
    container: "flex flex-wrap gap-x-5 gap-y-2",
    anchor:
      "flex items-center justify-center space-x-2 text-brand hover:scale-110 transition-colors group",
    icon: "w-5 h-5 group-hover:scale-110",
  },
};

interface SocialLinksProps {
  variant?: SocialVariant;
  /** Extra classes merged onto the row container. */
  className?: string;
}

/** The club's social links, rendered from the shared SOCIAL_LINKS list. */
export function SocialLinks({ variant = "brand", className }: SocialLinksProps) {
  const styles = VARIANTS[variant];

  return (
    <div className={cn(styles.container, className)}>
      {SOCIAL_LINKS.map(({ icon: Icon, href, label, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={styles.anchor}
          style={{ "--social": color } as CSSProperties}
        >
          <Icon className={styles.icon} />
          {variant === "labeled" && <span className="group-hover:scale-110">{label}</span>}
        </a>
      ))}
    </div>
  );
}
