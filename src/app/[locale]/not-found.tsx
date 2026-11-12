import NotFound from "@/views/NotFound";

// Shown inside the locale shell when a page under /<locale>/ calls notFound().
// The static export's own 404.html is app/global-not-found.tsx.
export default function LocaleNotFound() {
  return <NotFound />;
}
