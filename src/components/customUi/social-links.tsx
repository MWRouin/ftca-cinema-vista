import { Facebook, Instagram, Youtube, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SocialLink = {
  icon: LucideIcon;
  href: string;
  label: string;
  /** Brand color, used by the "brand" variant. */
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
 *  - "chip"    — rounded primary-tinted chips (footer).
 *  - "labeled" — icon + label, primary colored (contact page).
 */
type SocialVariant = "brand" | "chip" | "labeled";

const VARIANTS: Record<SocialVariant, { container: string; anchor: string; icon: string }> = {
  brand: {
    container: "flex justify-center gap-6",
    anchor: "hover:scale-125 w-10 h-10 transition-transform",
    icon: "w-7 h-7",
  },
  chip: {
    container: "flex space-x-4",
    anchor:
      "w-9 h-9 bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-lg flex items-center justify-center transition-colors group",
    icon: "w-5 h-5 text-primary group-hover:scale-110 transition-transform",
  },
  labeled: {
    container: "flex flex-wrap gap-x-5 gap-y-2",
    anchor:
      "flex items-center justify-center space-x-2 text-primary dark:text-accent hover:scale-110 transition-colors group",
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
        >
          <Icon className={styles.icon} style={variant === "brand" ? { color } : undefined} />
          {variant === "labeled" && <span className="group-hover:scale-110">{label}</span>}
        </a>
      ))}
    </div>
  );
}
