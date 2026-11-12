/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `next build` writes the deployable files to ./out.
  output: "export",
  // Every URL ends in a slash (/en/movies/), matching the current canonical URLs.
  trailingSlash: true,
  images: { unoptimized: true },
  // Lets app/global-not-found.tsx render the 404 page outside the locale layouts.
  experimental: { globalNotFound: true },
  // Keep Next's tsconfig separate while the Vite app still builds from tsconfig.json.
  typescript: { tsconfigPath: "tsconfig.next.json" },
};

export default nextConfig;
