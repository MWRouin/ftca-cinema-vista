import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `next build` writes the deployable files to ./out.
  output: "export",
  // Every URL ends in a slash (/en/movies/), matching the current canonical URLs.
  trailingSlash: true,
  images: { unoptimized: true },
  // Lets app/global-not-found.tsx render the 404 page outside the locale layouts.
  experimental: { globalNotFound: true },
};

export default (phase) =>
  phase === PHASE_DEVELOPMENT_SERVER
    ? {
        ...nextConfig,
        // Lets phones and other machines on the local network load the dev
        // server's scripts and hot reload via a local address: loopback
        // (127.x), the private ranges (10.x, 172.16–31.x, 192.168.x) and
        // mDNS names (name.local). Next accepts no bare "*".
        allowedDevOrigins: [
          "127.*.*.*",
          "10.*.*.*",
          ...Array.from({ length: 16 }, (_, i) => `172.${16 + i}.*.*`),
          "192.168.*.*",
          "*.local",
        ],
      }
    : nextConfig;
