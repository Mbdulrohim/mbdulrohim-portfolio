/**
 * Single source of truth for every fact the site publishes.
 *
 * Everything here feeds metadata, JSON-LD structured data, the sitemap,
 * and /llms.txt. Change a fact once, it propagates everywhere.
 *
 * ⚠️  Fields marked TODO are NOT yet filled with real data. Nothing that is
 *     still a TODO gets rendered or emitted — see the `isPlaceholder` guards.
 */

export const PLACEHOLDER = "TODO" as const;

export const isPlaceholder = (v: string | undefined | null): boolean =>
  !v || v.startsWith(PLACEHOLDER);

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────
  /** Domain the site is served from. No trailing slash. */
  url: "https://mbdulrohim.dev",
  /** Display name used in headings and OG titles. */
  name: "Abdulrohim M.",
  /** Full legal name — used in Person schema `name`. */
  legalName: "Abdulrohim Mustapha",
  /** Handle used across GitHub/X. Doubles as a branded search term. */
  handle: "mbdulrohim",
  /** One-line role, used as the schema `jobTitle`. */
  jobTitle: "Software Engineer & Founder",
  /** Short description. Keep under 160 chars — this is the meta description. */
  description:
    "Software engineer and founder. I build AI-powered commerce, education and operations platforms shipped on Android, iOS and web. Based in Lagos, working worldwide.",
  /** Contact address shown on the site and in schema. */
  email: "hi@mbdulrohim.dev",
  /**
   * Public phone in E.164. This must match the Google Business Profile and
   * every other listing character for character: inconsistent name/address/
   * phone across the web is the most common reason local rankings stall.
   */
  phone: "+2347040468798",
  /** Human-readable form for display only. */
  phoneDisplay: "+234 704 046 8798",

  // ── Location (drives local/GEO ranking) ───────────────────────────────
  location: {
    city: "Ikeja",
    /** State or FCT, e.g. "Lagos State" / "Federal Capital Territory". */
    region: "Lagos State",
    country: "Nigeria",
    countryCode: "NG",
    /** How the location reads in prose. Must match the Google Business
     *  Profile listing exactly. */
    display: "Ikeja, Lagos",
  },

  // ── Profiles (become schema `sameAs` — how engines confirm identity) ───
  profiles: {
    github: "https://github.com/mbdulrohim",
    x: "https://x.com/mbdulrohim",
    twitterHandle: "@mbdulrohim",
    linkedin: "https://www.linkedin.com/in/mbdulrohim/",
    // Add any others you actually control — each one strengthens entity
    // resolution for both Google and LLM retrieval.
  },

  // ── Core skills, used in schema `knowsAbout` ──────────────────────────
  skills: [
    "TypeScript",
    "React / Next.js",
    "Node.js / Express",
    "Swift",
    "Kotlin / Jetpack Compose",
    "Postgres / Drizzle",
    "AI Product Engineering",
    "Rust",
    "Solana",
    "Embedded Systems",
  ],
} as const;

/**
 * Companies co-founded.
 *
 * One shape for both. These were previously modelled two different ways —
 * `company` for the registered one and a hardcoded `buildpcbs` key — which was
 * historical accident, not design, and meant the two rendered differently on
 * the page for no reason.
 *
 * `isRegisteredCompany` marks the one that carries Organization schema, the
 * CAC registration and the Google Business Profile. Exactly one venture should
 * set it.
 */
export type Venture = {
  name: string;
  /** Exactly as registered. Emitted as schema `legalName`. */
  legalName?: string;
  url: string;
  /** Your role: Co-Founder, Founder, and so on. */
  role: string;
  /** One line. Renders under the name. */
  description: string;
  /** Optional longer positioning paragraph. */
  longDescription?: string;
  /** The specific, defensible reason nothing else does this. */
  differentiator?: string;
  /** The registered entity: Organization schema, CAC details, the GBP. */
  isRegisteredCompany?: boolean;
  registrationId?: string;
  foundingDate?: string;
  /** Emitted as an offer catalogue. Each is a service-intent search term. */
  services?: { name: string; description: string }[];
  /** Stops engines concluding the company only serves its home country. */
  areaServedGlobal?: boolean;
};

export const ventures: Venture[] = [
  {
    name: "Copper Ledger",
    legalName: "Copper Ledger Ltd",
    url: "https://copperledgerhq.com",
    role: "Co-Founder",
    description: "Software products, shipped on Android, iOS and web.",
    longDescription:
      "Copper Ledger builds and ships software products: native Android and iOS applications, web platforms, and AI-powered commerce and operations systems. We take products from concept through to release on Google Play and the App Store, and work with clients internationally. Suite is our first product.",
    isRegisteredCompany: true,
    registrationId: "TODO: CAC RC number",
    foundingDate: "TODO: YYYY-MM-DD",
    areaServedGlobal: true,
    services: [
      {
        name: "Mobile App Development",
        description:
          "Native Android and iOS applications in Kotlin and Swift, taken from concept through to release on Google Play and the App Store.",
      },
      {
        name: "Web & Commerce Platforms",
        description:
          "Web applications and online stores, built to be found, to sell, and to hold up under real traffic.",
      },
      {
        name: "AI Product Engineering",
        description:
          "Assistants grounded in a business's own catalogue, pricing and data, so recommendations become orders rather than conversations.",
      },
      {
        name: "Inventory & Point-of-Sale Systems",
        description:
          "Unit-level stock tracking, counter POS, trade-ins and receipts, for retail where every unit differs.",
      },
      {
        name: "Digital & Social Media Marketing",
        description:
          "Search visibility and social channels, run so that attention turns into orders.",
      },
    ],
  },
  {
    name: "BuildPCBs",
    url: "https://buildpcbs.com",
    role: "Co-Founder",
    description: "Building the interface between AI and hardware.",
    longDescription:
      "BuildPCBs is an AI-native environment for hardware development: the equivalent of an AI code editor, but for designing circuit boards. Software engineers gained AI assistance that understands their whole project; hardware engineers largely did not. BuildPCBs brings that same kind of assistance into the PCB design workflow, so the AI works against the real board, its components and its constraints.",
    // Stated as "at launch" rather than an open-ended "only one in the world".
    // It is the version that stays true over time and survives a sceptical
    // reader checking it.
    differentiator:
      "At launch there was no comparable tool: AI assistance for hardware design had not been built the way it had for software.",
  },
];

/** The registered entity. Drives Organization schema and the Business Profile. */
export const company = ventures.find((v) => v.isRegisteredCompany);

/** Profile URLs that are real (placeholders stripped) — for schema `sameAs`. */
export const sameAs: string[] = [
  siteConfig.profiles.github,
  siteConfig.profiles.x,
  siteConfig.profiles.linkedin,
  ...ventures.map((v) => v.url),
].filter((u) => !isPlaceholder(u));

/**
 * Work history. Deliberately EMPTY until real employment facts are supplied.
 * Nothing renders from an empty array, so no invented history can ship.
 */
export type Engagement = {
  /** Company name as it is publicly known. */
  company: string;
  /** Company website — used for schema `worksFor.url`. */
  url?: string;
  /** Your title during the engagement. */
  role: string;
  /** "Contract" | "Full-time" | "Founder" etc. */
  type: string;
  /** ISO dates. `end: null` means current. */
  start: string;
  end: string | null;
  location?: string;
  /** 2-4 outcome bullets. Numbers beat adjectives for both SEO and GEO. */
  highlights: string[];
  stack: string[];
};

export const engagements: Engagement[] = [];

/**
 * Shipping products. These carry the commercial weight of the site — a product
 * with paying users outranks and out-converts a generic portfolio.
 */
export type Product = {
  /** Product name as marketed. */
  name: string;
  /** Formal/descriptive name — often the better search-term match. */
  formalName?: string;
  /** Datasheet part number. Cosmetic, but it sells the concept. */
  partNo: string;
  url?: string;
  /** Client this was built for. A named client is the strongest trust signal
   *  on the site — it is third-party evidence rather than self-description. */
  client?: string;
  /** What the engagement covered. */
  role?: string;
  /** One paragraph, written in the words a buyer would search for. */
  description: string;
  /** Who it is for. Drives long-tail local intent. */
  market: string;
  status: string;
  /** Shipping surfaces. Rendered as the package/platform row. */
  platforms: string[];
  /** Spec rows rendered into the product's characteristics table. */
  specs: { parameter: string; value: string; unit?: string }[];
  features: string[];
  stack: string[];
};

export const products: Product[] = [
  {
    name: "Solar AI",
    formalName: "Solar Commerce & Operations Platform",
    partNo: "SA-200",
    url: "https://joshvilleglobal.com",
    client: "Joshville Global Auto & Energy Ltd",
    role: "Full product lifecycle: architecture, mobile, backend, infrastructure, launch",
    description:
      "A complete solar commerce and operations platform built for a renewable energy company. Customers size their power needs, chat with an AI assistant, and get solar setup recommendations drawn from Joshville's real product catalogue and Nigerian pricing, then browse equipment, request quotes, and place orders that feed directly into the company's sales and installation workflow. What began as a mobile app became the operating system for the business.",
    market:
      "Homeowners and businesses buying solar in Nigeria, plus Joshville's internal sales, operations, and field installation teams.",
    status: "Live · Google Play released · iOS in launch preparation",
    platforms: ["Android", "iOS", "Web"],
    specs: [
      { parameter: "Client", value: "Joshville Global Auto & Energy Ltd" },
      { parameter: "Surfaces", value: "6" },
      { parameter: "AI grounding", value: "Live product catalogue" },
      { parameter: "Pricing basis", value: "NGN", unit: "Nigerian market" },
      { parameter: "Distribution", value: "Google Play · App Store · Web" },
    ],
    features: [
      "AI assistant grounded in the real Joshville product catalogue",
      "Power-needs assessment and solar setup recommendation",
      "Equipment catalogue with quote requests and ordering",
      "Consumer Android app in Kotlin and Jetpack Compose",
      "Consumer iOS app in SwiftUI",
      "Public website and online store at joshvilleglobal.com",
      "Staff admin suite for products, inventory, customers, quotes and orders",
      "Installer portal for field installation workflows",
      "Push notifications, referrals and deep-link workflows",
      "Google Merchant Center and Search Console setup",
      "Project Studio design canvas for system proposals (planned)",
    ],
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "SwiftUI",
      "Node.js",
      "Express",
      "TypeScript",
      "Postgres",
      "Drizzle",
    ],
  },
  {
    name: "O/Prep",
    formalName: "Professional Exam Preparation Platform",
    partNo: "OP-400",
    url: "https://www.prepnmcn.com",
    role: "Product and platform build across web and mobile",
    description:
      "An exam preparation platform for nursing, medical, legal and other professional certifications. Learners build structured study plans, practise against real exam formats, track streaks and progress, and stay accountable alongside peers, guided by an eight-step methodology that adapts to how each learner is actually performing.",
    market:
      "Candidates sitting professional certification exams across Africa, in nursing, medicine, law and allied fields, plus the universities preparing them.",
    status: "Live",
    platforms: ["Android", "iOS", "Web"],
    specs: [
      { parameter: "Learners", value: "5,000+" },
      { parameter: "Partner universities", value: "30+" },
      { parameter: "Methodology", value: "8-step adaptive" },
      { parameter: "Disciplines", value: "Nursing · Medical · Legal" },
    ],
    features: [
      "Adaptive study plans built around each exam",
      "Practice against real professional exam formats",
      "Progress tracking with streaks and momentum insights",
      "Peer accountability and shared study groups",
      "Personalised coaching guidance",
      "Learner dashboard with real-time performance insight",
      "University partner onboarding",
    ],
    stack: [
      "React",
      "TypeScript",
      "Swift",
      "Kotlin",
      "Jetpack Compose",
      "Node.js",
      "Express",
      "Postgres",
    ],
  },
  {
    name: "MadeSongs",
    formalName: "AI Music Gifting Platform",
    partNo: "MS-300",
    url: "https://madesongs.com",
    role: "Product direction, mobile development, backend integration, release engineering",
    description:
      "A cross-platform music gifting platform. Users create personalised AI-generated songs, dedicate them to someone, and deliver them as digital gifts by email or shareable redemption link. Covers song generation and lyrics, playback with background media controls, gift vaults, subscription plans with regional pricing, and purchase verification.",
    market:
      "People sending personalised gifts for birthdays, weddings, anniversaries and celebrations.",
    status: "In development · TestFlight releases",
    platforms: ["iOS", "Android", "Web"],
    specs: [
      { parameter: "Song generation", value: "AI lyrics and audio" },
      { parameter: "Delivery", value: "Email · Redemption link" },
      { parameter: "Monetisation", value: "Subscription · Regional pricing" },
      { parameter: "Distribution", value: "App Store · Google Play · Web" },
    ],
    features: [
      "Custom onboarding and song creation flow",
      "AI song and lyric generation",
      "Playback with background media controls",
      "Gift vaults and shareable redemption links",
      "Subscription plans with regional pricing",
      "Purchase verification",
      "Backend for users, songs, gifts, subscriptions and notifications",
      "UI implemented from Figma designs",
    ],
    stack: [
      "Swift",
      "Kotlin",
      "Jetpack Compose",
      "React",
      "Node.js",
      "Express",
      "Postgres",
    ],
  },
  {
    name: "Suite",
    // The expansion carries the search terms the short name cannot: buyers
    // look for "inventory management system" and "POS", not "Suite".
    formalName: "IMS Suite: Inventory Management & Point of Sale",
    partNo: "IMS-100",
    url: "https://suite.ng",
    role: "Own product — designed, built and operated by Copper Ledger Ltd",
    platforms: ["Android", "iOS", "Web"],
    description:
      "An IMS Suite for inventory management and point-of-sale, built for high-turnover gadget retail. Tracks stock by IMEI and serial number, runs a counter POS with negotiation floor pricing so staff can haggle without selling below margin, handles trade-in swaps, issues receipts over WhatsApp, and lets traders source stock from each other.",
    market:
      "Phone and gadget traders in Computer Village, Ikeja, and gadget retailers across Nigeria.",
    status: "Live · deployed with pilot merchants",
    specs: [
      { parameter: "Merchants deployed", value: "3" },
      { parameter: "Paying merchants", value: "1" },
      { parameter: "Stock identity", value: "IMEI / Serial" },
      { parameter: "Receipt formats", value: "WhatsApp · A4 · 80mm · 58mm" },
    ],
    features: [
      "IMEI and serial-number stock tracking",
      "Counter POS with negotiation floor pricing",
      "Trade-in and device swap valuation",
      "WhatsApp receipts",
      "Inter-trader sourcing between merchants",
      "Credit ledger and supplier returns",
      "Barcode and IMEI scanning via device camera",
      "Role-based team access with PIN authorisation",
    ],
    stack: [
      "React",
      "TypeScript",
      "Swift",
      "Kotlin",
      "Jetpack Compose",
      "Node.js",
      "Express",
      "Gemini API",
    ],
  },
];

export type SiteConfig = typeof siteConfig;
