"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PatternField } from "@/components/pattern-field";
import { TwoPanelShell } from "@/components/two-panel-shell";
import type { Entry } from "@/lib/content";

type ListingViewProps = {
  kind: "projects" | "blog";
  entries: Entry[];
  initialSlug?: string;
};

export function ListingView({ kind, entries, initialSlug }: ListingViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSlug, setActiveSlug] = useState(initialSlug);
  const active = entries.find((entry) => entry.slug === activeSlug);

  useEffect(() => {
    setActiveSlug(initialSlug);
  }, [initialSlug]);

  const open = (slug: string) => {
    setActiveSlug(slug);
    window.history.pushState(null, "", `/${kind}/${slug}`);
  };

  const close = () => {
    setActiveSlug(undefined);
    router.push(`/${kind}`);
  };

  useEffect(() => {
    const onPop = () => {
      const slug = window.location.pathname.split("/").filter(Boolean)[1];
      setActiveSlug(slug);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <TwoPanelShell
      expanded={Boolean(active)}
      left={
        <section className="listing-panel">
          <Link className="breadcrumb" href="/">
            <ArrowLeft size={14} /> home / {kind} /
          </Link>
          <div className="rows">
            {entries.map((entry) => (
              <button
                key={entry.slug}
                type="button"
                className="row-button"
                data-active={entry.slug === activeSlug}
                data-muted={Boolean(activeSlug && entry.slug !== activeSlug)}
                onClick={() => open(entry.slug)}
              >
                <span>{entry.title}</span>
                <span className="row-meta">{entry.tags.slice(0, 2).join(" · ")}</span>
                <span className="row-meta">{entry.year ?? entry.date?.slice(0, 4)}</span>
              </button>
            ))}
          </div>
        </section>
      }
      right={
        <>
          <PatternField mode={kind === "projects" ? "projects" : "blog"} agitated={Boolean(active)} />
          <AnimatePresence>
            {active && (
              <motion.article
                className="epv"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.28 }}
              >
                <div className="epv-head">
                  <span className="epv-kicker">{pathname}</span>
                  <button className="close-button" type="button" onClick={close}>
                    close
                  </button>
                </div>
                <h2>{active.title}</h2>
                <RenderBody body={active.body} />
                <div className="epv-section">
                  <h3>[ STACK ]</h3>
                  <div className="epv-stack">
                    {active.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                {active.links && (
                  <div className="epv-section">
                    <h3>[ LINKS ]</h3>
                    <div className="epv-links">
                      {Object.entries(active.links).map(([label, href]) => (
                        <a key={label} href={href}>
                          -&gt; {label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.article>
            )}
          </AnimatePresence>
        </>
      }
    />
  );
}

function RenderBody({ body }: { body: string }) {
  const sections = body
    .split(/\n(?=\/\/|\[)/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  return (
    <>
      {sections.map((section) => {
        const [first, ...rest] = section.split("\n");
        return (
          <section className="epv-section" key={first}>
            <h3>{first}</h3>
            {rest
              .join("\n")
              .split(/\n\n+/)
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </section>
        );
      })}
    </>
  );
}
