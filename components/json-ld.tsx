type Json = Record<string, unknown>;

/**
 * Renders one or more JSON-LD schema objects into a script tag.
 * Nulls are skipped so pages can pass conditional schema without branching.
 *
 * Server component by design — the markup must exist in the initial HTML or
 * crawlers that do not execute JS will never see it.
 */
export function JsonLd({ schema }: { schema: (Json | null)[] | Json | null }) {
  const list = (Array.isArray(schema) ? schema : [schema]).filter(
    (s): s is Json => s !== null,
  );
  if (list.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      // Content is built from local config, never from user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(list.length === 1 ? list[0] : list),
      }}
    />
  );
}
