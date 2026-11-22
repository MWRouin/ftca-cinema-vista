import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Build a stable slug from a name or role, e.g. "General Secretary" ->
 * "general-secretary". Used for per-member/role i18n keys (About, Person) so
 * the same source name always resolves to the same translation key.
 */
export const slugify = (value: string) => value.toLowerCase().trim().replace(/\s+/g, "-");

/** Up to two initials from a name ("Anis Tounsi" -> "AT"), for portrait placeholders. */
export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => [...word][0]).join("").toUpperCase();
