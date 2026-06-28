"use client";

import { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";

type CodeBlockProps = React.ComponentPropsWithoutRef<"pre">;

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    if (!preRef.current) return;
    // Get text content and trim trailing newlines
    const text = preRef.current.textContent?.replace(/\n$/, "") || "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-8 font-mono text-[13px]">
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[var(--bg)] border border-[var(--text)]/20 text-[var(--text)] opacity-100 transition-all duration-200 z-10 hover:bg-[var(--text)] hover:text-[var(--bg)] active:scale-90 cursor-pointer"
        aria-label="Copy code"
      >
        <div className={`absolute transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${copied ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 -rotate-45'}`}>
          <Check size={14} />
        </div>
        <div className={`absolute transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${copied ? 'scale-50 opacity-0 rotate-45' : 'scale-100 opacity-100 rotate-0'}`}>
          <Copy size={14} />
        </div>
      </button>
      <pre ref={preRef} {...props} className="p-5 pr-14 whitespace-pre-wrap break-words border border-[var(--text)]/20 bg-[var(--bg)] text-[var(--text)]">
        {children}
      </pre>
    </div>
  );
}
