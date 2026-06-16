# aetos portfolio — work log

## Project
Portfolio for Pushpendra (aetosdios27). Two-panel desktop-first design. AGENTS.md is the spec.

## Architecture Updates

**Runtime:** Now on Next.js 16.2.9 + Turbopack (was 15.5.19 + Webpack). Clean builds pass.

**Right panel:** p5.js v2.3.0 generative art. 3000-particle Perlin noise flow field. No more Three.js/R3F, no EPV state machine, no dynamic imports.

## Completed Work

### Session 1 — Foundations
- Two-panel layout, design system (accent `#00FF94`, bg `#0A0A0A`)
- shadcn/ui initialized (Button, dark-only, Tailwind v4)
- MDX pipeline (5 projects, 1 blog), custom 404
- SF Pro font downloaded + loaded via `next/font/local`
- Fonts: Instrument Serif (Google), JetBrains Mono (Google), SF Pro (local)

### Session 2 — Left Panel
- Identity block: handle label, "aetos" wordmark, tagline, social icons
- StackGrid: 2-column, zero-padded numbers, devicon icons, Arrow/Home/End keyboard nav
- GithubHeatmap removed
- BottomNav: `[P] Projects` / `[B] Blogs`, vim-style, `p`/`b` shortcuts, `N` mode indicator

### Session 3 — Right Panel
- EPV state machine (useReducer, 3 states) — REMOVED in Session 5
- ASCII hologram with eagle silhouette density map — REPLACED in Session 5
- Listing views with client-side EPV overlay (Framer Motion)

### Session 4 — Content & Polish
- MDX content for 5 projects, 1 blog post
- Content grid in listing views (CSS grid, hover zoom 1.02)
- Custom 404 with "grok" typewriter text + reactive astronaut

### Session 5 — p5.js Migration
- Three.js/R3F removed (was causing `a[d].call` webpack registry error)
- p5.js v2.3.0 installed + @types/p5
- P5Canvas.tsx: 3000-particle Perlin noise flow field
  - Noise grid pre-computed (CELL=8, bilinear interpolation)
  - 8 brightness/size groups, batched fillRect rendering
  - Mouse cursor repulsion (160px radius)
  - `r` → random seed, `s` → save PNG
  - Trailing effect via semi-transparent fill overlay
- Performance: zero per-frame allocations, direct Canvas 2D context
- Orphaned files deleted: IdleCanvas, ReceivingCanvas, EPVScene, PhosphorCanvas, epv-state
- `[object Event]` runtime error: fixed by moving `p5.disableFriendlyErrors` inside `p.setup` and wrapping `p.draw` in try-catch

## Known Issues

- @types/p5 v1.7.7 may have type gaps for p5.js v2 APIs
- MDX body rendering is basic text-splitting (no rich MDX rendering)
- Lenis scroll integration not set up
- Framer Motion page transitions not implemented
- EPVPanel/{P5Canvas} naming: "EPV" prefix is legacy; rename if desired
- Mobile fallback needs polish
- `unused imports` and `any type` lint warnings may exist

## Quick Reference

```bash
bun --bun next dev --port 4200    # dev
bun --bun next build              # prod build
rm -rf .next && bun --bun next build  # clean build (needed after major dep changes)
```
