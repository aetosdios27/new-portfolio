import { Mail } from "lucide-react";
import Link from "next/link";
import { AsciiHologram } from "@/components/ascii-hologram";
import { TwoPanelShell } from "@/components/two-panel-shell";

const stack = ["rust", "tokio", "tauri-v2", "webgl", "next", "r3f", "glsl"];

export default function Home() {
  return (
    <TwoPanelShell
      left={
        <section className="home-panel">
          <div className="identity-block">
            <p className="eyebrow">handle</p>
            <h1>aetos</h1>
            <p className="one-liner">
              I build small, sharp systems that make hidden complexity operable.
            </p>
          </div>

          <nav className="social-row" aria-label="social links">
            <a href="https://x.com/aetosdios27" aria-label="X profile">
              <span className="icon-text">X</span>
            </a>
            <a href="https://github.com/aetosdios27" aria-label="GitHub profile">
              <span className="icon-text">GH</span>
            </a>
            <a href="mailto:pushpendra@example.com" aria-label="Email">
              <Mail size={16} />
            </a>
          </nav>

          <div className="stack-ledger" aria-label="language and tool stack">
            {stack.map((item, index) => (
              <span key={item}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {item}
              </span>
            ))}
          </div>

          <div className="heatmap-shell">
            <div className="heatmap-top">
              <span>github contributions</span>
              <span>live api slot</span>
            </div>
            <div className="heatmap-grid" aria-hidden="true">
              {Array.from({ length: 91 }, (_, index) => (
                <i key={index} data-level={(index * 7 + index / 3) % 5} />
              ))}
            </div>
          </div>

          <div className="route-tabs">
            <Link href="/projects">[P] Projects</Link>
            <Link href="/blog">[B] Blogs</Link>
          </div>
        </section>
      }
      right={<AsciiHologram />}
    />
  );
}
