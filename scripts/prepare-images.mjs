// Prepares website artwork from the supplied reference images.
//
// - Crops text-free regions (no baked-in captions, speech bubbles or titles;
//   all readable text on the site is real HTML/CSS).
// - Applies diagonal alpha masks where a crop would catch a neighbouring
//   manga panel border.
// - Turns the ink character-sheet figures into transparent cutouts by
//   flood-filling the paper background from the image edges.
// - Exports optimized WebP files to public/images/panels/.
//
// Usage: npm run images
//        npm run images -- --preview <dir>   (also writes PNG previews on navy)
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const REF = 'public/images/references'
const OUT = 'public/images/panels'
const COLOR = path.join(REF, 'abyssal-king-color-manga.png')
const SHEET = path.join(REF, 'abyssal-king-reference.png')

/** polygon points are in crop-local pixels (before resizing) */
const polyMask = (w, h, pts) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><polygon fill="#fff" points="${pts
      .map((p) => p.join(','))
      .join(' ')}"/></svg>`,
  )

const crops = [
  // ---------- Color manga page (1672 x 941) ----------
  { name: 'human-scientist', src: COLOR, region: { left: 178, top: 0, width: 200, height: 292 }, width: 600 },
  {
    name: 'lab-tank', src: COLOR, region: { left: 712, top: 0, width: 300, height: 405 }, width: 700,
    // big reveal panel cuts in diagonally on the bottom-right
    mask: (w, h) => [[0, 0], [w, 0], [w, 40], [150, h], [0, h]],
  },
  {
    name: 'transform-scream', src: COLOR, region: { left: 218, top: 318, width: 385, height: 245 }, width: 900,
    // panels above cut in along a shallow diagonal
    mask: (w, h) => [[0, 40], [w, 84], [w, h], [0, h]],
  },
  { name: 'awakened-eye', src: COLOR, region: { left: 245, top: 735, width: 385, height: 206 }, width: 900 },
  {
    name: 'king-reveal', src: COLOR, region: { left: 790, top: 0, width: 660, height: 715 }, width: 1200,
    // lab panel on the left along the border line x = 1048 - 0.387y (source)
    mask: (w, h) => [[1064 - 790, 0], [w, 0], [w, h], [0, h], [0, 712]],
  },
  // ---------- Character sheet (1536 x 1024), ink style ----------
  { name: 'human-portrait', src: SHEET, region: { left: 258, top: 24, width: 196, height: 376 }, width: 500 },
  { name: 'king-face', src: SHEET, region: { left: 1030, top: 196, width: 240, height: 352 }, width: 560 },
  {
    name: 'king-roar', src: SHEET, region: { left: 1092, top: 574, width: 400, height: 172 }, width: 900,
  },
  {
    name: 'human-cutout', src: SHEET, region: { left: 25, top: 88, width: 262, height: 932 }, width: 460,
    cutout: {
      // white-out (source coords): portrait panel edge, ground splatter
      whiteout: [{ x0: 244, y0: 0, x1: 9999, y1: 412 }, { x0: 0, y0: 820, x1: 56, y1: 9999 }],
      // face, neck and hands are light grey — never treat them as paper
      protect: [{ x0: 122, y0: 105, x1: 205, y1: 218 }, { x0: 62, y0: 436, x1: 112, y1: 508 }, { x0: 206, y0: 420, x1: 246, y1: 484 }],
    },
  },
  {
    name: 'king-cutout', src: SHEET, region: { left: 300, top: 18, width: 745, height: 1004 }, width: 1000,
    cutout: {
      whiteout: [
        { x0: 0, y0: 0, x1: 463, y1: 410 }, // human portrait panel
        { x0: 0, y0: 405, x1: 442, y1: 508 }, // quote text
        { x0: 455, y0: 0, x1: 668, y1: 90 }, // AFTER label
        { x0: 895, y0: 0, x1: 9999, y1: 168 }, // title ink splatter
        { x0: 952, y0: 160, x1: 992, y1: 196 }, // speck beside the claw
        { x0: 1016, y0: 380, x1: 9999, y1: 9999 }, // right-hand panels
        { x0: 0, y0: 800, x1: 333, y1: 9999 }, // human's boots
      ],
      protect: [{ x0: 735, y0: 70, x1: 832, y1: 178 }], // face
    },
  },
]

/**
 * Removes the paper background of an ink drawing.
 * 1. Candidate background = light, low-saturation pixels outside protected rects.
 * 2. Flood fill through candidates, seeded from the image edges and from
 *    "thick" candidate areas (fully light 11x11 windows) so enclosed paper gaps
 *    are removed while thin interior highlights survive.
 * 3. Keep only the large opaque components (drops stray ink splatter).
 */
async function cutout(img, region, { whiteout = [], protect = [] }) {
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  const N = w * h
  const local = (r) => ({
    x0: Math.max(0, r.x0 - region.left), y0: Math.max(0, r.y0 - region.top),
    x1: Math.min(w, r.x1 - region.left), y1: Math.min(h, r.y1 - region.top),
  })
  for (const r of whiteout.map(local))
    for (let y = r.y0; y < r.y1; y++)
      for (let x = r.x0; x < r.x1; x++) {
        const i = (y * w + x) * 4
        data[i] = data[i + 1] = data[i + 2] = 255
      }
  const prot = new Uint8Array(N)
  for (const r of protect.map(local))
    for (let y = r.y0; y < r.y1; y++) for (let x = r.x0; x < r.x1; x++) prot[y * w + x] = 1

  const cand = new Uint8Array(N)
  for (let p = 0; p < N; p++) {
    const i = p * 4
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    const sat = Math.max(r, g, b) - Math.min(r, g, b)
    // inside protected areas (skin) only near-pure paper white counts
    cand[p] = lum >= (prot[p] ? 240 : 158) && sat < 42 ? 1 : 0
  }
  // integral image for the "thick" test
  const S = new Uint32Array((w + 1) * (h + 1))
  for (let y = 0; y < h; y++) {
    let row = 0
    for (let x = 0; x < w; x++) {
      row += cand[y * w + x]
      S[(y + 1) * (w + 1) + x + 1] = S[y * (w + 1) + x + 1] + row
    }
  }
  const R = 5, AREA = (2 * R + 1) ** 2
  const bg = new Uint8Array(N)
  const stack = []
  const seed = (p) => { if (cand[p] && !bg[p]) { bg[p] = 1; stack.push(p) } }
  for (let x = 0; x < w; x++) { seed(x); seed((h - 1) * w + x) }
  for (let y = 0; y < h; y++) { seed(y * w); seed(y * w + w - 1) }
  for (let y = R; y < h - R; y++)
    for (let x = R; x < w - R; x++) {
      const s = S[(y + R + 1) * (w + 1) + x + R + 1] - S[(y - R) * (w + 1) + x + R + 1]
        - S[(y + R + 1) * (w + 1) + x - R] + S[(y - R) * (w + 1) + x - R]
      if (s === AREA) seed(y * w + x)
    }
  while (stack.length) {
    const p = stack.pop()
    const x = p % w
    if (x + 1 < w) seed(p + 1)
    if (x > 0) seed(p - 1)
    if (p + w < N) seed(p + w)
    if (p - w >= 0) seed(p - w)
  }
  // opaque connected components; keep the big ones
  const comp = new Int32Array(N).fill(-1)
  const sizes = []
  for (let p0 = 0; p0 < N; p0++) {
    if (bg[p0] || comp[p0] !== -1) continue
    const id = sizes.length
    let size = 0
    comp[p0] = id
    stack.push(p0)
    while (stack.length) {
      const p = stack.pop()
      size++
      const x = p % w
      const nb = [x + 1 < w ? p + 1 : -1, x > 0 ? p - 1 : -1, p + w < N ? p + w : -1, p - w]
      for (const q of nb)
        if (q >= 0 && !bg[q] && comp[q] === -1) { comp[q] = id; stack.push(q) }
    }
    sizes.push(size)
  }
  const largest = Math.max(...sizes)
  for (let p = 0; p < N; p++) {
    if (bg[p] || sizes[comp[p]] < largest * 0.03) data[p * 4 + 3] = 0
  }
  return sharp(data, { raw: { width: w, height: h, channels: 4 } })
}

const previewIdx = process.argv.indexOf('--preview')
const previewDir = previewIdx > -1 ? process.argv[previewIdx + 1] : null

await mkdir(OUT, { recursive: true })
if (previewDir) await mkdir(previewDir, { recursive: true })

for (const c of crops) {
  let img = sharp(c.src).extract(c.region)
  const { width: w, height: h } = c.region
  if (c.cutout) {
    img = await cutout(img, c.region, c.cutout)
  }
  if (c.mask) {
    const buf = await img.ensureAlpha().png().toBuffer()
    img = sharp(buf).composite([{ input: polyMask(w, h, c.mask(w, h)), blend: 'dest-in' }])
  }
  const buf = await img.png().toBuffer()
  const sized = sharp(buf).resize({ width: c.width, kernel: 'lanczos3' })
  const transparent = Boolean(c.mask || c.cutout)
  await sized
    .clone()
    .webp({ quality: 82, alphaQuality: 90, effort: 5, nearLossless: false })
    .toFile(path.join(OUT, `${c.name}.webp`))
  if (previewDir) {
    const p = sized.clone()
    await (transparent ? p.flatten({ background: '#06142a' }) : p).png().toFile(path.join(previewDir, `${c.name}.png`))
  }
  const meta = await sharp(path.join(OUT, `${c.name}.webp`)).metadata()
  console.log('✓', c.name.padEnd(18), `${meta.width}x${meta.height}`)
}
