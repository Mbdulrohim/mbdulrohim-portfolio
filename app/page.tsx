import Link from "next/link";
import {
  siteConfig,
  products,
  engagements,
  ventures,
  company,
  isPlaceholder,
} from "@/lib/site-config";
import { notes } from "@/lib/notes";
import {
  Logo,
  Section,
  SpecTable,
  PinGrid,
  FunctionList,
  Field,
  Status,
} from "@/components/datasheet";

/**
 * Homepage, set as a component datasheet.
 *
 * Server component by design: zero client JS. Every fact is in the initial
 * HTML, which is what makes the page cheap on mobile data and fully legible
 * to crawlers that do not execute JavaScript.
 */

const REV = "2.1";
const DOC_NO = "MBD-001";

const sections = [
  { no: "1", id: "description", title: "Description" },
  { no: "2", id: "characteristics", title: "Operating Characteristics" },
  { no: "3", id: "pinout", title: "Pin Configuration" },
  { no: "4", id: "products", title: "Products" },
  { no: "5", id: "ventures", title: "Ventures" },
  { no: "6", id: "history", title: "Revision History" },
  { no: "7", id: "ordering", title: "Ordering Information" },
  { no: "8", id: "notes", title: "Application Notes" },
];

export default function Home() {
  const { location } = siteConfig;
  const buildpcbs = ventures.find((v) => v.name === "BuildPCBs");
  const place = isPlaceholder(location.city)
    ? location.country
    : location.display;

  return (
    <div className="min-h-screen text-ink">
      {/* ── Document header. The part number band on a real datasheet. ── */}
      <header className="sticky top-0 z-20 bg-paper border-b border-rule-strong">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="flex items-center justify-between h-11 gap-4">
            <span className="flex items-center gap-2.5 label text-ink truncate">
              <Logo className="w-4 h-4 shrink-0" />
              {siteConfig.handle}
              <span className="text-ink-faint truncate">
                · {siteConfig.jobTitle}
              </span>
            </span>
            <span className="label text-ink-faint shrink-0 tnum">
              REV {REV}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 md:px-8 pb-24">
        {/* ── Title block ── */}
        <div className="sheet-in py-12 md:py-16 border-b border-rule">
          <h1 className="font-sans text-[2.75rem] md:text-6xl font-bold tracking-[-0.04em] leading-[0.95]">
            {siteConfig.name}
          </h1>
          <p className="label mt-4 text-ink">{siteConfig.jobTitle}</p>

          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-snug tracking-tight text-pretty">
            I build AI-powered commerce and operations platforms for every
            business need, shipped across Android, iOS and web.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <Field label="Location">{place}</Field>
            <Field label="Discipline">Full-stack / Embedded</Field>
            <Field label="Engagement">Contract · Full-time</Field>
            <div className="flex flex-col gap-1">
              <span className="label">Status</span>
              <Status>Available</Status>
            </div>
          </div>
        </div>

        {/* ── Contents. Real anchors: useful to readers, and internal links
             are how crawlers understand a long page's structure. ── */}
        {/* No bottom rule here — §1 draws its own top rule, and two hairlines
            separated by whitespace reads as a mistake rather than structure. */}
        <nav aria-label="Contents" className="py-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8">
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  href={`#${s.id}`}
                  className="flex items-baseline gap-3 py-1 mono text-[0.8125rem] text-ink-muted hover:text-ink transition-colors"
                >
                  <span className="text-ink-faint tnum">{s.no}</span>
                  <span className="border-b border-transparent hover:border-ink">
                    {s.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14 pt-14">
          {/* ── 1. Description ── */}
          <Section no="1" id="description" title="Description">
            <div className="max-w-2xl space-y-4 leading-relaxed text-pretty">
              <p>
                {siteConfig.name} is a software engineer and founder. He builds
                commerce, education, and operations platforms end to end:
                product thinking, backend architecture, native Android and iOS
                apps, and production launch on Google Play and the App Store. He
                works with clients worldwide from {place}.
              </p>
              <p>
                Current work spans four products:{" "}
                <span className="mono text-[0.9em]">Solar AI</span>, a solar
                commerce and operations platform built for{" "}
                <Link
                  href="https://joshvilleglobal.com"
                  className="border-b border-rule-strong hover:text-copper hover:border-copper transition-colors"
                >
                  Joshville Global Auto &amp; Energy
                </Link>
                ; <span className="mono text-[0.9em]">O/Prep</span>, an exam
                preparation platform used by thousands of nursing, medical and
                legal candidates across Africa;{" "}
                <span className="mono text-[0.9em]">MadeSongs</span>, a
                cross-platform AI music gifting platform; and{" "}
                <span className="mono text-[0.9em]">Suite</span>, an inventory
                and point-of-sale system for high-turnover gadget retail, and the
                first product from{" "}
                <Link
                  href={company?.url ?? siteConfig.url}
                  className="border-b border-rule-strong hover:text-copper hover:border-copper transition-colors"
                >
                  {company?.name}
                </Link>
                , the company he co-founded. He is also a co-founder of{" "}
                <Link
                  href={buildpcbs?.url ?? siteConfig.url}
                  className="border-b border-rule-strong hover:text-copper hover:border-copper transition-colors"
                >
                  {buildpcbs?.name}
                </Link>
                .
              </p>
              <p>
                A recurring thread runs through the work: AI grounded in real
                data rather than generic chat. Solar AI&apos;s assistant
                recommends from the client&apos;s actual catalogue at local
                prices, so what it suggests is something the company can
                genuinely sell and install.
              </p>
              <p>
                He works remotely with clients worldwide and on-site in{" "}
                {location.country}. Based in {place} on WAT (UTC+1), his working
                day overlaps European hours in full and US mornings, and he is
                available for contract engagements and technical partnerships.
              </p>
            </div>
          </Section>

          {/* ── 2. Operating characteristics ── */}
          <Section
            no="2"
            id="characteristics"
            title="Operating Characteristics"
          >
            <SpecTable
              rows={[
                { parameter: "Primary stack", value: "TypeScript · React · Next.js" },
                { parameter: "Systems", value: "Rust · Solana · Embedded" },
                {
                  parameter: "Domain",
                  value: "Commerce · Education · Operations · Hardware",
                },
                { parameter: "Based in", value: place },
                {
                  parameter: "Works with",
                  value: "Clients worldwide, remote",
                },
                {
                  parameter: "Timezone",
                  value: "WAT",
                  unit: "UTC+1 · overlaps EU and US mornings",
                },
                { parameter: "On-site", value: `${location.country}` },
                { parameter: "Engagement", value: "Contract · Full-time · Advisory" },
                { parameter: "Availability", value: "Open" },
              ]}
            />
          </Section>

          {/* ── 3. Pin configuration ── */}
          <Section
            no="3"
            id="pinout"
            title="Pin Configuration"
            aside={`${siteConfig.skills.length} pins`}
          >
            <PinGrid
              pins={siteConfig.skills.map((skill, i) => ({
                label: skill,
                // Copper marks what is live in shipping work today.
                live: i < 3,
              }))}
            />
          </Section>

          {/* ── 4. Products — the commercial centre of the page ── */}
          <Section
            no="4"
            id="products"
            title="Products"
            aside={`${products.length} shipping`}
          >
            <div className="space-y-12">
              {products.map((product) => (
                <article
                  key={product.partNo}
                  className="border border-rule bg-paper-inset"
                >
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3 border-b border-rule">
                    <span className="label text-ink tnum">
                      {product.partNo}
                    </span>
                    <span className="label text-ink-faint">
                      {product.platforms.join(" · ")}
                    </span>
                    <Status>{product.status}</Status>
                  </div>

                  <div className="p-5 md:p-8 space-y-8">
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-tight">
                          {product.url ? (
                            <Link
                              href={product.url}
                              className="border-b-2 border-rule-strong hover:text-copper hover:border-copper transition-colors"
                            >
                              {product.name}
                            </Link>
                          ) : (
                            product.name
                          )}
                        </h3>
                        {product.client && (
                          <span className="label">
                            for {product.client}
                          </span>
                        )}
                      </div>
                      {product.formalName && (
                        <p className="label mt-2">{product.formalName}</p>
                      )}
                      <p className="mt-4 max-w-2xl leading-relaxed text-pretty">
                        {product.description}
                      </p>
                      {product.role && (
                        <p className="mono text-[0.8125rem] text-ink-muted mt-4 text-pretty">
                          Role: {product.role}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="label mb-3">Characteristics</p>
                        <SpecTable rows={product.specs} />
                      </div>
                      <div>
                        <p className="label mb-3">Market</p>
                        <p className="mono text-[0.8125rem] leading-relaxed text-ink text-pretty">
                          {product.market}
                        </p>
                        {product.stack.length > 0 && (
                          <>
                            <p className="label mt-6 mb-3">Built with</p>
                            <p className="mono text-[0.8125rem] text-ink-muted">
                              {product.stack.join(" · ")}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="label mb-3">Functions</p>
                      <FunctionList items={product.features} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          {/* ── 5. Ventures. One shape for both, so neither reads as an
               afterthought next to the other. ── */}
          <Section
            no="5"
            id="ventures"
            title="Ventures"
            aside={`${ventures.length} co-founded`}
          >
            <div className="space-y-6">
              {ventures.map((venture) => (
                <article
                  key={venture.name}
                  className="border-b border-rule/60 pb-6"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-sans text-xl font-bold tracking-tight">
                      <Link
                        href={venture.url}
                        className="border-b-2 border-rule-strong hover:text-copper hover:border-copper transition-colors"
                      >
                        {venture.name}
                      </Link>
                    </h3>
                    <span className="label">{venture.role}</span>
                    {venture.legalName && (
                      <span className="label text-ink-faint ml-auto">
                        {venture.legalName}
                      </span>
                    )}
                  </div>

                  <p className="label mt-2">{venture.description}</p>

                  {!isPlaceholder(venture.longDescription) && (
                    <p className="mt-4 max-w-2xl leading-relaxed text-pretty">
                      {venture.longDescription}
                    </p>
                  )}

                  {!isPlaceholder(venture.differentiator) && (
                    <p className="mono text-[0.8125rem] text-ink-muted mt-4 max-w-2xl text-pretty">
                      {venture.differentiator}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </Section>

          {/* ── 6. Revision history — work history, when supplied ── */}
          <Section
            no="6"
            id="history"
            title="Revision History"
            aside={engagements.length > 0 ? `${engagements.length} entries` : undefined}
          >
            {engagements.length === 0 ? (
              <p className="mono text-[0.8125rem] text-ink-faint">
                No entries recorded.
              </p>
            ) : (
              <div className="space-y-8">
                {engagements.map((e) => (
                  <article
                    key={`${e.company}-${e.start}`}
                    className="border-b border-rule/60 pb-6"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="mono text-[0.9375rem] text-ink">
                        {e.company}
                      </h3>
                      <span className="label">{e.role}</span>
                      <span className="label text-ink-faint tnum ml-auto">
                        {e.start} to {e.end ?? "Present"}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-1.5">
                      {e.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-3 text-[0.9375rem] text-pretty"
                        >
                          <span aria-hidden className="text-ink-faint">
                            —
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    {e.stack.length > 0 && (
                      <p className="mono text-xs text-ink-faint mt-3">
                        {e.stack.join(" · ")}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </Section>

          {/* ── 7. Ordering information ── */}
          <Section no="7" id="ordering" title="Ordering Information">
            <div className="border border-rule-strong p-5 md:p-8">
              <p className="max-w-xl text-lg leading-snug tracking-tight text-pretty">
                Available for contract work, product builds, and technical
                partnerships.
              </p>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                {!isPlaceholder(siteConfig.email) && (
                  <Field label="Email">
                    <Link
                      href={`mailto:${siteConfig.email}`}
                      className="border-b border-rule-strong hover:text-copper hover:border-copper transition-colors"
                    >
                      {siteConfig.email}
                    </Link>
                  </Field>
                )}
                <Field label="Phone">
                  <Link
                    href={`tel:${siteConfig.phone}`}
                    className="border-b border-rule-strong hover:text-copper hover:border-copper transition-colors whitespace-nowrap"
                  >
                    {siteConfig.phoneDisplay}
                  </Link>
                </Field>
                <Field label="GitHub">
                  <Link
                    href={siteConfig.profiles.github}
                    className="border-b border-rule-strong hover:text-copper hover:border-copper transition-colors"
                  >
                    {siteConfig.handle}
                  </Link>
                </Field>
                <Field label="X">
                  <Link
                    href={siteConfig.profiles.x}
                    className="border-b border-rule-strong hover:text-copper hover:border-copper transition-colors"
                  >
                    {siteConfig.profiles.twitterHandle}
                  </Link>
                </Field>
                <Field label="Region">{location.country}</Field>
              </div>
            </div>
          </Section>

          {/* ── 8. Application notes ── */}
          <Section
            no="8"
            id="notes"
            title="Application Notes"
            aside={`${notes.length} published`}
          >
            <ul className="divide-y divide-rule/60 border-t border-rule/60">
              {notes.map((note) => (
                <li key={note.slug}>
                  <Link
                    href={`/notes/${note.slug}`}
                    className="block group py-4"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="label text-ink-faint tnum shrink-0">
                        {note.no}
                      </span>
                      <span className="font-sans font-semibold tracking-tight text-balance group-hover:text-copper transition-colors">
                        {note.title}
                      </span>
                    </div>
                    <p className="mt-1.5 ml-[3.75rem] text-[0.9375rem] text-ink-muted text-pretty">
                      {note.summary}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </main>

      {/* ── Document footer ── */}
      <footer className="border-t border-rule-strong">
        <div className="mx-auto max-w-4xl px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <span className="label text-ink-faint tnum">DOC. {DOC_NO}</span>
          <span className="label text-ink-faint">
            {siteConfig.url.replace("https://", "")}
          </span>
          <span className="label text-ink-faint tnum">REV {REV}</span>
        </div>
      </footer>
    </div>
  );
}
