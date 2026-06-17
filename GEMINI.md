# GEMINI.md

> **CRITICAL DIRECTIVE**: You (or any future AI instance operating in this repository) MUST read this file upon initial invocation to understand the project's strict constraints. Furthermore, you MUST auto-update this document after every significant feature implementation, architectural decision, or mistake correction to ensure the context brain remains perfectly synchronized with the codebase.
> **ERROR DIRECTIVE**: You MUST document every single error, build failure, or misunderstanding you encounter in a local `mistakes_log.md` (or directly here). You must strictly learn from them, and NEVER repeat them across iterations. Failure to document and learn from errors is unacceptable.

This document serves as the local contextual brain for the `aetos` portfolio project. It synthesizes the project's architectural guidelines, design principles, and accumulated best practices from the `~/.agents/skills` repository.

## 1. The Spacing & Aesthetic Constitution
* **The Canvas**: The main layout is strictly contained within a centered `700px` by `1400px` virtual canvas. No floating panels or arbitrary unconstrained blocks. Content begins and ends with severe, document-like precision. Vertical tracking lines sit at `10px` from the viewport edges.
* **The Grid**: Authoritarian 8-point grid. Deliberate whitespace tuning is required. Never jump between arbitrary spacing values (e.g., `gap-4` to `mt-20`); use proportional scaling to maintain rigorous mathematical tension.
* **Optical Alignment**: Strict optical alignment is mandatory. If an icon or toggle feels visually misaligned with its adjacent text baseline, fix it using precise offsets (`-translate-y-[1px]`) rather than ignoring it.
* **Palette & CSS Variables**: 
  * Light Mode: Cream background (`#F5F0E8`), Wimbledon green text (`#1B5E20`), Glow (`#1B5E20`).
  * Dark Mode (Default): Matte black background (`#000000`), Clean white text (`#F0F0F0`), Glow (`#FFFFFF`).
  * *Implementation*: Controlled entirely via dynamic CSS variables (`var(--bg)`, `var(--text)`, `var(--glow)`).
* **Interactions**: Standard CSS opacity fades are banned for major shifts. Theme transitions utilize a hardware-accelerated **View Transition API** radial flush (`850ms` cubic-bezier), giving the site a highly premium, cinematic feel. All micro-animations use `ease-[cubic-bezier(0.16,1,0.3,1)]` for a heavy, mechanical "hardware switch" feel.
* **Scrollbars**: Hidden globally via webkit/ms-overflow overrides to maintain an unbroken canvas.

## 2. Frontend Design Ethos
* **Zero Generic AI Aesthetics**: Avoid overused fonts (Inter, Roboto), predictable gradient meshes, and typical "startup" layouts.
* **Typography & Composition**: Use severe, characteristic fonts (like Geist Mono). Embrace asymmetry, generous negative space, and controlled density over generic symmetry.
* **Execution**: Every component must feel meticulously engineered. Minimalism derives its power from pixel-perfect execution, not a lack of effort.
* **Micro-Interactions**: Bouncy spring physics, generic color flushes, and slow opacity fades are strictly banned. Use severe, mechanical interactions (e.g., `-translate-x-[2px] -translate-y-[2px]` paired with an unblurred drop shadow `shadow-[2px_2px_0px_var(--text)]` and inset crushes) running on harsh timing curves (`duration-75`) to mimic physical hardware switches.
  * *Exception (Kinetic Typography)*: The user explicitly authorized a physics-based, continuous `skewX` wave animation ("ruffling grass") on the subheadings. This introduces a fluid, organic motion to act as a "life in a machine" poetic contrast against the otherwise rigid brutalist matrix.
* **Iconography Law**: If a technology or feature does not have a scalable, recognizable vector icon, it does not belong in a visual ledger. "No icon, no mention."
* **The Brick Wall Algorithm**: When rendering grids of variable-width items (like skill badges), achieve pixel-perfect flush vertical edges by applying `flex-grow` to the items within a `flex-wrap` container. This forces organic row staggering while maintaining strict outer geometric bounds.

## 3. Component Architecture & Content Management
* **MDX Content (`/content/projects/*.mdx`)**: All project data is stored statically in MDX. To add a new project, create a new file here. Ensure frontmatter includes `title`, `slug`, `year`, `tags`, and `status`. 
* **FlightBoard (`FlightBoard.tsx`)**: The project ledger on the homepage. Projects are strictly sorted chronologically (descending) by year. On mobile, the expanded image is wrapped in a `<Link>` to act as a massive hit-target since the diagonal arrow is too small for fingers.
* **SpotifyHoverCard (`SpotifyHoverCard.tsx` & `/api/spotify/route.ts`)**: Meticulously handles Spotify edge cases:
  * Plays music: `[ NOW PLAYING ]`
  * Paused but active context (200 OK, `song.item = null`): Forces a fallthrough to `getRecentlyPlayed()`
  * Paused but track loaded (200 OK, `is_playing: false`): Forces `isRecent: true` -> `[ LAST PLAYED ]`
  * Absolute silence (>3hrs): Mounts the Easter egg `[ SILENCE DETECTED ]` ("bro is locked in").
  * *Mobile UX*: Uses a `useRef` and global document touch listener in `Hero.tsx` to dismiss the card when tapping outside, and absolute positions the card `right-0 top-full` to prevent horizontal scrolling on small viewports.

## 4. Vercel & React Architecture
* **Hydration Safety**: Client-only components that rely on browser APIs (like `react-github-calendar`) must be wrapped in a strict `mounted` state guard to prevent Next.js server-client hydration mismatches.
* **Scripts**: Inline `<script>` tags in `layout.tsx` must use `next/script` with `strategy="beforeInteractive"` to align with React 19's streaming architecture.
* **Server Components & Fetching**: 
  * Route Handlers fetching external data with `cache: "no-store"` (like Spotify) MUST use `export const dynamic = "force-dynamic";` to prevent Next.js from throwing `DYNAMIC_SERVER_USAGE` errors at build time.
* **Performance Imperatives**:
  * Eliminate waterfalls: check cheap conditions before awaiting, use `Promise.all` for parallel fetching.
  * Optimize rendering: Use `content-visibility` for long lists, extract static JSX, and avoid deriving state inside `useEffect` (derive during render).

## 5. TypeScript Best Practices
* **Configuration**: `strict: true`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` are mandatory.
* **Type-Level Engineering**: Use branded types for domain primitives (e.g., `type Brand<K, T>`) and avoid excessively deep conditional/recursive types to maintain compiler speed.
* **Performance**: Utilize `skipLibCheck` and incremental builds to keep local development fast. Replace massive type intersections with simpler `interface` extensions.

## 6. Development Directives & Mistake Log
* **Named Exports**: The `react-activity-calendar` and `react-github-calendar` family of packages use *strictly named exports*. Never attempt to default-import them.
* **Implementation Boundaries**: Never implement massive unprompted features or components based on cryptic requests (e.g., "check for X"). When in doubt, read the context to enrich existing architectural quality rather than constructing unapproved code.
* **Mobile Responsiveness**: Never "stack" (flex-col) brutalist components unless absolutely necessary. Scale down the elements instead to preserve the compact, side-by-side terminal aesthetic on small viewports.
* **Build Command**: Always verify with `bun run build` before declaring a task complete. 

---
*Note: This file replaces the deprecated `AGENTS.md` and serves as the single source of truth for the AI engineer operating in this repository.*
