# ABYSSAL KING — ราชันแห่งห้วงลึก

A dark-fantasy character presentation site (Thai) that combines a full-color manga origin story,
real sperm-whale biology, a "real vs. fiction" comparison, a classified character dossier and a
final full-body reveal. It's designed for a 3–5 minute classroom presentation.

## Run

```bash
npm install
npm run dev       # local development
npm run build     # production build -> dist/
npm run preview   # serve the production build
```

Fonts (Noto Sans Thai, Kanit, Cinzel) are bundled locally, so Thai text renders correctly
even without an internet connection.

## Artwork pipeline

`public/images/references/*.png` are the supplied reference sheets. The site doesn't use them
directly. Instead, `npm run images` (`scripts/prepare-images.mjs`, uses `sharp`):

- crops text-free regions of the references, avoiding all baked-in captions, bubbles and titles
  (all readable text on the site is real HTML),
- masks neighbouring manga-panel borders with diagonal alpha masks,
- turns the ink full-body figures into transparent cutouts,
- writes optimized WebP files to `public/images/panels/`.

The production build drops the raw reference sheets from `dist/`.

## Structure

```
src/
  data/character.js      single source of truth for the character (abilities, moves, weaknesses…)
  sections/              Hero, MangaStory, Biology, BioToFiction, Dossier, FinalReveal, Footer
  diagrams/              WhaleAnatomy, SonarDiagram, DiveChart, SizeCompare (SVG + HTML labels)
  components/            Nav, OceanBackdrop, Reveal, MangaArt (original SVG scenes), Icon
```

Biology, BioToFiction, Dossier and FinalReveal are code-split with `React.lazy`. Animations
respect `prefers-reduced-motion`.

## Presenting

- Use the top navigation (or `Page Down`) to move between the six sections.
- The dossier tabs work with the mouse or the arrow keys.
- The depth gauge on the right edge (wide screens) shows how far you've "descended" through the page.
