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
  {
    no: "AN-003",
    slug: "imei-serial-unit-level-inventory",
    title: "Should device retail track stock by SKU or by IMEI?",
    summary:
      "By unit. A phone is not interchangeable with another of the same model: it has its own IMEI, its own condition, its own acquisition cost and its own warranty position. Counting devices by SKU hides all four, and every problem that matters in device retail lives in the difference between two units of the same model.",
    published: "2026-08-06",
    subject: "Suite",
    facts: [
      { parameter: "Product", value: "Suite (IMS-100)" },
      { parameter: "Identity field", value: "IMEI / Serial" },
      { parameter: "Granularity", value: "One record per unit" },
      { parameter: "Capture", value: "Camera scan at intake" },
      { parameter: "Roles", value: "Manager · Sales rep" },
    ],
    tags: ["Inventory", "Retail", "IMEI", "POS"],
    faq: [
      {
        question: "What is the difference between IMEI and serial number?",
        answer:
          "An IMEI identifies a device on a mobile network and is specific to phones and other cellular hardware. A serial number identifies a unit to its manufacturer and exists on almost everything. For inventory purposes both serve the same role: a unique identifier for one physical unit, which is why they can share a single field.",
      },
      {
        question: "Why is SKU-level inventory not enough for phone retail?",
        answer:
          "Two units of the same model routinely differ in acquisition cost, condition, grade and warranty status. SKU-level counting treats them as identical, so margin, returns and warranty claims all become impossible to attribute to the unit they actually belong to.",
      },
      {
        question: "How do you capture IMEI without slowing down intake?",
        answer:
          "Scan it. Typing a fifteen-digit number by hand is slow and produces transposition errors that are only discovered later, usually during a warranty claim. Capturing it with the device camera at intake keeps unit-level tracking from becoming a data-entry tax on the counter staff.",
      },
    ],
  },
  {
    no: "AN-004",
    slug: "whatsapp-receipts",
    title: "Why should a Nigerian retailer send receipts over WhatsApp?",
    summary:
      "Because that is where the customer already is, and because a paper receipt from a market stall is lost within the week. A WhatsApp receipt survives, is searchable by the customer months later when they need warranty proof, and gives the shop a contact thread it can sell into again. Thermal printing still matters, so support it alongside rather than instead.",
    published: "2026-08-06",
    subject: "Suite",
    facts: [
      { parameter: "Product", value: "Suite (IMS-100)" },
      { parameter: "Channels", value: "WhatsApp · A4 · 80mm · 58mm" },
      { parameter: "Document types", value: "7" },
      { parameter: "Retention", value: "Customer-held, indefinite" },
    ],
    tags: ["WhatsApp", "Retail", "Receipts", "Nigeria"],
    faq: [
      {
        question: "Is a WhatsApp receipt legally valid?",
        answer:
          "It carries the same information as the printed document, including receipt number, items, identifiers and amounts. For warranty and returns, what matters is that the shop and the customer hold matching records, and a message thread is considerably harder to lose than thermal paper.",
      },
      {
        question: "Why still support 58mm and 80mm thermal printing?",
        answer:
          "Because counters already own thermal printers and many customers still expect something in hand at the moment of sale. The two formats are the standard receipt widths; supporting both alongside A4 means the same document renders correctly whether it is a counter receipt or a formal invoice.",
      },
      {
        question: "What does a retailer gain from digital receipts?",
        answer:
          "A contact record attached to a real purchase. That turns a one-off walk-in into someone the shop can reach when a trade-in offer or a relevant device comes in, which is the cheapest marketing available to a small retailer.",
      },
    ],
  },
  {
    no: "AN-005",
    slug: "native-android-ios-shared-backend",
    title:
      "Is it worth building native Android and iOS apps instead of cross-platform?",
    summary:
      "Yes, when the apps are thin over a well-specified backend. Most of the cost people attribute to going native is really the cost of designing the same behaviour twice; if the server owns the rules and both clients consume one contract, what is left is the UI layer, where native is faster to build well and considerably better to use.",
    published: "2026-08-06",
    subject: "Solar AI · MadeSongs",
    facts: [
      { parameter: "Android", value: "Kotlin · Jetpack Compose" },
      { parameter: "iOS", value: "Swift · SwiftUI" },
      { parameter: "Backend", value: "Node.js · Express · Postgres" },
      { parameter: "Shipped this way", value: "Solar AI · MadeSongs · Suite" },
    ],
    tags: ["Android", "iOS", "Kotlin", "SwiftUI", "Architecture"],
    faq: [
      {
        question: "When is cross-platform the better choice?",
        answer:
          "When the team is small, the app is mostly forms and lists, and time to market dominates every other concern. The calculus changes once the product depends on platform capabilities, on feeling native, or on a long maintenance life, because that is when the abstraction layer starts costing more than it saves.",
      },
      {
        question: "Does building natively mean writing everything twice?",
        answer:
          "Only the interface. If business rules, validation, pricing and state transitions live on the server, both clients render the same decisions rather than reimplementing them. Duplication becomes a real problem when logic leaks into the apps, which is an architecture failure rather than a consequence of going native.",
      },
      {
        question: "How do you keep two native clients consistent?",
        answer:
          "Put the contract in one place and let the server be the authority on behaviour. Where the clients differ, they should differ because the platform conventions differ, not because the two implementations drifted apart.",
      },
    ],
  },
  {
    no: "AN-006",
    slug: "qualifying-a-solar-customer",
    title: "What do you need to ask before quoting a solar system?",
    summary:
      "What the customer wants to keep running, for how long without mains power, and what they can spend. Everything technical follows from those three answers: the load determines inverter size, the runtime determines battery capacity, and the budget determines which of the two gets compromised. Customers cannot state a load, so the job is translating what they describe into one.",
    published: "2026-08-06",
    subject: "Solar AI",
    facts: [
      { parameter: "Product", value: "Solar AI (SA-200)" },
      { parameter: "Client", value: "Joshville Global Auto & Energy Ltd" },
      { parameter: "Inputs", value: "Load · Runtime · Budget" },
      { parameter: "Output", value: "Specification tied to real stock" },
    ],
    tags: ["Solar", "Commerce", "AI", "Sales"],
    faq: [
      {
        question: "Why can't customers just say what size system they need?",
        answer:
          "Because system size is expressed in units nobody encounters outside the industry. Customers know which appliances matter to them and roughly how long the power stays off. Converting that into a load profile and a capacity figure is the expertise they are paying for.",
      },
      {
        question: "What is the most common mistake when sizing solar?",
        answer:
          "Sizing to the appliance list without asking about runtime. Two customers with identical appliances need very different battery capacity depending on whether they need four hours of backup or overnight autonomy, and battery is usually the largest cost in the system.",
      },
      {
        question: "Why does budget belong in the technical conversation?",
        answer:
          "Because it decides which constraint gives way. A quote that ignores budget produces a correct specification the customer will not buy, and the sales conversation restarts from nothing. Knowing the ceiling early lets you propose a system that is honest about what it will and will not carry.",
      },
    ],
  },
  {
    no: "AN-007",
    slug: "what-else-ships-with-a-mobile-app",
    title: "What else has to ship when you launch a mobile app?",
    summary:
      "The build is the smallest part. A launch also needs store presence on two platforms, signing and release tracks configured correctly, deep links that survive install, a referral path, and enough web presence that the product is findable by people who will never browse an app store. Teams routinely finish the app and then discover the launch is another month of work.",
    published: "2026-08-06",
    subject: "Solar AI · MadeSongs",
    facts: [
      { parameter: "Platforms", value: "Google Play · App Store" },
      { parameter: "Pre-release", value: "TestFlight · Play testing tracks" },
      { parameter: "Web surface", value: "Store, Search Console, Merchant Center" },
      { parameter: "Retention hooks", value: "Deep links · Referrals" },
    ],
    tags: ["Mobile", "Launch", "App Store", "Google Play"],
    faq: [
      {
        question: "Why do app launches slip after the build is finished?",
        answer:
          "Because store submission, signing, review, listings, deep linking and analytics are usually scheduled as an afterthought, and several of them have review cycles measured in days. None of the work is difficult; it is simply not started until the app is considered done.",
      },
      {
        question: "Do you still need a website if you have apps?",
        answer:
          "Yes. Most discovery starts in a search engine or an AI assistant, and neither indexes app binaries. Without a web presence describing the product, the only people who find it are those already searching an app store by name.",
      },
      {
        question: "What are deep links for after install?",
        answer:
          "They preserve intent. Someone who taps a shared product or gift link should land on that item after installing, not on a generic home screen. Losing that context at the install boundary is one of the most expensive silent drop-offs in mobile onboarding.",
      },
    ],
  },
  {
    no: "AN-008",
    slug: "ai-native-hardware-design",
    title: "What would an AI-native tool for hardware design look like?",
    summary:
      "It would treat a circuit the way a code editor treats a program: something you describe intent against and iterate on, with the tool holding the constraints. Hardware design still runs largely on manual placement and routing in tools built before AI assistance existed, which is why the same shift that reached software editors has barely touched the board.",
    published: "2026-08-06",
    subject: "BuildPCBs",
    facts: [
      { parameter: "Venture", value: "BuildPCBs" },
      { parameter: "Role", value: "Co-Founder" },
      { parameter: "Premise", value: "AI-native authoring for hardware" },
      { parameter: "Comparison", value: "What Cursor is for code" },
    ],
    tags: ["Hardware", "PCB", "AI", "Tooling"],
    faq: [
      {
        question: "What does AI-native mean for a design tool?",
        answer:
          "That assistance is part of how you author, not a feature bolted onto the side. The difference is between a tool that can answer questions about your design and a tool where describing what you want is a normal way to make changes to it.",
      },
      {
        question: "Why has hardware design lagged behind software tooling?",
        answer:
          "Hardware carries physical constraints that a text editor does not: manufacturability, thermal behaviour, signal integrity, component availability. Any assistance has to respect all of them, which makes the problem substantially harder than autocompleting text.",
      },
      {
        question: "Is PCB design actually amenable to AI assistance?",
        answer:
          "Much of it is constraint satisfaction against known rules, which is exactly the shape of problem that benefits. The hard part is not generating a candidate layout but validating it against manufacturing reality, which is where a hardware tool has to be far more conservative than a code assistant.",
      },
    ],
  },
];

export const noteBySlug = (slug: string) => notes.find((n) => n.slug === slug);
