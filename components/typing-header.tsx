"use client";

import { useEffect, useState } from "react";

const fullText = "mbdulrohim.dev";

export function TypingHeader() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Split text to color ".dev" differently
  const mainPart = text.includes(".") ? text.split(".")[0] : text;
  const devPart = text.includes(".") ? "." + text.split(".")[1] : "";

  return (
    <h1 className="font-sans text-4xl md:text-6xl font-bold tracking-tighter">
      {mainPart}
      <span className="text-zinc-600">{devPart}</span>
      <span
        className={`ml-1 inline-block w-[3px] h-[1em] bg-black dark:bg-white align-middle ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
      ></span>
    </h1>
  );
}
