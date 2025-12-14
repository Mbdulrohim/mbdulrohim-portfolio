"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Link from "next/link";

const command = "whoami";
const outputLines = [
  { label: "Name", value: "Abdulrohim M." },
  {
    label: "Role",
    value: (
      <span>
        Co-Founder @{" "}
        <Link
          href="https://buildpcbs.com"
          target="_blank"
          className="text-black dark:text-white hover:text-green-600 dark:hover:text-green-400 underline decoration-gray-400 dark:decoration-gray-600 underline-offset-4 transition-colors"
        >
          BuildPCBs
        </Link>
      </span>
    ),
  },
  { label: "Mission", value: "Building the interface between AI & Hardware" },
  { label: "Stack", value: "Next.js, Solana, Rust" },
];

export function Terminal() {
  const [text, setText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < command.length) {
        setText((prev) => prev + command.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowOutput(true), 500); // Delay before showing output
      }
    }, 150); // Typing speed

    return () => clearInterval(interval);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-0">
      <div className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/20 rounded-md font-mono-technical text-sm shadow-2xl shadow-black/5 dark:shadow-blue-900/5">
        {/* Terminal Header */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          <div className="ml-4 text-xs text-gray-500">user@mbdulrohim:~</div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 min-h-[300px] text-gray-700 dark:text-gray-300 space-y-4">
          {/* Command Line */}
          <div className="flex items-center">
            <span className="text-green-500 mr-2">➜</span>
            <span className="text-blue-400 mr-2">~</span>
            <span className="text-black dark:text-white">{text}</span>
            <span
              className={`ml-1 w-2 h-4 bg-gray-400 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            ></span>
          </div>

          {/* Output block */}
          {showOutput && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 mt-4"
            >
              {outputLines.map((line, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:gap-4">
                  <span className="text-gray-500 w-20 shrink-0">
                    {line.label}:
                  </span>
                  <span className="text-black dark:text-white">
                    {line.value}
                  </span>
                </div>
              ))}

              <div className="pt-4 text-green-500">
                <span className="mr-2">➜</span>
                <span className="text-blue-400 mr-2">~</span>
                <span className="animate-pulse">_</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
