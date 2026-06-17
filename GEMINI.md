# GEMINI.md

> **CRITICAL DIRECTIVE**: You (or any future AI instance operating in this repository) MUST read this file upon initial invocation to understand the project's strict constraints. Furthermore, you MUST auto-update this document after every significant feature implementation, architectural decision, or mistake correction to ensure the context brain remains perfectly synchronized with the codebase.
> **ERROR DIRECTIVE**: You MUST document every single error, build failure, or misunderstanding you encounter in a local `mistakes_log.md` (or directly here). You must strictly learn from them, and NEVER repeat them across iterations. Failure to document and learn from errors is unacceptable.

This document serves as the local contextual brain for the `aetos` portfolio project. It synthesizes the project's architectural guidelines, design principles, and accumulated best practices from the `~/.agents/skills` repository.

## 1. The Spacing & Aesthetic Constitution
* **The Grid**: The layout is restricted to a rigid, left-aligned `640px` central axis. No floating panels, no arbitrary centering of blocks. Content begins and ends with severe, document-like precision.
* **Palette**: 
  * Light Mode: Cream background (`#F5F0E8`), Wimbledon green text (`#1B5E20`).
  * Dark Mode: High-contrast monochrome.
  * *Implementation*: Controlled entirely via dynamic CSS variables (`var(--bg)`, `var(--text)`).
* **Interactions**: Standard CSS opacity fades are banned for major shifts. Theme transitions utilize a hardware-accelerated **View Transition API** radial flush (`850ms` cubic-bezier), giving the site a highly premium, cinematic feel.
* **Scrollbars**: Hidden globally via webkit/ms-overflow overrides to maintain an unbroken canvas.

## 2. Frontend Design Ethos
* **Zero Generic AI Aesthetics**: Avoid overused fonts (Inter, Roboto), predictable gradient meshes, and typical "startup" layouts.
* **Typography & Composition**: Use severe, characteristic fonts (like Geist Mono). Embrace asymmetry, generous negative space, and controlled density over generic symmetry.
* **Execution**: Every component must feel meticulously engineered. Minimalism derives its power from pixel-perfect execution, not a lack of effort.
* **Micro-Interactions**: Bouncy spring physics, generic color flushes, and slow opacity fades are strictly banned. Use severe, mechanical interactions (e.g., `-translate-x-[2px] -translate-y-[2px]` paired with an unblurred drop shadow `shadow-[2px_2px_0px_var(--text)]` and inset crushes) running on harsh timing curves (`duration-75`) to mimic physical hardware switches.
  * *Exception (Kinetic Typography)*: The user explicitly authorized a physics-based, continuous `skewX` wave animation ("ruffling grass") on the subheadings. This introduces a fluid, organic motion to act as a "life in a machine" poetic contrast against the otherwise rigid brutalist matrix.
* **Iconography Law**: If a technology or feature does not have a scalable, recognizable vector icon, it does not belong in a visual ledger. "No icon, no mention."
* **The Brick Wall Algorithm**: When rendering grids of variable-width items (like skill badges), achieve pixel-perfect flush vertical edges by applying `flex-grow` to the items within a `flex-wrap` container. This forces organic row staggering while maintaining strict outer geometric bounds.

## 3. Vercel & React Architecture
* **Hydration Safety**: Client-only components that rely on browser APIs (like `react-github-calendar`) must be wrapped in a strict `mounted` state guard to prevent Next.js server-client hydration mismatches.
* **Scripts**: Inline `<script>` tags in `layout.tsx` must use `next/script` with `strategy="beforeInteractive"` to align with React 19's streaming architecture.
* **Performance Imperatives**:
  * Eliminate waterfalls: check cheap conditions before awaiting, use `Promise.all` for parallel fetching.
  * Optimize rendering: Use `content-visibility` for long lists, extract static JSX, and avoid deriving state inside `useEffect` (derive during render).

## 4. TypeScript Best Practices
* **Configuration**: `strict: true`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` are mandatory.
* **Type-Level Engineering**: Use branded types for domain primitives (e.g., `type Brand<K, T>`) and avoid excessively deep conditional/recursive types to maintain compiler speed.
* **Performance**: Utilize `skipLibCheck` and incremental builds to keep local development fast. Replace massive type intersections with simpler `interface` extensions.

## 5. Development Directives & Mistake Log
* **Named Exports**: The `react-activity-calendar` and `react-github-calendar` family of packages use *strictly named exports*. Never attempt to default-import them.
* **Implementation Boundaries**: Never implement massive unprompted features or components based on cryptic requests (e.g., "check for X"). When in doubt, read the context to enrich existing architectural quality rather than constructing unapproved code.
* **Tooling Priorities**: Ensure Next.js App Router rules are strictly followed (no raw script tags, proper client boundaries).

---
*Note: This file replaces the deprecated `AGENTS.md` and serves as the single source of truth for the AI engineer operating in this repository.*
