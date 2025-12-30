/* import HoverImage from "./customUi/hover-image";
 */
interface LogoProps {
  className?: string;
  size?: number;
  alt?: string;
}

/* interface HoverLogoProps {
  size?: number;
  alt?: string;
} */

export function Logo({ className = "", size = 40, alt = "FTCA Hammemlif logo" }: LogoProps) {
  const src = `${import.meta.env.BASE_URL}ftca-hmmlif-logo.svg`;
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}

/* export function LogoHoverPlay({ size = 40, alt = "FTCA Hammemlif logo" }: HoverLogoProps) {
  const src = `${import.meta.env.BASE_URL}ftca-hmmlif-logo.svg`;
  return (
    <HoverPlayImage
      src={src}
      alt={alt}
      size={size}
    />
  );
}
 */