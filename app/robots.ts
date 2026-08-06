import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
// Required by `output: export`: emit at build time rather than per request.
export const dynamic = "force-static";

/**
 * Crawler policy.
 *
 * The AI crawlers are listed EXPLICITLY on purpose. This is the GEO strategy:
 * most sites either block them or leave it ambiguous. Explicit allow rules
 * mean ChatGPT, Claude, Perplexity, and Gemini can retrieve and cite this
 * site when someone asks them for a developer in Nigeria.
 *
 * Note the distinction between the two crawler roles:
 *  - *Bot   (GPTBot, ClaudeBot, ...)      → training + index corpus
 *  - *-User (OAI-SearchBot, Claude-User)  → live retrieval during a chat
 * You want both. Live-retrieval bots are what produce real-time citations.
 */
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot", // OpenAI — index/training
    "OAI-SearchBot", // OpenAI — ChatGPT search retrieval
    "ChatGPT-User", // OpenAI — user-initiated browsing
    "ClaudeBot", // Anthropic — index
    "Claude-User", // Anthropic — live retrieval
    "Claude-SearchBot",
    "PerplexityBot", // Perplexity — index
    "Perplexity-User", // Perplexity — live retrieval
    "Google-Extended", // Gemini grounding / AI Overviews
    "Applebot-Extended", // Apple Intelligence
    "CCBot", // Common Crawl — feeds many downstream models
    "meta-externalagent", // Meta AI
    "Bingbot", // Powers Copilot as well as Bing
    "DuckAssistBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next.js internals and API routes carry no ranking value.
        disallow: ["/api/", "/_next/static/chunks/"],
      },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
