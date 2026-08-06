import type { NextConfig } from "next";
import createMDX from "@next/mdx";

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
  // Application notes are authored as MDX pages.
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
