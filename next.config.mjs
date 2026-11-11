/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `next build` writes the deployable files to ./out.
  output: "export",
  // Every URL ends in a slash (/en/movies/), matching the current canonical URLs.
  trailingSlash: true,
  images: { unoptimized: true },
  // Keep Next's tsconfig separate while the Vite app still builds from tsconfig.json.
  typescript: { tsconfigPath: "tsconfig.next.json" },
};

export default nextConfig;
