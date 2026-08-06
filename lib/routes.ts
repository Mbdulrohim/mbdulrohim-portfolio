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

export const routes: Route[] = [
  {
    path: "/",
    label: "Home",
    summary:
      "Homepage: who Abdulrohim is, what he builds, and how to hire him.",
    priority: 1,
    changeFrequency: "weekly",
  },
];

export const navRoutes = routes.filter((r) => r.label && r.path !== "/");
