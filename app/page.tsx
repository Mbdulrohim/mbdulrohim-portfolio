"use client";

import { Github, Twitter, Newspaper } from "lucide-react";
import Link from "next/link";
import { Terminal } from "@/components/terminal";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center gap-8 relative">
      {/* 1. Header */}
      <header className="text-center">
        <h1 className="font-sans text-4xl md:text-6xl font-bold tracking-tighter">
          mbdulrohim<span className="text-zinc-600">.dev</span>
        </h1>
      </header>

      {/* 2. Middle: Terminal */}
      <section className="w-full max-w-2xl px-6">
        <Terminal />
      </section>

      {/* 3. Footer: Socials + Blog */}
      <footer className="flex items-center gap-6 md:gap-8">
        <Link
          href="https://twitter.com/mbdulrohim"
          target="_blank"
          className="text-zinc-500 hover:text-white transition-colors"
          aria-label="Twitter"
        >
          <Twitter className="w-5 h-5" />
        </Link>

        <Link
          href="https://github.com/mbdulrohim"
          target="_blank"
          className="text-zinc-500 hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </Link>

        <div className="h-4 w-px bg-zinc-800"></div>

        <Link
          href="#"
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
          aria-label="Blog"
        >
          <Newspaper className="w-4 h-4" />
          Blog
        </Link>
      </footer>

      {/* Background Grid Pattern (Optional subtle texture) */}
      <div
        className="absolute inset-0 z-[-1] opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>
    </main>
  );
}
