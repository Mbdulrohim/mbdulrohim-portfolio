import type { MDXComponents } from "mdx/types";

/**
 * Required by @next/mdx in the App Router.
 *
 * Element styling is handled by the prose block in NoteLayout rather than here,
 * so MDX files stay pure prose and the datasheet rules live in one place.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
