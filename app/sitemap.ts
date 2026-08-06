import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { routes } from "@/lib/routes";
// Required by `output: export`: emit at build time rather than per request.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
