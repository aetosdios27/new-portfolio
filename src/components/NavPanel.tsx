"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "~" },
  { href: "/projects", label: "work" },
  { href: "/blog", label: "blogs" },
];

export function NavPanel() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary Navigation"
      className="flex items-center gap-6 sm:gap-12"
      style={{
        fontFamily: "var(--font-geist-mono)",
        letterSpacing: "0.04em",
      }}
    >
      {links.map((link) => {
        const external = link.href.startsWith("mailto");
        const active = pathname === link.href;

        const className = `
          relative
          transition-all
          duration-200
          no-underline
          text-[15px]
          ${active ? "opacity-100" : "opacity-45 hover:opacity-80"}
        `;

        const content = (
          <>
            {active && (
              <span
                className="absolute -left-[14px]"
                aria-hidden="true"
                style={{
                  color: "var(--text)",
                }}
              >
                [
              </span>
            )}

            <span
              style={{
                color: "var(--text)",
              }}
            >
              {link.label}
            </span>

            {active && (
              <span
                className="absolute -right-[14px]"
                aria-hidden="true"
                style={{
                  color: "var(--text)",
                }}
              >
                ]
              </span>
            )}
          </>
        );

        if (external) {
          return (
            <a key={link.label} href={link.href} className={className}>
              {content}
            </a>
          );
        }

        return (
          <Link key={link.label} href={link.href} className={className}>
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
