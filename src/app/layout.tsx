import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavPanel } from "@/components/NavPanel";
import { Ticker } from "@/components/Ticker";
import { LenisProvider } from "@/components/LenisProvider";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "aetos",
  description: "I build small, sharp systems that make hidden complexity operable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else if (!theme && window.matchMedia('(prefers-color-scheme: light)').matches) {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${GeistMono.variable} pb-10`}>
        <LenisProvider>
          <ThemeToggle />
          <div className="fixed top-0 left-0 w-full flex justify-center z-40 bg-[var(--bg)] py-8 border-b border-[var(--text)]/10">
            <NavPanel />
          </div>
          {children}
          <Ticker />
        </LenisProvider>
      </body>
    </html>
  );
}
