"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Entry } from "@/lib/content";

export function CopyForLLM({ post }: { post: Entry }) {
  const [copied, setCopied] = useState(false);

  // Calculate reading time
  const wordCount = post.body.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const handleCopy = async () => {
    // Reconstruct raw markdown for LLM ingestion
    let raw = `---\n`;
    raw += `title: "${post.title}"\n`;
    if (post.date) raw += `date: "${post.date}"\n`;
    if (post.year) raw += `year: ${post.year}\n`;
    raw += `tags: ${JSON.stringify(post.tags)}\n`;
    if (post.links) raw += `links: ${JSON.stringify(post.links)}\n`;
    raw += `---\n\n`;
    raw += post.body;

    await navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 text-[12px] opacity-60 tracking-widest" style={{ fontFamily: "var(--font-geist-mono)" }}>
      <span>{(post.date ?? post.year)}</span>
      <span className="opacity-30">|</span>
      <span>{readingTime} MIN READ</span>
      <span className="opacity-30">|</span>
      <button 
        onClick={handleCopy}
        className="flex items-center gap-2 hover:opacity-100 hover:text-[var(--text)] transition-all uppercase cursor-pointer"
        aria-label="Copy for LLM"
      >
        <div className="relative w-3 h-3 flex items-center justify-center">
          <div className={`absolute transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${copied ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 -rotate-45'}`}>
            <Check size={12} />
          </div>
          <div className={`absolute transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${copied ? 'scale-50 opacity-0 rotate-45' : 'scale-100 opacity-100 rotate-0'}`}>
            <Copy size={12} />
          </div>
        </div>
        <span>COPY FOR LLM</span>
      </button>
    </div>
  );
}
