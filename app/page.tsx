"use client";

import { Github, Twitter, Newspaper } from "lucide-react";
import Link from "next/link";
import { Terminal } from "@/components/terminal";
import { TypingHeader } from "@/components/typing-header";
import { FloatingSnippets } from "@/components/floating-snippets";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden flex flex-col items-center justify-center gap-8 relative">
      {/* Floating code snippets in background */}
      <FloatingSnippets />

      {/* 1. Header */}
      <header className="text-center z-10">
        <TypingHeader />
      </header>

      {/* 2. Middle: Terminal */}
      <section className="w-full max-w-2xl px-6 z-10">
        <Terminal />
      </section>

      {/* 3. Footer: Socials + Blog */}
      <footer className="flex items-center gap-6 md:gap-8 z-10">
        <Link
          href="https://twitter.com/mbdulrohim"
          target="_blank"
          className="text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
          aria-label="Twitter"
        >
          <Twitter className="w-5 h-5" />
        </Link>

        <Link
          href="https://github.com/mbdulrohim"
          target="_blank"
          className="text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </Link>

        <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-800"></div>

        <Link
          href="#"
          className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
          aria-label="Blog"
        >
          <Newspaper className="w-4 h-4" />
          Blog
        </Link>
      </footer>
    </main>
  );
}
