import type { ReactNode } from "react";
import Link from "next/link";
import { noteBySlug } from "@/lib/notes";
import { siteConfig } from "@/lib/site-config";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { Logo, Section, SpecTable } from "@/components/datasheet";

/**
 * Chrome for a single application note.
 *
 * The MDX file supplies prose only; everything structural is read from the
 * registry by slug, so metadata, schema, sitemap and llms.txt can never
 * disagree with what is on the page.
 *
 * Order on the page is deliberate: title, then the standalone answer, then the
 * facts table, then the argument. An extraction pass that reads only the first
 * screen should still come away with something correct and quotable.
 */
export function NoteLayout({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const note = noteBySlug(slug);
  if (!note) throw new Error(`No registry entry for note "${slug}"`);

  const date = new Date(note.published).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen text-ink">
      <JsonLd
        schema={[
          articleSchema(note),
          faqSchema(note.faq),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Application Notes", path: "/notes" },
            { name: note.no, path: `/notes/${note.slug}` },
          ]),
        ]}
      />

      <header className="sticky top-0 z-20 bg-paper border-b border-rule-strong">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="flex items-center justify-between h-11 gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 label text-ink hover:text-copper transition-colors"
            >
              <Logo className="w-4 h-4 shrink-0" />
              {siteConfig.handle}
            </Link>
            <span className="label text-ink-faint shrink-0 tnum">{note.no}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 md:px-8 pb-24">
        <article>
          <div className="py-12 md:py-16 border-b border-rule">
            <div className="flex items-center gap-4 mb-6">
              <span className="label text-ink tnum">{note.no}</span>
              <span className="label text-ink-faint">{note.subject}</span>
              <span className="label text-ink-faint ml-auto tnum">{date}</span>
            </div>

            <h1 className="font-sans text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.02] text-balance">
              {note.title}
            </h1>

            {/* The standalone answer. Written to survive being quoted alone. */}
            <p className="mt-8 text-lg md:text-xl leading-snug tracking-tight text-pretty">
              {note.summary}
            </p>
          </div>

          <div className="py-10 border-b border-rule">
            <p className="label mb-4">Key facts</p>
            <SpecTable rows={note.facts} />
          </div>

          {/* Prose. Styling lives here rather than in globals so the datasheet
              rules (no radius, hairline rules, mono for data) hold. */}
          <div
            className="py-12 space-y-5 leading-relaxed text-pretty
              [&_h2]:font-sans [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight
              [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:text-balance
              [&_h3]:label [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-ink
              [&_p]:max-w-none
              [&_ul]:space-y-2 [&_ul]:my-5 [&_li]:flex [&_li]:gap-3
              [&_li]:before:content-['—'] [&_li]:before:text-ink-faint
              [&_code]:font-mono [&_code]:text-[0.875em] [&_code]:text-copper
              [&_pre]:border [&_pre]:border-rule [&_pre]:bg-paper-inset
              [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-6
              [&_pre_code]:text-ink [&_pre_code]:text-[0.8125rem]
              [&_strong]:font-semibold
              [&_a]:border-b [&_a]:border-rule-strong hover:[&_a]:text-copper
              [&_blockquote]:border-l-2 [&_blockquote]:border-copper
              [&_blockquote]:pl-5 [&_blockquote]:text-ink-muted"
          >
            {children}
          </div>

          {/* FAQ. Question/answer pairs are the most reliably extracted format
              in AI answers, so they are rendered as text, not just as schema. */}
          <Section no="F" title="Frequently asked">
            <dl className="space-y-6">
              {note.faq.map((item) => (
                <div key={item.question} className="border-b border-rule/60 pb-5">
                  <dt className="font-sans font-semibold tracking-tight text-balance">
                    {item.question}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-ink-muted text-pretty">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <div className="mt-14 pt-8 border-t border-rule-strong flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="label">
              {siteConfig.name} · {siteConfig.jobTitle}
            </span>
            <Link
              href="/notes"
              className="label text-ink-faint hover:text-copper transition-colors ml-auto"
            >
              All notes →
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
