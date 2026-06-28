"use client"

import { type CSSProperties, useEffect, useState } from "react"
import { GitHubCalendar } from "react-github-calendar"
import type { ThemeInput } from "react-activity-calendar"

export function Activity() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[110px] w-full animate-pulse bg-[var(--text)] opacity-10 rounded-sm" />
  }

  const explicitTheme: ThemeInput = {
    light: [
      'color-mix(in srgb, var(--text) 5%, transparent)', 
      'color-mix(in srgb, var(--text) 30%, transparent)', 
      'color-mix(in srgb, var(--text) 50%, transparent)', 
      'color-mix(in srgb, var(--text) 70%, transparent)', 
      'var(--text)'
    ],
    dark: [
      'color-mix(in srgb, var(--text) 5%, transparent)', 
      'color-mix(in srgb, var(--text) 30%, transparent)', 
      'color-mix(in srgb, var(--text) 50%, transparent)', 
      'color-mix(in srgb, var(--text) 70%, transparent)', 
      'var(--text)'
    ],
  };

  const calendarStyles: CSSProperties & Record<"--react-activity-calendar-tooltip-bg" | "--react-activity-calendar-tooltip-text", string> = {
      fontFamily: "var(--font-geist-mono)",
      "--react-activity-calendar-tooltip-bg": "var(--text)",
      "--react-activity-calendar-tooltip-text": "var(--bg)"
    };

  return (
    <div style={calendarStyles}>
      <GitHubCalendar 
        username="aetosdios27"
        theme={explicitTheme}
        labels={{
          totalCount: '{{count}} contributions in the last year',
        }}
        blockSize={9}
        blockMargin={2}
        fontSize={12}
        renderColorLegend={() => <></>}
      />
    </div>
  )
}
