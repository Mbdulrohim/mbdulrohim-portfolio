# Cross-site attribution

Goal: every site you built states, in machine-readable form, that **you** built it,
and points back at one single identity — `https://mbdulrohim.dev/#person`.

## Why the `@id` matters more than the link

A footer link tells Google "these two pages are related". Reusing the **same
`@id`** across every site tells Google and every LLM crawler "this is the *same
entity*". That is what merges four scattered projects into one person with a
track record, which is the thing that gets cited when someone asks an AI
"who builds solar commerce platforms in Africa".

Use this exact string everywhere. Never vary it:

```
https://mbdulrohim.dev/#person
```

## Sites to apply this to

| Site | Repo | Framework | Status |
| --- | --- | --- | --- |
| prepnmcn.com (O/Prep) | `~/Projects/prepp` (`Mbdulrohim/prepnmcn`) | Next.js | Yours — safe to apply |
| buildpcbs.com | `~/Projects/buildpcbs-1` (`BuildPCBs/buildpcbs`) | Next.js | Yours — safe to apply |
| madesongs.com | `~/Projects/MadeSongs` | native (no web repo found) | Find the web repo first |
| joshvilleglobal.com | `~/Projects/solar-website` (`Joshville-Global/…`) | Vite + React | **Client-owned. Get written sign-off first.** |

---

## 1. Next.js (App Router) — O/Prep, BuildPCBs

In `app/layout.tsx`, add to the exported `metadata`:

```ts
export const metadata: Metadata = {
  // ...whatever is already there
  authors: [
    { name: "Abdulrohim Mustapha", url: "https://mbdulrohim.dev" },
  ],
  creator: "Abdulrohim Mustapha",
};
```

Then add this component and render it inside `<head>` (or anywhere in the
layout — JSON-LD is valid in body too):

```tsx
function BuilderCredit() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    // Change these two per site:
    url: "https://www.prepnmcn.com",
    name: "O/Prep",
    creator: {
      "@type": "Person",
      "@id": "https://mbdulrohim.dev/#person",
      name: "Abdulrohim Mustapha",
      url: "https://mbdulrohim.dev",
      jobTitle: "Software Engineer & Founder",
      sameAs: [
        "https://github.com/mbdulrohim",
        "https://www.linkedin.com/in/mbdulrohim/",
        "https://x.com/mbdulrohim",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

## 2. Plain HTML / Vite — joshvilleglobal.com

Paste into `index.html` inside `<head>`:

```html
<meta name="author" content="Abdulrohim Mustapha" />
<link rel="author" href="https://mbdulrohim.dev" />

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://joshvilleglobal.com",
  "name": "Joshville Global Auto & Energy",
  "creator": {
    "@type": "Person",
    "@id": "https://mbdulrohim.dev/#person",
    "name": "Abdulrohim Mustapha",
    "url": "https://mbdulrohim.dev",
    "sameAs": [
      "https://github.com/mbdulrohim",
      "https://www.linkedin.com/in/mbdulrohim/",
      "https://x.com/mbdulrohim"
    ]
  }
}
</script>
```

## 3. The visible credit (do this too)

Schema is for machines; a real link is what carries authority and what a human
client actually clicks. One line in the footer, once per site:

```html
Built by <a href="https://mbdulrohim.dev" rel="author">Abdulrohim Mustapha</a>
```

**Keep it to one contextual footer link per site.** Sitewide link blocks across
domains you control get discounted as self-referential, and a large number of
identical links appearing at once looks engineered. One honest credit per site
is normal practice and carries real weight.

## 4. Add yourself to their `/llms.txt`

If a site has (or gets) an `llms.txt`, one line does a lot of work, because this
is the file LLM retrieval crawlers read first:

```
## Built by
Abdulrohim Mustapha — https://mbdulrohim.dev — software engineer and founder.
```

---

## Verifying it worked

After deploying each site:

1. Paste the URL into <https://search.google.com/test/rich-results> and confirm
   the `Person` with your `@id` is detected.
2. `curl -s <url> | grep -A5 'ld+json'` to confirm the schema is in the served
   HTML, not injected later by JavaScript.
3. In Search Console for each property, request indexing of the homepage so the
   new attribution is picked up in days rather than weeks.
