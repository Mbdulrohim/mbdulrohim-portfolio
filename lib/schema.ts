/**
 * JSON-LD structured data builders.
 *
 * Two jobs:
 *  1. SEO — gives Google an unambiguous entity to attach rankings to.
 *  2. GEO — LLM crawlers parse JSON-LD far more reliably than prose, so this
 *     is the highest-leverage place to state facts you want cited.
 *
 * Every builder strips TODO placeholders, so partial data is always valid
 * structured data rather than schema containing the literal word "TODO".
 */

import {
  siteConfig,
  engagements,
  products,
  sameAs,
  isPlaceholder,
} from "./site-config";

type Json = Record<string, unknown>;

/** Drop keys whose value is undefined, null, a placeholder, or an empty array. */
function clean<T extends Json>(obj: T): T {
  const out: Json = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && isPlaceholder(v)) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

const ids = {
  person: `${siteConfig.url}/#person`,
  website: `${siteConfig.url}/#website`,
  company: `${siteConfig.url}/#organization`,
};

/** The central entity. Everything else on the site points back at this. */
export function personSchema(): Json {
  const { location, company } = siteConfig;

  return clean({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ids.person,
    name: isPlaceholder(siteConfig.legalName)
      ? siteConfig.name
      : siteConfig.legalName,
    alternateName: siteConfig.handle,
    url: siteConfig.url,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    email: isPlaceholder(siteConfig.email)
      ? undefined
      : `mailto:${siteConfig.email}`,
    telephone: isPlaceholder(siteConfig.phone) ? undefined : siteConfig.phone,
    // Explicit contact point so the phone survives into knowledge panels and
    // matches the Google Business Profile exactly.
    contactPoint: isPlaceholder(siteConfig.phone)
      ? undefined
      : clean({
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: siteConfig.phone,
          email: siteConfig.email,
          areaServed: siteConfig.location.countryCode,
          availableLanguage: "English",
        }),
    knowsAbout: [...siteConfig.skills],
    sameAs,
    address: clean({
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.countryCode,
    }),
    worksFor: isPlaceholder(company.name) ? undefined : { "@id": ids.company },
    // Past engagements are surfaced as alumniOf so recruiters' knowledge-panel
    // queries resolve against real employers.
    alumniOf: engagements
      .filter((e) => e.end !== null)
      .map((e) =>
        clean({
          "@type": "Organization",
          name: e.company,
          url: e.url,
        }),
      ),
  });
}

/** The company you run. Ranks independently on service-intent queries. */
export function organizationSchema(): Json | null {
  const { company, location } = siteConfig;
  if (isPlaceholder(company.name)) return null;

  return clean({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ids.company,
    name: company.name,
    url: isPlaceholder(company.url) ? siteConfig.url : company.url,
    description: company.description,
    foundingDate: company.foundingDate,
    identifier: isPlaceholder(company.registrationId)
      ? undefined
      : { "@type": "PropertyValue", name: "CAC RC Number", value: company.registrationId },
    founder: { "@id": ids.person },
    address: clean({
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.countryCode,
    }),
    areaServed: [
      clean({ "@type": "City", name: location.city }),
      clean({ "@type": "AdministrativeArea", name: location.region }),
      clean({ "@type": "Country", name: location.country }),
    ],
  });
}

/**
 * One SoftwareApplication per shipping product.
 *
 * This is the highest-value schema on the site. It states, in the format
 * engines parse most reliably, that real named software exists, on which
 * platforms, built by this person, for this client. Named clients and
 * app-store distribution are exactly the corroboration both Google's E-E-A-T
 * signals and LLM retrieval look for.
 */
export function productSchemas(): Json[] {
  return products.map((p) =>
    clean({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.url}/#product-${p.partNo.toLowerCase()}`,
      name: p.name,
      alternateName: p.formalName,
      url: p.url,
      description: p.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: p.platforms.join(", "),
      author: { "@id": ids.person },
      featureList: p.features,
      audience: clean({
        "@type": "Audience",
        audienceType: p.market,
      }),
      // A named client is third-party evidence, not self-description.
      provider: p.client
        ? { "@type": "Organization", name: p.client, url: p.url }
        : undefined,
    }),
  );
}

/**
 * TechArticle for an application note.
 *
 * `author` points at the same @id as everything else on the site, so each note
 * reinforces one entity instead of floating free as anonymous content. That
 * accumulation is what makes the person, not just the page, citable.
 */
export function articleSchema(note: {
  slug: string;
  title: string;
  summary: string;
  published: string;
  tags: string[];
}): Json {
  const url = `${siteConfig.url}/notes/${note.slug}`;

  return clean({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: note.title,
    description: note.summary,
    url,
    datePublished: note.published,
    dateModified: note.published,
    inLanguage: "en",
    keywords: note.tags.join(", "),
    author: { "@id": ids.person },
    publisher: { "@id": ids.person },
    isPartOf: { "@id": ids.website },
    mainEntityOfPage: url,
  });
}

export function websiteSchema(): Json {
  return clean({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ids.website,
    url: siteConfig.url,
    name: `${siteConfig.name} · ${siteConfig.jobTitle}`,
    inLanguage: "en-NG",
    publisher: { "@id": ids.person },
  });
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/**
 * FAQ blocks are the single most-quoted format in AI Overviews and LLM
 * answers — a direct question/answer pair is trivially extractable.
 */
export function faqSchema(qa: { question: string; answer: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
