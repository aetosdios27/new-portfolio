# MEMORY.md — portfolio state

## Current direction

Minimalist portfolio with light/dark theme toggle. All content inside a centered 700×1400 closed-off canvas. Two vertical lines (1px, `--glow` color) at viewport edges (10px from left, 10px from right) spanning full height. Everything in Geist Mono.

## Theme system

**Dark mode** (default):
- `--bg`: `#000000`
- `--text`: `#F0F0F0` (clean white, easy on eyes)
- `--glow`: `#FFFFFF`

**Light mode**:
- `--bg`: `#F5F0E8` (cream/off-white)
- `--text`: `#1B5E20` (Wimbledon green)
- `--glow`: `#1B5E20`

Toggle: fixed top-right (`top-[15px] right-6`), sun/moon SVGs, persists to localStorage. Inline `<script>` in `<head>` prevents flash. Center of toggle aligns with center of NavPanel.

## Layout

```
┌────────────────────────────────────────────┐
│    left 10px | 700px content | right 10px  │
├───── var(--glow) vertical line ──────┬─────┤
│                                       │     │
│  ┌───────── 700px ──────────────────┐ │     │
│  │  pt-6: ~  work  log  connect     │ │     │
│  │                                   │ │     │
│  │  mt-40: aetos (64px Geist Mono)  │ │     │
│  │         i build/break/yap abt... │ │     │
│  │                                   │ │     │
│  │        (1400px canvas)            │ │     │
│  └───────────────────────────────────┘ │     │
├────────────────────────────────────────┴─────┤
└──────────────────────────────────────────────┘
```

- 700×1400px canvas, centered in viewport via `items-center justify-center` on `main`
- Vertical lines are `fixed` at viewport edges (not inside canvas)
- Background: `var(--bg)`

## Components

### `NavPanel.tsx`
- Four links: `~` (home), `work` (projects), `log` (blog), `connect` (mailto)
- Geist Mono, `text-[15px]`, `gap-8`, `letter-spacing: 0.04em`
- Active link: full opacity; inactive: 45% opacity → 80% on hover
- Active link wrapped in `[` `]` brackets using absolute-positioned spans
- Uses Next.js `Link` for internal routes, `<a>` for mailto

### `Hero.tsx`
- "aetos" in Geist Mono, `64px`, `leading-[0.95]`, `tracking-tight`
- Tagline: `i [build|break|yap] abt stuff`
- Cycling word animates every 1.8s via framer-motion `AnimatePresence mode="wait"`
- Animation: slides up 6px + fades (0.2s, easeInOut)
- Cycling word sits in a fixed-width (50px) `inline-block` container, absolute positioned inside, to prevent layout shift
- Tagline at 50% opacity, 15px, same line via inline spans (not flex)

### `ThemeToggle.tsx`
- Fixed position `top-[15px] right-6`, `z-50`
- 40×40px button, `rounded-xl`, border at text 15% opacity
- Moon SVG in dark mode, Sun SVG in light mode
- `hover:opacity-70`
- on click: toggles `.dark` on `<html>`, saves to `localStorage`
- On mount: reads localStorage → falls back to `prefers-color-scheme`
- Uses `useEffect` for initial sync (after flash prevention script in layout)

## CSS Variables (`globals.css`)

Defined in `:root` and overridden in `.dark`:

| Variable | Light | Dark |
|----------|-------|------|
| `--bg` | `#F5F0E8` | `#000000` |
| `--text` | `#1B5E20` | `#F0F0F0` |
| `--glow` | `#1B5E20` | `#FFFFFF` |

Body: no predefined colors; everything uses the CSS vars via inline styles or Tailwind's `text-[var(--text)]`.

Only Tailwind + tw-animate-css imported. No shadcn. No sidebar/chart/radius variables.

## Fonts

- **Geist Mono** via `geist/font/mono` (CSS var: `--font-geist-mono`) — the only font in use
- Other fonts (`jetbrains-mono`, `sf-pro`, `geist-pixel-square`) removed from layout

## File structure (relevant)

```
src/
├── app/
│   ├── globals.css        ← theme vars, body reset
│   ├── layout.tsx         ← GeistMono.variable, flash script, ThemeToggle
│   └── page.tsx           ← 700×1400 canvas, NavPanel, Hero, vertical lines
├── components/
│   ├── Hero.tsx           ← name + cycling tagline
│   ├── NavPanel.tsx       ← navigation links
│   └── ThemeToggle.tsx    ← dark/light toggle button
```

## What's NOT done

- `/projects` and `/blog` pages still have old listing-view with panel layout (unused currently, home page only matters)
- No content inside the 1400px canvas beyond the name + tagline — it's a blank canvas ready for more
- No scroll, no overflow handling for the 1400px box
- Blog/projects page layout not updated to match new theme system
