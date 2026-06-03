# Portfolio — Product Requirements Document
**Author:** Pushpendra (aetos / aetosdios27)  
**Status:** Draft v1  
**Last updated:** 2026-06-03

---

## 1. Vision

A portfolio that functions as a living system rather than a static document. Every interaction — navigating, clicking, hovering — should feel like operating a piece of software, not browsing a website. The aesthetic is brutalist terminal: `#0A0A0A` matte black, monospace everywhere, razor-thin borders, no decoration that doesn't carry meaning.

The person who leaves this site should remember two things: what Pushpendra builds, and that the site itself felt like something he built.

---

## 2. Routes

```
/                          → Home
/projects                  → Project list
/projects/[slug]           → Handled via EPV (right panel expansion, not a new route)
/blog                      → Blog post list  
/blog/[slug]               → Handled via EPV (right panel expansion, not a new route)
```

No page navigations inside projects or blog. Everything is panel state. The URL updates on EPV open (`/projects/konto`) but there is no hard navigation — the layout persists.

---

## 3. Layout System

Every page shares the same two-panel shell. It never breaks.

```
┌─────────────────────────────────────────┬──────────────────┐
│                                         │                  │
│           LEFT PANEL (~65%)             │  RIGHT PANEL     │
│                                         │    (~35%)        │
│                                         │                  │
└─────────────────────────────────────────┴──────────────────┘
```

The divider is a live element. On EPV open, it animates left — right panel expands to ~60%. On EPV close, it returns. The outer shell (rounded border, `#0A0A0A` bg) never changes. The shell is the constant.

**Right panel has three states:**
1. **Idle** — pattern runs. No labels, no prompts. Art breathes.
2. **Receiving** — pulse hits divider, pattern agitates (distortion radius spikes, noise char rate increases, animation speed increases) for ~400ms, then settles.
3. **Expanded** — divider moves left, pattern dissolves, EPV content renders in top-to-bottom terminal style.

---

## 4. Pages

### 4.1 Home (`/`)

**Left panel:**
- Handle: `aetos`
- One-liner: sharp, authored, not a job description
- Social icons row (X, GitHub, email)
- Language/tool stack — not an icon grid, something more considered
- GitHub contribution heatmap (live, via GitHub API)
- `[P] Projects` / `[B] Blogs` tab buttons — navigate to `/projects` and `/blog`

**Right panel:**
- ASCII art render of X profile picture
- Hologram distortion effect:
  - Each character is individually tracked with base position
  - On `mousemove`: characters within radius R (~55px) receive velocity impulses away from cursor, proportional to `(1 - distance/R)`
  - Distorted characters briefly swap to noise glyphs (`!@#$%&*?`)
  - Characters within proximity brighten — scanning field effect
  - On `mouseleave`: spring physics return each character to base position (`spring: 0.18`, `damping: 0.72`)
  - Custom cursor: thin circle showing the distortion radius
- Implementation: plain Canvas 2D, `useEffect` on canvas ref, `requestAnimationFrame` loop
- ASCII art generated from actual X pfp at build time

---

### 4.2 Projects (`/projects`)

**Left panel:**
- Breadcrumb: `← home / projects /`
- Project list as horizontal rule rows. Each row:
  - Project name (left-aligned, monospace)
  - Short tag (right-aligned, dimmed) — e.g., `rust · systems`
  - Year (far right, dimmed)
  - Full-width `<hr>` separator between rows

**Right panel (idle):**
- Projects pattern (see Section 6.1)
- No label, no prompt

**On row click — interaction sequence:**
1. **Pulse** (0–250ms): A horizontal scan line launches from the leftmost edge of the clicked row, travels rightward to the divider. Linear ease-out. Thin, bright, single pixel height.
2. **Row lift** (150–400ms): The clicked row translates Y upward ~4px, text brightens to full opacity. All other rows dim to 25% opacity.
3. **Panel agitation** (250–650ms): Right panel pattern receives the pulse — distortion radius spikes, animation speed increases 3x, noise increases visibly. Settles after ~400ms.
4. **Divider tween** (500–900ms): Divider animates left via GSAP, right panel expands to ~60% width. Eased with `power3.inOut`.
5. **EPV render-in** (800ms+): Pattern dissolves. EPV content renders top-to-bottom, terminal-style, line by line.
6. **URL update**: `history.pushState` to `/projects/[slug]`. No navigation.

**On back:**
1. EPV content wipes top-to-bottom
2. Divider returns, right panel compresses
3. Pattern fades back in
4. Row un-lifts, other rows restore opacity
5. URL returns to `/projects`

---

### 4.3 Blog (`/blog`)

Structurally identical to `/projects`. Row per post, click to expand EPV in right panel.

**Right panel (idle):**
- Blog pattern (see Section 6.2)

---

## 5. EPV — Expanded Project/Post View

The EPV is the content layer that renders inside the right panel when expanded. Not a new page. Not a modal. The right panel *becomes* the content.

### 5.1 Project EPV

Content is a condensed README. Structure:

```
[ PROJECT NAME ]                    ← large, IBM Plex Serif italic

// what
One sharp paragraph. What it is, what problem it solves.
No marketing language.

// why  
One paragraph. The actual motivation. Why this and not something else.

// how
Key technical decisions only. Not a tutorial.
The things that make it non-trivially hard.

[ STACK ]
rust  ·  tokio  ·  tauri-v2  ·  webgl        ← tag row

[ LINKS ]
→ github    → writeup (if exists)
```

Content sourced from MDX files at `content/projects/[slug].mdx`. Frontmatter carries metadata, body is the EPV content.

### 5.2 Blog EPV

Full post content renders inline. MDX with syntax highlighting. No pagination — posts are written short. If a post is long, it gets its own route exception (`/blog/[slug]` as a real page).

---

## 6. Patterns

Two patterns required. Both implemented in Three.js + React Three Fiber with GLSL shaders. Rendered in the right panel idle state.

### 6.1 Projects Pattern

**Concept:** Structural, geometric. Suggests systems and infrastructure.

**Implementation:** Delaunay triangulation on an animated 2D point cloud.
- Points distributed across canvas, each with a velocity driven by simplex noise (GLSL `snoise`)
- `delaunator` (Mapbox) recomputes triangulation every frame — ~30 points, well within real-time budget
- Only triangle edges rendered, no fills. Stroke opacity varies by triangle area — smaller triangles brighter.
- Points drift slowly, triangulation morphs continuously
- Color: single hue derived from project accent color, low saturation, ~15% opacity

**Shader:** Fragment shader applies simplex noise to point positions for organic drift. Vertex shader handles edge rendering via `LineSegments` + `BufferGeometry`.

### 6.2 Blog Pattern

**Concept:** Fluid, typographic. Suggests language and thinking.

**Implementation:** Noise-driven particle trails (flow field).
- ~8–12 particles, each following a Perlin/simplex noise vector field
- Each particle draws its trail — the tangle of lines is the accumulated path
- Particles occasionally reset position (fade out, respawn at random point)
- Result: dense organic tangle that slowly shifts, never repeats
- Color: cooler, lower contrast than projects pattern

**Shader:** Fragment shader for the noise vector field. Trail rendered as `Line` geometry updated per frame.

---

## 7. Tech Stack

| Concern | Technology | Rationale |
|---|---|---|
| Runtime / package manager | Bun 1.3.x | Fast install/update/dev execution |
| Framework | Next.js 15.5.x (App Router) | Routing, MDX pipeline, `history.pushState` |
| React | React 19.2.x / React DOM 19.2.x | App Router UI runtime |
| Styling | Tailwind v4.3.x | Layout and typography only |
| 3D / Shaders | Three.js 0.184.x + React Three Fiber 9.6.x + Drei 10.7.x | Patterns, GLSL shader authoring |
| Shader utilities | glslify + glsl-noise | Simplex noise in GLSL |
| Triangulation | delaunator 5.1.x (Mapbox) | Projects pattern |
| Layout animation | Framer Motion 12.40.x | Panel expansion, divider tween, `AnimatePresence` |
| Interaction sequences | GSAP 3.15.x + gsap/ScrollTrigger | Pulse animation, row lift sequence, multi-element choreography |
| Smooth scroll | Lenis 1.3.x | Global scroll behavior |
| ASCII hologram | Canvas 2D (plain) | `useEffect` + `requestAnimationFrame`, spring physics per character |
| Content | MDX files + gray-matter 4.x + next-mdx-remote 6.x | Blog posts, project EPV content |
| GitHub heatmap | GitHub Contributions API | Live data on home page |
| Fonts | IBM Plex Mono + IBM Plex Serif | Mono for UI, Serif italic for display |

---

## 8. Content Structure

```
content/
  projects/
    styx.mdx
    konto.mdx
    iris.mdx
    webnotes.mdx
    vmrl.mdx
  blog/
    [post-slug].mdx

public/
  ascii/
    pfp.txt          ← pre-generated ASCII art at build time
```

### MDX Frontmatter — Projects
```yaml
---
title: Styx
slug: styx
year: 2025
tags: [rust, tokio, tauri, webgl]
accent: "#38bdf8"
status: active
links:
  github: https://github.com/aetosdios27/Styx
---
```

### MDX Frontmatter — Blog
```yaml
---
title: The scalar mutation vulnerability in financial systems
date: 2025-11-12
slug: scalar-mutation
tags: [fintech, engineering]
---
```

---

## 9. Performance Requirements

- **LCP** < 1.2s. Patterns load after content — they are not blocking.
- **Pattern FPS** ≥ 60fps on mid-range hardware. R3F canvas is isolated; no layout thrashing.
- **ASCII hologram** — character count kept to render budget. Pre-generated at build, not runtime image conversion.
- **No layout shift**. Two-panel shell is statically sized. Content renders inside panels.
- **Fonts** — subset IBM Plex Mono to used characters. Self-hosted, no Google Fonts in prod.

---

## 10. Phased Build

### Phase 1 — Shell + Home
- Two-panel layout shell
- Home left panel (identity, socials, heatmap)
- ASCII hologram (placeholder art → real pfp)
- No patterns yet

### Phase 2 — Navigation + List Pages
- `/projects` and `/blog` routes
- Row list UI
- Breadcrumb navigation
- Right panel idle state (patterns)

### Phase 3 — Interaction Sequence
- Pulse animation (GSAP)
- Row lift + dim
- Panel agitation
- Divider tween (Framer Motion layout)

### Phase 4 — EPV
- Right panel expansion
- Content render-in animation
- Project and blog EPV content
- Back interaction

### Phase 5 — Polish
- Pattern quality pass (shader tuning)
- Hologram tuning (spring constants, radius, real pfp)
- Performance audit
- Mobile — collapsed single panel, patterns disabled

---

## 11. Out of Scope (v1)

- Contact form
- Search
- RSS feed (added in v1.1)
- Dark/light toggle (dark only)
- i18n
- Analytics (added post-launch)
