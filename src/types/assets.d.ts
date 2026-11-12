// Font files imported as URLs (see the preload links in app/[locale]/layout.tsx).
declare module "*.woff2" {
  const asset: string | { src: string };
  export default asset;
}
