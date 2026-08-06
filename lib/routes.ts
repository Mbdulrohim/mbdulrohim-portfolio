/**
 * Route registry — the one place that knows which pages exist.
 *
 * The sitemap, the nav, and /llms.txt all read from here, so a new page can
 * never silently miss out on being indexed.
 *
 * `priority` and `changeFrequency` are hints, not commands; Google largely
 * ignores them, but Bing and several AI crawlers still read them.
 */

export type Route = {
  path: string;
  /** Nav label. Omit to keep the route out of the visible nav. */
  label?: string;
  /** One-line summary — reused by /llms.txt so crawlers get page intent. */
  summary: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
};

import { notes } from "./notes";

export const routes: Route[] = [
  {
    path: "/",
    label: "Home",
    summary:
      "Homepage: who Abdulrohim is, what he builds, and how to hire him.",
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/notes",
    label: "Application Notes",
    summary:
      "Technical notes written from shipped work: negotiated pricing, grounded AI assistants, device inventory.",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  // Notes derive their own routes, so publishing one cannot leave it out of
  // the sitemap or llms.txt.
  ...notes.map((note) => ({
    path: `/notes/${note.slug}`,
    summary: note.summary,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
];

export const navRoutes = routes.filter((r) => r.label && r.path !== "/");
