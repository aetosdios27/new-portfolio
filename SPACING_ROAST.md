# SPACING AUDIT & ROAST
*(From the desk of a Chief Design Engineer, SF, 15 YoE)*

This codebase claims to be a "minimalist portfolio" but mathematically it’s a random number generator. Let’s look at the actual values:

1. **The Y-Axis Disaster (Theme Toggle vs NavPanel)**
   - `ThemeToggle.tsx` is pinned at `top-[15px]`. 
   - `page.tsx` places the `NavPanel` wrapper at `top-6` (24px).
   - What is this? Why is the toggle 9px higher? Their optical centers are completely unaligned. This is the kind of sloppiness that makes a site feel like a template instead of a crafted artifact.

2. **The Divorce Settlement Navigation**
   - `NavPanel.tsx` uses `gap-20` (80px). 
   - The links are so far apart they don't even look like a single navigation component anymore. They look scattered. A minimalist aesthetic requires tension, not just emptiness.

3. **Active Bracket Spacing**
   - The `[ ]` brackets on the active nav item are pushed out via `absolute -left-4` and `-right-4` (16px). 
   - With a 15px monospace font, 16px of gap creates a massive optical hole. They should hug the word, not orbit it.

4. **Vertical Rhythm (Or Lack Thereof)**
   - Hero title to tagline: `gap-4` (16px).
   - Hero block to About section: `mt-20` (80px).
   - About H2 to content: `mb-6` (24px).
   - Paragraphs: `space-y-6` (24px).
   - There's no proportional scaling here. You jump from 16 to 80, then 24 and 24. It lacks a rigorous mathematical foundation (like an 8-point baseline grid).

5. **Horizontal Arbitrariness**
   - You have a 700px main canvas, vertical lines at 10px from the viewport edge, a `px-6` inner container, and a 500px text max-width.
   - The 500px measure is actually good (perfect line-length for 15px mono), but the relationship between the 700px wrapper and the 500px content needs to feel deliberate, not just "shoved to the left".

### Verdict
The design has soul, but the execution is sloppy. We need an authoritarian 8-point grid, strict optical alignments, and deliberate whitespace tuning.
