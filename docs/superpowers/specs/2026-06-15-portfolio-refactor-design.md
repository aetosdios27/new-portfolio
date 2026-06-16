# Portfolio Refactor — Design Document

**Date:** 2026-06-15
**Source:** AGENTS.md (full product spec)
**Approach:** Refactor existing codebase to match AGENTS.md spec

---

## 1. Scope

Refactor the existing portfolio at `/home/aetos/dev/personal/new-portfolio` to match the design system, component structure, and behavior specified in `AGENTS.md`. No rebuild from scratch — adapt existing components.

---

## 2. Design System

| Token | Current | Target |
|-------|---------|--------|
| Background | `#050505` | `#0A0A0A` |
| Surface | — | `#111111` |
| Border | — | `#1a1a1a` |
| Text primary | `#ededed` | `#FFFFFF` |
| Text secondary | — | `#666666` |
| Text muted | — | `#333333` |
| Accent | `#38bdf8` (sky blue) | `#00FF94` (green) |
| Accent dim | — | `#00FF9440` |
| Display font | None | Instrument Serif |
| Mono font | System monospace | IBM Plex Mono |
| Spacing | Arbitrary | Base-8 grid |
| Voice | Mixed case | Lowercase labels, `01` padding, `[P]` brackets |

Implementation:
- `globals.css`: Replace `@theme` block with new tokens, add Instrument Serif + IBM Plex Mono `@font-face` via `next/font` in `layout.tsx`
- All component color references updated to use new Tailwind classes / CSS vars

---

## 3. Layout

Two-panel grid: `grid-cols-[1fr_1fr]`, divider = `border-r border-[#1a1a1a]` on left panel. Remove animated divider expand/collapse from shell.

| Breakpoint | Behavior |
|------------|----------|
| Desktop (> 820px) | Two-panel split |
| Mobile (< 820px) | Single column, right panel hidden |

---

## 4. Component Tree (Refactored)

```
app/layout.tsx                    ← fonts (next/font), Lenis provider
app/page.tsx                      ← two-panel layout, imports left/right components

components/
├── left/
│   ├── Identity.tsx              ← handle label, "aetos" wordmark, tagline, icons
│   ├── StackGrid.tsx             ← 7-item 2-col grid, numbered cells
│   ├── GithubHeatmap.tsx         ← live GitHub API, accent color scale
│   └── BottomNav.tsx             ← [P] [B] vim-style, N indicator
└── right/
    ├── EPVPanel.tsx              ← state machine orchestrator (useReducer)
    └── states/
        ├── IdleCanvas.tsx        ← ASCII hologram (refactored from ascii-hologram.tsx)
        ├── ReceivingCanvas.tsx   ← GSAP scatter + data stream (new)
        └── EPVScene.tsx          ← R3F particle system (lazy loaded, new)

lib/
├── github.ts                     ← Contributions API fetch
├── content.ts                    ← Existing (keep)
└── epv-state.ts                  ← useReducer state machine

app/
├── page.tsx                      ← Home (identity + hologram)
├── projects/page.tsx             ← Project listing (w/ EPV wired)
└── blog/page.tsx                 ← Blog listing (w/ EPV wired)
```

Remove:
- `components/two-panel-shell.tsx` (merged into layout)
- `components/ascii-hologram.tsx` (moved to right/states/IdleCanvas.tsx)
- `components/pattern-field.tsx` (folded into EPV states)
- `components/listing-view.tsx` (logic distributed to page components + EPV)
- `app/projects/[slug]/page.tsx` (content renders in EPV panel)
- `app/blog/[slug]/page.tsx` (same)

---

## 5. Home Page Left Panel

### Identity
- `handle` label: `text-[#666] font-mono text-[11px]`
- `aetos`: `font-serif text-[120px] text-white` (Instrument Serif), letter-spacing tightened
- Tagline: `font-mono text-[15px] text-[#666] max-w-[400px]`
- Icons: 20px, white → `#00FF94` on hover, transition 150ms

### StackGrid
- 7 items in `grid-cols-2`
- Each cell: border `#1a1a1a`, padded, `01 rust` format
- Hover: border → `#00FF94`, text → white, 150ms ease

### GithubHeatmap
- Fetch via GitHub Contributions API
- 0: `#111`, low: `#00FF9420`, mid: `#00FF9460`, high: `#00FF94`
- Label left: `github contributions`, right: pulsing "live api slot"
- Pulse: 2px dot, accent, 1.5s ease-in-out infinite

### BottomNav
- Fixed bottom of left panel
- `[P] Projects    [B] Blogs` — mono, muted
- `N` in bottom-left corner (mode indicator)

---

## 6. Right Panel — EPV State Machine

### State: IDLE
- Canvas 2D ASCII hologram
- Eagle silhouette via character density map (sparse `· ` → mid `s x A` → heavy `M H █`)
- Slow sine-wave density modulation, period ~4s
- Rotation ~0.3 deg/s around vertical axis
- Font: IBM Plex Mono 11px
- Colors: `#00FF9415` bg noise, `#00FF9490` boundary, `#00FF94` core

### State: RECEIVING
- Trigger: mouse movement (right panel), scroll, keypress
- GSAP scatter (600ms) — characters explode radially
- Then: Canvas 2D data stream toward cursor
- Color shift: `#00FF94` → `#94FF00` (hue rotation)
- Debounce 2s of no interaction → EPV

### State: EPV
- R3F scene, lazy-loaded
- ~8000 particles, ASCII char point sprites via GLSL
- Eagle form materializes → orbits → collapses (8s total)
- Vertex shader: parametric eagle wing curve
- Fragment shader: char selection by particle velocity
- Returns to IDLE after 8s

### epv-state.ts
```typescript
type EPVState = "IDLE" | "RECEIVING" | "EPV";
type EPVAction = { type: "INTERACT" } | { type: "SETTLE" } | { type: "RETURN_TO_IDLE" };
```

---

## 7. Pages

### Home (`/`) — Two-panel layout
- Left: Identity → StackGrid → GithubHeatmap → BottomNav
- Right: EPVPanel (IDLE state)

### Projects (`/projects`) — Projects list
- Left: Breadcrumb `← home / projects /`, row list with title/tag/year, hr separators
- Right: EPVPanel (project pattern in IDLE), on row click → EPV expands
- No separate `[slug]` page routes — content renders in EPV panel

### Blog (`/blog`) — Same structure as projects
- Left: Breadcrumb + row list
- Right: Blog pattern in IDLE, on row click → EPV expands

---

## 8. Known Problems (from AGENTS.md)

1. ASCII hologram is noise → redesign with eagle density map
2. No transitions between states → wire EPV state machine + Framer Motion
3. Stack grid no micro-interactions → add hover border/text transition
4. Heatmap contrast too low → use new color scale
5. No handle tracking animation → GSAP letterspread on mount

---

## 9. Non-goals

- No dark/light toggle
- No scroll-driven animations
- No skill bars or proficiency indicators
- No hero image or headshot
- No analytics/cookie banners
- No PWA
