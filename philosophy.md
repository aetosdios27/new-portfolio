# Phosphor Fields

**A generative algorithm philosophy for the aetos portfolio right panel.**

## The Movement

Phosphor Fields is a computational aesthetic movement rooted in the materiality of digital decay. It takes its name from the phosphor coating in CRT monitors — those ghostly afterimages that linger when bright elements move across a dark screen. In an era of instant rendering and perfect frames, Phosphor Fields celebrates the trace, the echo, the temporary scar that light leaves on darkness.

## Algorithmic Expression

The algorithm manifests as a particle system whose behavior is governed by layered Perlin noise fields — a meticulously crafted flow landscape with three octaves of detail. Particles are born at random locations across the canvas and immediately surrender to the forces of the noise field, their trajectories bending along invisible gradients of computational terrain. The field itself is static per seed (giving each configuration a unique, reproducible topology) but reveals itself dynamically through particle movement — the algorithm shows the map by walking it.

## Traces and Time

Each particle leaves a trail — not a literal line, but a phosphorescent glow that fades over frames. This is the critical temporal mechanic: the canvas is never fully cleared. Each frame, a semi-transparent overlay is drawn, gradually dimming old trails while new ones are written at full intensity. The result is a topology of recent activity — bright paths where particles cluster, dim voids where they pass infrequently. Time is encoded directly in luminance. A particle moving through a region of high field convergence leaves a brilliant scar; five seconds later, that scar has decayed to near-invisibility unless reinforced.

## Mouse as Gravity

The cursor introduces a perturbation force into the otherwise deterministic flow field. When the mouse moves within the right panel, it creates a gravitational well — particles within a configurable radius are drawn toward it, their velocities amplified, their trails brightening. This is not direct manipulation (the user does not control individual particles) but rather influence at the field level: the cursor becomes a temporary feature of the computational landscape, a moving mountain that bends the flow. When the mouse stops, the field slowly returns to its base topology, and the brightened trails fade like footsteps in phosphor sand.

## Craftsmanship Philosophy

This algorithm is the product of extensive refinement: the noise scale was tuned by hand across dozens of seeds to avoid both chaotic noise (where particles wander aimlessly) and rigid structure (where paths become too predictable). The trail decay rate was balanced to maintain approximately 3-4 seconds of visible history without accumulating visual noise. Particle count (approximately 2000) was chosen to saturate the field at a density where individual particle paths are indistinguishable but collective flow patterns are clearly legible. Every parameter — force strength, noise octave blending, birth rate, cursor radius, decay alpha — was calibrated against the portfolio's dark surface (#0A0A0A) and green accent (#00FF94) to produce a piece that feels simultaneously computational and organic, a living system that mirrors the engineering sensibility of the site it inhabits.

## Seeded Variation

Each seed produces a unique noise topology, ensuring that every page load renders a different but reproducible flow landscape. The seed can be advanced or randomized via controls, allowing the user to explore the space of possible fields — each one a distinct ecosystem of particle paths, convergence zones, and dark eddies.
