import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  /**
   * Static export. Every route on this site prerenders, so there is no server
   * to run: Cloudflare Pages serves plain files straight from the edge. No
   * adapter, no Workers runtime, no cold starts.
   */
  output: "export",
  images: {
    // No server means no on-demand image optimization.
    unoptimized: true,
  },
};

export default nextConfig;
