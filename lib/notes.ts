/**
 * Application notes registry.
 *
 * Single source of truth for note metadata. The MDX files carry only prose;
 * everything structural — title, date, schema, sitemap entry, llms.txt line —
 * is read from here, so a note can never be published without being indexed.
 *
 * Datasheets ship application notes alongside the part. Same idea: short
 * documents on how the thing is actually used.
 */

export type Note = {
  /** Document number, e.g. "AN-001". Ordering is by number, not date. */
  no: string;
  slug: string;
  /**
   * Titles are questions on purpose. A question-shaped title matches how
   * people prompt an LLM, and makes the page an obvious answer to retrieve.
   */
  title: string;
  /**
   * The answer, in two or three sentences, sitting directly under the title.
   * This is the passage most likely to be quoted verbatim, so it has to stand
   * alone without the rest of the article.
   */
  summary: string;
  /** ISO date. Real publication date — see docs/content-strategy.md. */
  published: string;
  /** Which product the note draws on. */
  subject: string;
  /** Key facts table rendered under the summary. */
  facts: { parameter: string; value: string }[];
  tags: string[];
  /** Question/answer pairs emitted as FAQPage schema. */
  faq: { question: string; answer: string }[];
};

export const notes: Note[] = [
  {
    no: "AN-001",
    slug: "negotiation-floor-pricing",
    title: "How do you build POS pricing for a market where haggling is normal?",
    summary:
      "Give every item three prices instead of one: a cost price, a target price the seller opens at, and a floor price the till will not go below. Sales staff then negotiate freely inside that band without needing a manager, and without any single sale going below margin. Price changes are audited, so the floor cannot quietly drift.",
    published: "2026-08-06",
    subject: "Suite",
    facts: [
      { parameter: "Product", value: "Suite (IMS-100)" },
      { parameter: "Market", value: "Computer Village, Ikeja" },
      { parameter: "Price tiers", value: "3 (cost, target, floor)" },
      { parameter: "Trade-in floor", value: "1.1x valuation" },
      { parameter: "Audit", value: "Every floor and target change" },
    ],
    tags: ["POS", "Retail", "Pricing", "Nigeria"],
    faq: [
      {
        question: "What is a floor price in a point-of-sale system?",
        answer:
          "A floor price is the lowest amount a sales assistant is allowed to accept for an item. It sits above cost price, so any sale at or above the floor still earns margin. The till refuses to complete a sale below it, which lets staff negotiate without supervision.",
      },
      {
        question:
          "Why do Nigerian retailers need different POS pricing from Western retailers?",
        answer:
          "In markets like Computer Village, Ikeja, the listed price is an opening position rather than the final price, and nearly every sale is negotiated. A single fixed price per item does not describe how the shop actually trades, so the system has to model a price range instead.",
      },
      {
        question: "How should a trade-in be priced into stock?",
        answer:
          "Value the incoming device, then set its floor price as a markup on that valuation rather than on a catalogue price. In Suite the floor is set at 1.1x the trade-in valuation, so a device taken in part-exchange carries its own margin from the moment it enters stock.",
      },
    ],
  },
  {
    no: "AN-002",
    slug: "grounding-ai-in-a-product-catalogue",
    title: "How do you ground an AI assistant in a real product catalogue?",
    summary:
      "Stop the model inventing products by giving it only the catalogue as its source of truth: it sizes the customer's requirement, then selects from stock the business actually holds, at that market's real prices. The recommendation becomes an order the company can fulfil, rather than a plausible-sounding answer nobody can sell.",
    published: "2026-08-06",
    subject: "Solar AI",
    facts: [
      { parameter: "Product", value: "Solar AI (SA-200)" },
      { parameter: "Client", value: "Joshville Global Auto & Energy Ltd" },
      { parameter: "Grounding source", value: "Live product catalogue" },
      { parameter: "Pricing basis", value: "NGN, local market" },
      { parameter: "Surfaces", value: "Android, iOS, Web" },
    ],
    tags: ["AI", "Commerce", "Solar", "Retrieval"],
    faq: [
      {
        question: "What does it mean to ground an AI assistant?",
        answer:
          "Grounding means the assistant answers only from a specified source of data rather than from its training. For a commerce assistant, that source is the product catalogue and its current prices, so every recommendation maps to something the business genuinely stocks and can install.",
      },
      {
        question: "Why not just use a general chatbot for product recommendations?",
        answer:
          "A general chatbot will confidently recommend products the business does not sell, at prices from another market. That produces a good conversation and no order. Grounding the assistant in the live catalogue means the end of the conversation is something the sales team can actually quote.",
      },
      {
        question: "How do you handle local pricing in an AI recommendation?",
        answer:
          "Prices have to come from the catalogue at request time, in local currency, rather than from the model. Solar equipment pricing in Nigeria does not resemble the figures a general model has absorbed from other markets, so any price the model produces on its own will be wrong.",
      },
    ],
  },
];

export const noteBySlug = (slug: string) => notes.find((n) => n.slug === slug);
