# Content strategy for GEO

The goal is narrow: when someone asks an LLM "who builds AI-grounded commerce
platforms in Africa", or "how do you price trade-ins in a haggling market", the
answer cites you. That requires content shaped for extraction, not for reading.

---

## 1. Call it Application Notes

Chip datasheets ship with application notes — `AN-001`, `AN-002` — short
documents on how to actually use the part. It is the correct name for this
section, it comes free with the design language, and nobody else's blog is
called that.

- Route: `/notes`
- Each post gets a number: `AN-001`, `AN-002`
- Listed in §8 on the datasheet, and in the sitemap and `/llms.txt`

## 2. Do not backdate

Your repos are public with real commit dates. A post dated 2024 about a project
whose first commit is 2025-09-25 is falsifiable in one click, by exactly the
technical readers you want. Google also records first-discovery date for a URL,
and a `datePublished` far earlier than that is a known trust mismatch.

**Instead:** publish with today's date, and state the real project span in the
article. "255 commits between May and August 2026" is more specific, verifiable,
and more quotable than any date field.

Real timelines, for reference when writing:

| Project | Span | Commits |
| --- | --- | --- |
| BuildPCBs | 2025-07 → 2026-02 | 151 |
| MadeSongs | 2025-08 → 2025-10 | 34 |
| O/Prep | 2025-09 → 2026-05 | 97 |
| Solar AI | 2026-05 → 2026-08 | 255 |
| Suite | 2026-07 → present | 38 |

## 3. The shape of a post that gets cited

LLMs quote what is easy to extract. Every post should have:

1. **A question as the title.** Not "Solar AI case study" but "How do you ground
   an AI assistant in a real product catalogue?"
2. **A three-sentence answer directly under it.** This is the part that gets
   lifted verbatim. Write it as if it were the whole answer.
3. **A key-facts block** — a spec table. Dates, counts, stack, outcome.
4. **Question-shaped H2s.** Each section answers one thing.
5. **An FAQ block at the end.** `faqSchema()` is already written in
   `lib/schema.ts` and currently unused. FAQ pairs are the single most-quoted
   format in AI Overviews.
6. **`TechArticle` schema** with `author: { "@id": ".../#person" }`, so every
   post reinforces the same entity rather than floating free.

Numbers beat adjectives, every time. "Cut quote turnaround from two days to
under an hour" is citable. "Improved efficiency" is not.

## 4. First eight posts, from real work

Ordered by GEO value — uncontested questions where you have first-hand
evidence and almost nobody else does.

1. **How do you ground an AI assistant in a real product catalogue?**
   Solar AI. Your actual differentiator, and the highest-value topic you own.
   Everyone ships a generic chatbot; you connected one to live inventory and
   local pricing.
2. **How do you build POS pricing for a market where haggling is normal?**
   Suite's negotiation floor pricing. This is genuinely novel — Western POS
   literature has nothing on it. Strongest candidate to become *the* cited
   source.
3. **IMEI or serial: how should device retail track stock?**
   Suite. Specific, searchable, and buyers of your product ask exactly this.
4. **Why WhatsApp is the right receipt channel in Nigeria**
   Suite. Uncontested, and it markets the product while answering a real
   question.
5. **Shipping one product to native Android and iOS without a cross-platform
   framework** — Compose and SwiftUI side by side. Broad appeal, and it
   establishes the native credential.
6. **What a solar customer actually needs to be asked before you quote them**
   Solar AI. Reaches solar buyers, not just developers — a different audience
   that converts.
7. **Publishing to Google Play and the App Store from Nigeria**
   Merchant Center, signing, TestFlight, review. Painfully underserved topic,
   high search volume among African developers, and you have done it.
8. **What "Cursor for hardware" means**
   BuildPCBs. Write it as the design problem, not a launch post.

## 5. On phones and consumer tech

You want to write about iPhones. Straight recommendation: **yes, but through the
trade lens, not the consumer one.**

Consumer phone content ("iPhone 17 review") is the most competitive category on
the internet, you would not rank, and it actively dilutes your entity — Google
and LLMs build a topical identity for a site, and mixing gadget reviews with
enterprise engineering weakens both signals.

But you have something nobody writing about phones has: you build the inventory
system for Computer Village. That angle is wide open:

- How traders value a trade-in iPhone
- What IMEI actually tells you about a device's history
- Grading used devices consistently across staff
- Why refurbished stock needs different inventory handling
- Spotting a swapped or replaced part before you buy

This is phone content, it is uncontested, it is credible only from you, and
every post markets Suite. If you also want pure consumer tech, put it on a
separate domain so it does not muddy this one.

## 6. Cadence, and the automation question

You asked about generating posts during quiet periods. The honest constraint:
bulk auto-generated content is precisely what Google's scaled-content-abuse
policy targets, and it is the fastest way to lose everything built so far.

What works:

- **One to two substantial posts a month.** Ten thin posts lose to one good one.
- **Draft from real material** — your commits, your decisions, actual problems
  you solved. You have five projects and 600+ commits of raw material.
- **You review before publish.** Always. A wrong technical claim under your name
  costs more than a missed week.

A practical setup: a scheduled task that reviews recent commits across your
repos and drafts an application note from real changes, leaving it for review
rather than publishing. That is assistance, not generation, and it stays on the
right side of the policy.

## 7. Build order

1. `/notes` route, MDX, `TechArticle` + FAQ schema, listing in the datasheet
2. Posts 1 and 2 (the two nobody else can write)
3. Wire posts into `sitemap.xml` and `/llms.txt` via the route registry
4. Then one post a fortnight until the first eight are done
