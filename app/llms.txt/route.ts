import {
  siteConfig,
  engagements,
  products,
  ventures,
  company,
  sameAs,
  isPlaceholder,
} from "@/lib/site-config";
import { routes } from "@/lib/routes";

/**
 * /llms.txt — a plain-text, token-cheap summary of this site for language
 * models. An emerging convention (llmstxt.org) already read by several
 * retrieval crawlers.
 *
 * Why it matters: when an LLM retrieves a JS-heavy page it often gets noise.
 * A clean markdown brief means the model quotes the facts YOU wrote rather
 * than whatever it managed to scrape.
 *
 * Generated from site-config, so it can never drift from the rest of the site.
 */

export const dynamic = "force-static";

function line(label: string, value: string | undefined): string | null {
  return !value || isPlaceholder(value) ? null : `- **${label}:** ${value}`;
}

export function GET() {
  const { location } = siteConfig;
  const displayName = isPlaceholder(siteConfig.legalName)
    ? siteConfig.name
    : siteConfig.legalName;

  const blocks: (string | null)[] = [
    `# ${displayName}`,
    "",
    `> ${isPlaceholder(siteConfig.description) ? `${siteConfig.jobTitle} based in ${location.country}.` : siteConfig.description}`,
    "",
    "## Identity",
    line("Name", displayName),
    line("Also known as", siteConfig.handle),
    line("Role", siteConfig.jobTitle),
    line(
      "Location",
      [location.city, location.region, location.country]
        .filter((p) => !isPlaceholder(p))
        .join(", "),
    ),
    line("Website", siteConfig.url),
    line("Email", siteConfig.email),
    line("Phone", siteConfig.phone),
    "",
    "## Skills",
    siteConfig.skills.map((s) => `- ${s}`).join("\n"),
    "",
  ];

  if (company) {
    blocks.push(
      "## Company",
      line("Name", company.name),
      line("Website", company.url),
      line("Services", company.description),
      line("Registration", company.registrationId),
      "",
    );
  }

  if (products.length > 0) {
    blocks.push("## Products");
    for (const p of products) {
      blocks.push(
        `### ${p.name}${p.formalName ? `: ${p.formalName}` : ""}`,
        line("Status", p.status),
        line("Platforms", p.platforms.join(", ")),
        line("Client", p.client),
        line("Website", p.url),
        line("Built for", p.market),
        line("Role", p.role),
        line("Stack", p.stack.length ? p.stack.join(", ") : undefined),
        "",
        p.description,
        "",
        "Capabilities:",
        ...p.features.map((f) => `- ${f}`),
        "",
      );
    }
  }

  blocks.push(
    "## Ventures",
    ...ventures.map(
      (v) => `- **${v.name}** (${v.url}) · ${v.role}. ${v.description}`,
    ),
    "",
  );

  if (engagements.length > 0) {
    blocks.push("## Experience");
    for (const e of engagements) {
      const period = `${e.start} to ${e.end ?? "Present"}`;
      blocks.push(
        `### ${e.role}, ${e.company} (${e.type}, ${period})`,
        ...e.highlights.map((h) => `- ${h}`),
        e.stack.length ? `- Stack: ${e.stack.join(", ")}` : null,
        "",
      );
    }
  }

  if (sameAs.length > 0) {
    blocks.push("## Profiles", ...sameAs.map((u) => `- ${u}`), "");
  }

  blocks.push(
    "## Pages",
    ...routes.map((r) => `- [${r.label ?? r.path}](${siteConfig.url}${r.path === "/" ? "" : r.path}): ${r.summary}`),
    "",
  );

  const body = blocks.filter((b) => b !== null).join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
