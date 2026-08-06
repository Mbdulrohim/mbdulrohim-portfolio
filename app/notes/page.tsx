import type { Metadata } from "next";
import Link from "next/link";
import { notes } from "@/lib/notes";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { Logo } from "@/components/datasheet";

export const metadata: Metadata = {
  title: "Application Notes",
  description:
    "Notes on building commerce, retail and AI systems for real markets: negotiated pricing, grounded AI assistants, and device inventory.",
  alternates: { canonical: "/notes" },
};

export default function NotesIndex() {
  return (
    <div className="min-h-screen text-ink">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Application Notes", path: "/notes" },
        ])}
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
            <span className="label text-ink-faint shrink-0">Notes</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 md:px-8 pb-24">
        <div className="py-12 md:py-16 border-b border-rule">
          <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-[-0.03em]">
            Application Notes
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-snug tracking-tight text-pretty">
            Datasheets ship application notes alongside the part: short documents
            on how the thing is actually used. These are mine, written from
            shipped work.
          </p>
        </div>

        <ul className="divide-y divide-rule">
          {notes.map((note) => (
            <li key={note.slug}>
              <Link href={`/notes/${note.slug}`} className="block group py-8">
                <div className="flex items-center gap-4 mb-3">
                  <span className="label text-ink tnum">{note.no}</span>
                  <span className="label text-ink-faint">{note.subject}</span>
                  <span className="label text-ink-faint ml-auto tnum">
                    {new Date(note.published).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-balance group-hover:text-copper transition-colors">
                  {note.title}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-muted text-pretty">
                  {note.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
