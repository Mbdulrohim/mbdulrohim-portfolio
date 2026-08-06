import type { ReactNode } from "react";

/**
 * Datasheet primitives.
 *
 * All server components — the homepage ships zero client JS, which is both the
 * fastest possible render for Nigerian mobile connections and the safest thing
 * for crawlers, since every fact exists in the initial HTML.
 */

/** Numbered section heading with the rule that runs to the page edge. */
export function Section({
  no,
  title,
  aside,
  children,
  id,
}: {
  no: string;
  title: string;
  /** Right-aligned annotation — page ref, status, count. */
  aside?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="border-t border-rule pt-3">
      <header className="flex items-baseline gap-4 mb-5">
        <span className="label tabular-nums text-ink">{no}</span>
        <h2 className="label text-ink flex-1">{title}</h2>
        {aside && <span className="label text-ink-faint">{aside}</span>}
      </header>
      {children}
    </section>
  );
}

/**
 * Parameter table — the core datasheet device.
 * Doubles as high-value SEO content: tables are the format LLMs extract from
 * most reliably, so facts stated here are the ones most likely to be quoted.
 */
export function SpecTable({
  rows,
  columns = ["PARAMETER", "VALUE"],
}: {
  rows: { parameter: string; value: string; unit?: string; note?: string }[];
  columns?: [string, string];
}) {
  return (
    <table className="w-full border-collapse mono text-[0.8125rem]">
      <thead>
        <tr>
          <th className="label text-left font-normal border-b border-rule pb-1.5 w-[45%]">
            {columns[0]}
          </th>
          <th className="label text-left font-normal border-b border-rule pb-1.5">
            {columns[1]}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.parameter} className="border-b border-rule/60">
            <td className="py-2 pr-4 text-ink-muted align-top">
              {row.parameter}
            </td>
            <td className="py-2 text-ink align-top tnum">
              {row.value}
              {row.unit && (
                <span className="text-ink-faint ml-1.5">{row.unit}</span>
              )}
              {row.note && (
                <span className="block text-ink-faint text-xs mt-0.5">
                  {row.note}
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Pin configuration grid. Numbered pads, like the pinout on a real package.
 * `live` marks the copper pad — reserved for what is currently in use.
 */
export function PinGrid({
  pins,
}: {
  pins: { label: string; live?: boolean }[];
}) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-rule/60">
      {pins.map((pin, i) => (
        <li
          key={pin.label}
          className="flex items-center gap-3 py-2 border-b border-rule/60 mono text-[0.8125rem]"
        >
          <span
            aria-hidden
            className={`w-2 h-2 shrink-0 ${
              pin.live ? "bg-copper" : "bg-ink-faint"
            }`}
          />
          <span className="text-ink-faint tnum w-6 shrink-0">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-ink">{pin.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Bulleted feature list set as a numbered function list. */
export function FunctionList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex gap-3 py-1.5 mono text-[0.8125rem] text-ink"
        >
          <span className="text-ink-faint tnum shrink-0">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Small key/value pair used in the title block and ordering info. */
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="label">{label}</span>
      <span className="mono text-[0.8125rem] text-ink">{children}</span>
    </div>
  );
}

/**
 * Status lamp. The one place copper is allowed to signal rather than label —
 * it marks a live, shipping thing.
 */
export function Status({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 label text-copper">
      <span aria-hidden className="w-1.5 h-1.5 bg-copper" />
      {children}
    </span>
  );
}
