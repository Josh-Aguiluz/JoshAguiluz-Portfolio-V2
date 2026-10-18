/**
 * Generates public/favicon.png, public/apple-touch-icon.png and public/og-image.png
 * from src/assets/logo.webp. Re-run after changing the logo or the title line:
 *
 *   npm run meta-images
 *
 * Responsive page images (AVIF + WebP) are produced at build time by vite-imagetools,
 * via the `?w=...&format=avif;webp&as=picture` import queries, so no other script is needed.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const LOGO = 'src/assets/logo.webp';
const OUT = 'public';

await mkdir(OUT, { recursive: true });

// The logo is a 400x565 portrait with the round badge centered; crop the square badge.
const meta = await sharp(LOGO).metadata();
const side = Math.min(meta.width, meta.height);
const badge = sharp(LOGO).extract({
  left: Math.round((meta.width - side) / 2),
  top: Math.round((meta.height - side) / 2),
  width: side,
  height: side,
});

await badge.clone().resize(48, 48).png().toFile(`${OUT}/favicon.png`);
await badge.clone().resize(180, 180).flatten({ background: '#ffffff' }).png().toFile(`${OUT}/apple-touch-icon.png`);

// Open Graph card: obsidian theme, logo, name, existing title line + footer tagline.
const W = 1200;
const H = 630;
const logoPng = await badge.clone().resize(168, 168).png().toBuffer();
const mask = Buffer.from(`<svg width="168" height="168"><circle cx="84" cy="84" r="84" fill="#fff"/></svg>`);
const roundLogo = await sharp(logoPng).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="70%">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.04"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#09090b"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>
  <text x="96" y="340" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="30" fill="#a1a1aa">Josh Andrei Aguiluz</text>
  <text x="92" y="430" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="92" font-weight="600" letter-spacing="-3" fill="#fafafa">Backend <tspan fill="#a78bfa">Engineer</tspan></text>
  <text x="96" y="510" font-family="Consolas, Menlo, monospace" font-size="24" fill="#8b8b94">Backend-focused Full-Stack Engineer | Scalable Systems</text>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([{ input: roundLogo, left: 96, top: 96 }])
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(`${OUT}/og-image.png`);

console.log('Wrote public/favicon.png, public/apple-touch-icon.png, public/og-image.png');
