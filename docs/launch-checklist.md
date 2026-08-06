# Launch checklist

Everything needed to turn the site into inbound work, in the order it should
happen. Items are marked **[you]** or **[code]**.

---

## Google Business Profile

### Read this before you create it

The profile name should be the **registered business name**, and changing it
later triggers re-verification and can cost you accumulated reviews. Your
company name is not decided yet.

**Recommendation: decide the name and file with CAC first, then create the
profile once.** If you would rather not wait, create it under `Abdulrohim
Mustapha` and accept a re-verification later.

The other constraint: you have no storefront yet (the Computer Village office is
later), so register as a **service-area business** and hide the street address.
Google allows this; a fake storefront address is the fastest way to get
suspended.

### Exact details to enter

Copy these character for character. Every one of them already matches what the
site publishes, and mismatched name/address/phone is the most common reason
local rankings stall.

| Field | Value |
| --- | --- |
| Business name | *pending CAC registration* |
| Primary category | Software company |
| Secondary categories | Website designer · Mobile app developer · Computer consultant |
| Address | Do not display — service-area business |
| Service areas | Ikeja · Lagos · Lagos State · Nigeria |
| Phone | `+234 704 046 8798` |
| Website | `https://mbdulrohim.dev` |
| Opening date | Date of CAC registration |

Pick the secondary categories from Google's own list — the exact wording varies
by country, so match whatever Google offers rather than typing these verbatim.

### Business description (750 char limit)

```
We build AI-powered commerce, education and operations platforms for businesses
that need more than a website. Our work covers the full product lifecycle:
product strategy, backend architecture, native Android and iOS apps, web
storefronts, and launch on Google Play and the App Store.

Recent work includes a complete solar commerce and operations platform for a
renewable energy company, an exam preparation platform used by thousands of
nursing, medical and legal candidates, and an inventory and point-of-sale system
built for high-turnover gadget retail.

Based in Ikeja, Lagos. We work on-site across Lagos and remotely with clients
worldwide.
```

### Services to list

Add each as a separate service item — they are individually searchable:

- Mobile app development (Android & iOS)
- Web application development
- E-commerce platform development
- AI integration and AI assistants
- Point of sale (POS) systems
- Inventory management systems
- Backend and API development
- Technical consulting

### Photos

Google weights profiles with real photos far more heavily. Upload at minimum:
logo, the site's OG card, and three or four product screenshots (Solar AI,
O/Prep, Suite). Screenshots of real software beat stock imagery.

### Reviews

The single biggest local ranking factor you control. Ask, in this order:

1. Joshville Global — your strongest reference, a completed platform.
2. The paying Suite merchant.
3. Any O/Prep partner university contact.

Send them the direct review link from your profile dashboard. Do not offer
anything in exchange for a review; Google removes incentivised reviews and can
penalise the profile.

---

## Immediate next steps

### 1. Decisions only you can make **[you]**

- [ ] **Pick the company name.** This blocks CAC, the Business Profile, the
      domain, and the social handles. It is the critical path.
- [ ] Check both name options in the CAC public name search.
- [ ] Buy the domain and claim social handles *before* filing.
- [ ] Send me the two contract roles — §6 Revision History is still empty, and
      it is the section recruiters look for.
- [ ] Confirm the O/Prep learner count (your site says 12k+, you said 5,000+).
- [ ] Get Joshville's written sign-off for a credit link.

### 2. Ship the site **[code + you]**

- [ ] Point `mbdulrohim.dev` at the deployment (Vercel is the least friction for
      Next.js).
- [ ] Confirm `https://` and pick one canonical host — `www` or bare, not both.
      The site already emits canonical tags; they must match reality.
- [ ] After deploy, confirm these all resolve:
      `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/opengraph-image`

### 3. Register with search engines **[you]**

- [ ] Google Search Console → add property → verify → submit `sitemap.xml`.
- [ ] Bing Webmaster Tools → same. Bing feeds Copilot, and it is far less
      contested than Google.
- [ ] Request indexing on the homepage manually to skip the initial wait.

### 4. Cross-site attribution **[code]**

See `cross-site-attribution.md`. Apply to O/Prep and BuildPCBs now; Joshville
only after sign-off.

### 5. Content that compounds **[you + code]**

- [ ] Fill §6 with the two contract roles.
- [ ] Add an FAQ section — question/answer pairs are the single most-quoted
      format in AI Overviews and LLM answers. The schema builder is already
      written and unused (`faqSchema` in `lib/schema.ts`).
- [ ] Start writing. Technical authority terms were one of your four targets and
      they are the only one with no engine behind it yet. One substantial post a
      month beats ten thin ones.

---

## What to expect, honestly

- **Branded terms** (`mbdulrohim`, `Abdulrohim Mustapha`, `O/Prep`) — you should
  rank first within days to weeks of indexing. Low competition, strong schema.
- **AI citation** — weeks. `llms.txt` plus product schema plus explicit crawler
  permissions puts you ahead of nearly every Nigerian dev portfolio, because
  almost none of them do any of it.
- **Competitive local terms** (`software company Lagos`) — months, and it
  depends mostly on the Business Profile and reviews, which is your effort, not
  the code's.
- **International contract work** — driven by the products and the named client,
  not by keywords. The Joshville case study is your best asset; a dedicated page
  on it would be the highest-value thing to build next.
