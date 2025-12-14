"use client";

import { motion } from "framer-motion";

// Array of code snippets to float in the background
const snippets = [
  "const",
  "let",
  "{ }",
  "( )",
  "[ ]",
  "=>",
  "async",
  "await",
  "function",
  "return",
  "import",
  "export",
  "//",
  "/* */",
  "</>",
  "::after",
  "0x",
  "null",
  "true",
];

export function FloatingSnippets() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {snippets.map((snippet, idx) => {
        // Generate pseudo-random positions based on index
        const top = `${(idx * 17) % 100}%`;
        const left = `${(idx * 23) % 100}%`;
        const delay = idx * 0.3;
        const duration = 15 + (idx % 10);

        return (
          <motion.span
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.03, 0.08, 0.03] }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
            style={{ top, left }}
            className="absolute font-mono-technical text-xs md:text-sm text-black/5 dark:text-white/5 hover:text-black/80 dark:hover:text-white/80 transition-colors duration-300 pointer-events-auto cursor-default select-none"
          >
            {snippet}
          </motion.span>
        );
      })}
    </div>
  );
}
