import Link from "next/link"

export default function NotFound() {
  return (
    <div className="viewport">
      <div className="terminal-shell">
        <div className="flex flex-col items-center justify-center min-h-[calc(100svh-36px)] col-span-2">
          <p className="text-text-muted text-[11px] mb-2">404</p>
          <h1 className="text-text-primary font-mono text-lg">not found</h1>
          <Link
            href="/"
            className="text-accent mt-6 hover:opacity-80 transition-opacity"
          >
            [ return home ]
          </Link>
        </div>
      </div>
    </div>
  )
}
