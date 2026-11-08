# Kubernauts Brand Assets — v1 concept

The chosen direction is **Platform Hex + Compass**, with rounded multicolor hexagon, geometric K and navigation orbit.

## Assets

- `public/brand/kubernauts-hexagon.svg` — transparent-background vector signet; primary editable implementation.
- `public/brand/kubernauts-hexagon-dark.svg` — dark-background presentation variant.

These SVGs are a manually reconstructed **vector interpretation** of the approved generative design, not a pixel-perfect trace. For a full brand release we still need a finalized wordmark, monochrome variants, minimum-size readability tests, accessibility contrast checks, and a visual comparison with the approved concept.

The original PNG preview is not yet in the repository. PNGs can be rendered from the SVG during the asset export phase.

## Usage

Use the transparent signet on suitable dark backgrounds. Keep sufficient padding and avoid reshaping, recoloring individual parts, or applying extra glow effects.

### Initial palette
- Deep navy: `#081421`
- Blue: `#087FED`
- Teal: `#25C5CE`
- Green: `#61CE4D`
- Yellow: `#FFD227`
- Orange: `#FF781B`

The production corporate website remains untouched.

## Wordmark and website integration

- `public/brand/kubernauts-wordmark-light.svg` and `kubernauts-wordmark-dark.svg` are **draft** wordmark explorations. Their live SVG text relies on installed fonts; for production export, convert approved type to vector outlines and check kerning.
- The bilingual site header and footer currently use real SVG signet plus styled live HTML text for crisp responsiveness and accessibility.
- Do not ship brand assets as final before checking icon shape, color consistency, legibility, and trademark conflicts.

## Brand System v2 — shared wordmark palette (November 2026)
- Shared per-letter brand component: `src/components/FamilyWordmark.astro`.
- Use `name="kubernauts"` or `name="kubernautic"` with `theme="light"|"dark"`.
- Both products use a left-to-right blue → cyan → teal → green → yellow → orange spectrum, inspired by the OpenKubes visual identity.
- **Kubernauts** retains its rounded, compass-like hexagon signet.
- **Kubernautic** retains its separate square K mark on its own product website.
- Light-background palette uses darker accessible shades; dark-background palette uses brighter shades.
- Site lettermarks are live text and therefore responsive and selectable. The Illustrator/SVG export remains a separate task.
- The website retains `noindex` while the relaunch is in development. Verify against the actual kubernautic.com master brand asset before final release.
