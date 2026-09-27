/**
 * remove-bg.mjs
 * Removes the solid background from the vCloudOps logo.
 *
 * Algorithm:
 *   1. Sample the top-left corner pixel as the background colour.
 *   2. Walk every pixel; if its Euclidean distance in RGB space from
 *      the background is below HARD_THRESH → fully transparent.
 *   3. Between HARD_THRESH and SOFT_THRESH → linearly fade alpha
 *      (handles anti-aliased edges so the logo doesn't look cut-out).
 *   4. Everything else → keep original colour + fully opaque.
 *   5. Write result to public/logo.png.
 */

import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir   = dirname(fileURLToPath(import.meta.url))
const ROOT    = resolve(__dir, '..')
const INPUT   = resolve(ROOT, 'C:/Users/lenovo/.gemini/antigravity/brain/f9db860a-9409-4b5a-afed-4c0c1ed8168a/.user_uploaded/media_1790504825366.png')
const OUT_DIR = resolve(ROOT, 'public')
const OUTPUT  = resolve(OUT_DIR, 'logo.png')

const HARD_THRESH = 38   // fully transparent below this distance
const SOFT_THRESH = 70   // start fading alpha above HARD up to this

mkdirSync(OUT_DIR, { recursive: true })

const { data, info } = await sharp(INPUT)
  .ensureAlpha()        // guarantee 4-channel RGBA
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info
const px = new Uint8ClampedArray(data)

// ── 1. Sample background colour from the 4 corners ─────────────────────────
function sample(x, y) {
  const i = (y * width + x) * channels
  return [px[i], px[i + 1], px[i + 2]]
}
const corners = [
  sample(0, 0), sample(width - 1, 0),
  sample(0, height - 1), sample(width - 1, height - 1),
]
// Average the four corner samples
const [bgR, bgG, bgB] = corners.reduce(
  ([ar, ag, ab], [r, g, b]) => [ar + r / 4, ag + g / 4, ab + b / 4],
  [0, 0, 0]
)
console.log(`Background colour sampled: rgb(${Math.round(bgR)}, ${Math.round(bgG)}, ${Math.round(bgB)})`)

// ── 2. Key out the background ───────────────────────────────────────────────
for (let i = 0; i < px.length; i += channels) {
  const r = px[i], g = px[i + 1], b = px[i + 2]
  const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2)

  if (dist < HARD_THRESH) {
    // Fully transparent — background pixel
    px[i + 3] = 0
  } else if (dist < SOFT_THRESH) {
    // Partial transparency — anti-aliased edge
    const t = (dist - HARD_THRESH) / (SOFT_THRESH - HARD_THRESH)
    px[i + 3] = Math.round(255 * t)
  }
  // else: keep original alpha (255 = opaque)
}

// ── 3. Write PNG with alpha ─────────────────────────────────────────────────
await sharp(Buffer.from(px), { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(OUTPUT)

console.log(`✓ Saved transparent logo → ${OUTPUT}`)
