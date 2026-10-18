# Portfolio Redesign + Performance Overhaul — Builder Brief

You are the Lead Design Engineer on this repository. Your job has two equal priorities:

1. **Visual design elevation** — move the site from its current warm cream/brown "sticker card" look to a premium obsidian/zinc system (dark by default, with a fully designed light mode) in the vein of Linear, Vercel and Stripe.
2. **Measurable performance optimization** — near-100 Lighthouse in all four categories, CLS ≈ 0, fast LCP, low INP.

Work directly from the files in this repo. Read before you write.

---

## 0. Non-negotiable rules

1. **No invented content.** Do not add, assume or write placeholder projects, jobs, metrics, testimonials, skills, dates, links, blog posts or copy. Every word of content on the finished site must already exist in the repo. You may shorten, split or restructure existing copy. You may not add facts.
2. **If a field you need isn't supported by existing text, leave it out.** An empty slot is better than a made-up one. Example: the Danono's Bakery copy says the backend is PHP and covers product catalog, order processing and customer data, but **it never names a database**, so don't write "MySQL" on that card.
3. **The certifications section is frozen as data and behavior.** See §3.
4. **Keep the existing section order and anchors:** `#home`, `#about`, `#projects`, `#resume`, `#blog`, `#contact`. Nav and hash syncing must keep working.
5. **Don't touch `.env` or the contact form's submit logic** (Web3Forms in `src/pages/ContactPage.tsx`). Restyle the form only.
6. **Work in small, verifiable commits on the current branch** (`opus-redesign`), one phase per commit. Run `npm run build` after every phase and fix every error and warning you introduce.
7. **If something is ambiguous, stop and ask me.** Don't guess. This applies especially to the production URL (§5.6) and to any content you're tempted to remove.

---

## 1. Read these files first (required inventory)

Before you change anything, read and summarize back to me what each one contains:

| File | Why it matters |
|---|---|
| `package.json`, `vite.config.ts`, `index.html`, `src/main.tsx` | Stack: Vite 6 + React 18 + TS + SWC, Framer Motion 11, three / @react-three/fiber / drei, lucide-react. Build output goes to `build/`. |
| `src/App.tsx` | The one-page shell: fixed nav, scroll handler, section wrappers, mobile menu, `Scene3D`, `CustomCursor`, `ThemeToggle`, `ScrollProgress`. |
| `src/css/main.css` (~4,100 lines) | **Read this carefully. See §2.0.** |
| `src/pages/HomePage.tsx` | Hero (full-bleed `homeBGHD.webp` background), stats, the "My Tech Stack" grid, and a "Selected Work" block that **duplicates** project data. |
| `src/pages/AboutPage.tsx` | Bio, profile photo, the second `techStack` array (Node.js, PHP, MySQL, Firebase, Flutter, Angular), `softSkills`, the **`certifications` array + `<CertCoverflow>`**, and the CTA. |
| `src/pages/ProjectsPage.tsx` | The `PROJECTS` array (the 5 real projects: Danono's Bakery, HAU Eco-Quest, The Wellness Apparel, Chanel Website Replica, Furry Feast) rendered through `GlassCardDeck`. |
| `src/components/GlassCardDeck.tsx` | Current project presentation. |
| `src/components/CertCoverflow.tsx` | The working certificates carousel + modal (fixed in commit `4714b45`). |
| `src/pages/ResumePage.tsx` | Profile, timeline and credentials list (with images), `quickStats`, an SVG ring chart, and a `MutationObserver` on `<html class>` for dark mode (to be replaced by CSS variables). |
| `src/pages/BlogPage.tsx`, `src/pages/ContactPage.tsx`, `src/components/Footer.tsx` | Remaining sections. |
| `src/components/*` | `Scene3D`, `CustomCursor`, `MagneticButton`, `TiltCard`, `SpotlightCard`, `ScrollVelocityText`, `InfiniteMarquee`, `TypewriterTerminal`, `ScrollProgress`, `ThemeToggle`. |

Then grep for every dependency in `package.json` and list which are actually imported from `src/`. From my own pass, almost all of the Radix packages plus `recharts`, `swiper`, `embla-carousel-react`, `lenis`, `@studio-freight/react-lenis`, `cmdk`, `vaul`, `sonner`, `input-otp`, `react-day-picker`, `react-hook-form`, `react-resizable-panels`, `react-responsive-masonry` and `next-themes` look unused. `react-router-dom` is only imported by `NotFoundPage.tsx`, which is never rendered. **Check this yourself; don't take my word for it.**

---

## 2. Visual design system

### 2.0 Fix the CSS pipeline first (blocking)

`src/css/main.css` appears to be a **frozen, precompiled Tailwind v4.1.3 output** (it starts with `/*! tailwindcss v4.1.3 */` and `@layer properties`) mixed with hand-written custom CSS. There's no `postcss.config`, no `@tailwindcss/vite` plugin and no `@import "tailwindcss"`. So **any Tailwind class that wasn't in the original snapshot silently does nothing** (for example `border-white/10` doesn't exist in it today).

Do this first:
1. Verify my diagnosis (add a test class like `bg-zinc-950` and check whether it applies).
2. Install `@tailwindcss/vite`, add it to `vite.config.ts`, and create a real entry stylesheet that starts with `@import "tailwindcss";` and defines the design tokens below in `@theme`.
3. Move the **hand-written** rules out of `main.css` (sticker cards, cert coverflow styles, keyframes, and so on) into the new stylesheet or co-located CSS. Delete the compiled utility snapshot. Pay special attention to the coverflow styles added in `4714b45`: the certificates section must look and behave the same after migration, before you restyle it.
4. Remove the dead `figma:asset/...` and `pkg@version` aliases from `vite.config.ts` once you've confirmed nothing imports them.
5. Move the inline `<style dangerouslySetInnerHTML>` blocks (in `App.tsx` and `HomePage.tsx`) into the stylesheet.

### 2.1 Theme: obsidian dark (default) + a polished light mode

**Keep both dark and light mode and keep the theme toggle.** Dark is the hero look and the default; light must be fully designed too, not an afterthought.

- Keep `ThemeToggle` and the `.dark` class on `<html>` (Tailwind v4: `@custom-variant dark (&:where(.dark, .dark *));`). Improve it: restyle it to match the new system, give it an accessible name and `aria-pressed`, and default to the user's `prefers-color-scheme` when nothing is saved (today it defaults to light).
- **Prevent theme flash (CLS/FOUC):** add a tiny inline script in `index.html` `<head>` that reads `localStorage.theme` (inside try/catch) and sets the `dark` class before first paint. Update `<meta name="theme-color">` per theme.
- **Replace hard-coded hex colors with semantic tokens that switch per theme.** Remove the paired `bg-[#FDF5E7] dark:bg-[#1A1715]`-style classes and the old palette (`#521D07`, `#A47A2D`, `#FDF5E7`, `#1A1715`, `#D4AF37`, `#FFA51F`, ...). Components use `bg-bg`, `text-fg`, `border-border` and so on, with no per-component `dark:` colors. Define tokens in `@theme` (light values) and override them under `.dark`.
- The `MutationObserver` in `ResumePage.tsx` should go: with CSS variables the SVG chart can use `currentColor` / `var(--...)` and needs no JS theme detection.

Dark tokens (default look):

```
--color-bg:          #09090b   /* zinc-950, page */
--color-surface:     #0f0f12   /* cards */
--color-surface-2:   #18181b   /* zinc-900, raised / hover */
--color-border:      rgb(255 255 255 / 0.08)   /* 1px hairline (border-white/10 feel) */
--color-border-strong: rgb(255 255 255 / 0.14)
--color-fg:          #fafafa
--color-fg-muted:    #a1a1aa
--color-fg-subtle:   #71717a   /* large/secondary text only; check contrast */
--color-accent:      ONE crisp accent, e.g. #a78bfa (violet-400) or #60a5fa (blue-400). Use sparingly.
```

Light tokens (same structure, clean zinc/white, not the old cream/brown):

```
--color-bg:          #fafafa
--color-surface:     #ffffff
--color-surface-2:   #f4f4f5   /* zinc-100 */
--color-border:      rgb(0 0 0 / 0.08)
--color-border-strong: rgb(0 0 0 / 0.16)
--color-fg:          #09090b
--color-fg-muted:    #52525b   /* zinc-600 */
--color-fg-subtle:   #71717a
--color-accent:      a darker shade of the dark-mode accent so it keeps >= 4.5:1 on white (e.g. violet-600 #7c3aed / blue-600 #2563eb)
```

- In light mode, spotlight glows become very faint tinted radial gradients, and shadows can be slightly more present (soft, low-opacity) since hairlines are weaker on white. All contrast requirements in §5.2 apply to **both** themes.
- Every feature below (cards, bento grid, certifications, resume, contact, footer, OG image) must be checked in **both** themes in the final verification.

- **Borders:** 1px `--color-border` on every card, input and divider. No more `border-4` / `border-3`.
- **Spotlight glows:** a soft radial gradient behind the hero (and at most 1–2 more sections), e.g. `radial-gradient(600px circle at 50% 0%, rgb(167 139 250 / 0.12), transparent 70%)`. On cards, a cursor-following spotlight. Reuse `SpotlightCard.tsx`, but drive it with CSS custom properties (`--x`, `--y`) set in a `pointermove` handler, **not** React state, so hover never re-renders.
- **Radius:** 12px on cards, 8px on small elements, full on pills. Consistent.
- **Shadows:** almost none. Separate surfaces with borders and faint inner highlights (`inset 0 1px 0 rgb(255 255 255 / 0.04)`), not drop shadows.
- Drop decorative noise that fights the aesthetic: the `-rotate-2` photo tilt, graph-paper and watermark backgrounds, the giant "01 / 02" watermark numbers, and the gold `#D4AF37` CTA block. Rebuild CTAs as quiet bordered panels with one accent button.

### 2.2 Typography

- **Headings and UI:** Geist Sans (or Inter as a fallback). Tight tracking (`-0.02em` to `-0.04em`) on large headings. Use sentence case or title case. **Stop using all-caps Michroma headings everywhere.**
- **Mono:** Geist Mono or JetBrains Mono, used *only* for technical badges and tags, section eyebrows (keep the existing `// About Me`, `// Projects` style, it fits), the terminal, and small metadata like years and issuers.
- Remove Michroma, Space Grotesk, Fira Code and Caveat unless one of them has a clear, deliberate role. Load **two families max**.
- Fluid type scale with `clamp()`. Body copy 16–18px at `--color-fg-muted`, line-height 1.6, max width ~65ch. Today body copy is often 24px bold. Bring it down; reserve weight for headings.
- Remove the inline `style={{ fontFamily: 'Michroma, sans-serif' }}` props throughout and use classes.

### 2.3 Layout, pacing and hierarchy

- One container: `max-w-6xl` (≈1152px), side padding `px-4 sm:px-6 lg:px-8`. Same in every section.
- Section rhythm: `py-24 md:py-32`, with consistent header blocks (eyebrow → heading → one-line lede → content). Remove `min-h-screen` from content sections; let content set the height.
- Use **one** `<h1>` on the page (the hero name or headline). Every section title becomes an `<h2>`, every card title an `<h3>`. Today `HomePage`, `AboutPage`, `ProjectsPage` and `ContactPage` each render an `<h1>`.
- Nav: slim (56–64px) sticky bar with `backdrop-blur`, a 1px bottom border, a smaller logo (current is `h-16 md:h-20`), and quiet text links with an accent indicator under the active one. Remove the `border-b-4` gold bar. Keep the mobile menu but restyle it to match.
- **Remove the duplication.** The "Selected Work" block in `HomePage.tsx` and `ProjectsPage.tsx` share project data, and there are two separate tech stack lists (`HomePage` "My Tech Stack" + `AboutPage` `techStack`). Create one source of truth: `src/data/projects.ts` and `src/data/skills.ts`, built **only** by moving the existing arrays. The home page may keep a short "Selected Work" teaser that reads from the same data and links to `#projects`.
- Decide whether `ScrollVelocityText` strips and `InfiniteMarquee` still earn their place. Keep at most one, toned down to muted mono text.

### 2.4 Smart Project Cards

Replace `GlassCardDeck` with a responsive grid of **Smart Cards** (1 col mobile, 2 col desktop; optionally make the most substantial project span full width).

**Card face (fast scan):**
- Screenshot thumbnail (existing `image`), 16:10 aspect box, `object-cover`, with a subtle border and slight zoom on hover (transform only).
- Title (`h3`), role (from `role`), and the one-line `description`.
- Tags rendered as **mono badges** (`text-xs`, 1px border, `--color-surface-2` fill).
- Two icon links: GitHub (`github`) and Live (`live`), each with an accessible name ("View Danono's Bakery source on GitHub").

**"Technical View" (on the same card, no clutter):**
- A segmented control or tab switch on each card: `Overview | Technical View`, built as an accessible tablist (`role="tablist"`, arrow-key support, `aria-selected`, `aria-controls`). Build it by hand or keep `@radix-ui/react-tabs` if you'd rather. Then the tab is its only Radix dependency.
- Switching tabs must **not change the card's height** (no CLS). Use a fixed-height content region with internal scroll, or overlay the Technical View on the thumbnail area.
- Technical View has three short blocks, **written only from that project's existing `details` paragraphs**:
  - **Problem**: what the project solves.
  - **Architecture**: a compact flow rendered as mono chips joined by arrows, using only components the text names. For example, HAU Eco-Quest's copy supports `React → Express REST API (JWT + RBAC) → MongoDB / Mongoose` and Vercel deployment. If the text doesn't name a layer, don't draw it.
  - **Highlights**: 2–4 bullets pulled from the details (for example, The Wellness Apparel: custom admin CMS, session-based cart, input validation, led the team).
- Put the structured fields in `src/data/projects.ts` (`problem`, `architecture: string[]`, `highlights: string[]`) next to the original `details`, which you keep. **Before you build the UI, show me the extracted fields for all 5 projects so I can approve them.**
- Keep the existing "Want to see more? → GitHub profile" CTA, restyled.

### 2.5 Skills as a Bento Grid

- Merge the existing skills into one Bento Grid: the HomePage tech stack entries (React and whatever else that array holds; read it fully), AboutPage `techStack` (Node.js, PHP, MySQL, Firebase, Flutter, Angular), and `softSkills`. **Don't add any technology that isn't already in these arrays.** Deduplicate.
- Group by the categories already present (Frontend / Backend / Database / Mobile, plus Soft Skills). Layout: CSS grid, 4 cols desktop, 2 tablet, 1 mobile. Give Backend, the stated specialty, a larger 2×2 tile, and make the rest 1×1 or 2×1. Each tile has the category in mono, the skill names, and the existing icons (keep the inline SVGs from `HomePage`; lucide icons elsewhere).
- Tiles get the same 1px border, surface fill and cursor spotlight as project cards.
- Remove the per-tech `bgLight/bgDark/borderLight/borderDark` color system and the injected `!important` styles. One neutral tile style, with the brand color used only on the icon.

### 2.6 Hero, About, Resume, Blog, Contact, Footer

- Restyle only. Keep all copy, images, links and the resume PDF download.
- **Hero:** name/title, the existing description, primary CTA (accent) and secondary CTA (bordered). Keep `TypewriterTerminal` if it reads well in mono. Decide whether the `homeBGHD.webp` full-bleed photo still fits the obsidian look. If you keep it, darken it under a gradient and treat it as the LCP element (§4.1).
- **Resume:** keep the timeline and credential images. Restyle the SVG ring chart to tokens.
- **Contact:** inputs get a 1px border, a `--color-surface` fill, a visible accent focus ring, and real `<label>`s.

---

## 3. Certifications: frozen, restyle only

The certifications section in `src/pages/AboutPage.tsx` (the `certifications` array) and `src/components/CertCoverflow.tsx` was just fixed in commit `4714b45`. Treat it as **locked**:

- **Don't change** the array contents: titles, issuers, `link`s, `sourceFile`s, `description`s, `alt` text, order, and the image/PDF imports.
- **Don't change** the behavior: the coverflow positioning, prev/next buttons, arrow-key navigation, dot navigation, the view modal, Escape to close, the body scroll lock, and the external verify links.
- **Allowed:** colors, borders, radius, typography and spacing changed to match the new tokens. Moving its styles into the new stylesheet during §2.0.
- Keep it **prominent**: its own clear `h2` sub-section with real breathing room. Don't bury it.
- Do the same for the credentials list in `ResumePage.tsx`: restyle it, leave its data alone.
- After each phase, manually check that every certificate card renders, cycles, opens its modal, and that its verify link opens. Report the result.
- Two a11y fixes are allowed in `CertCoverflow` if they don't change behavior: (a) the global `ArrowLeft/ArrowRight` listener on `document` should only fire when focus is inside the carousel, so it doesn't hijack keys for the rest of the page; (b) the modal should get `role="dialog"`, `aria-modal`, a labelled title, and focus moved in on open and restored on close. **Ask me before you make either change.**

---

## 4. Performance

Measure **before** you optimize. Run `npm run build && npx vite preview`, then Lighthouse in an incognito window (mobile preset). Record the baseline Performance, Accessibility, Best Practices and SEO scores, plus LCP, CLS, TBT and the bundle sizes from the build output. Re-measure at the end and give me a before/after table.

### 4.1 LCP

- The hero background is currently a CSS `background-image` whose position comes from a `resize` listener plus React state (`bgPos` in `HomePage.tsx`). Replace it with a real `<img>` (or `<picture>`) that has `fetchpriority="high"`, `decoding="async"`, **no** `loading="lazy"`, explicit `width`/`height`, `object-cover`, and responsive positioning through CSS `object-position` media queries. Delete the resize listener.
- Generate responsive variants (for example 640 / 1280 / 1920w) as **AVIF with WebP fallback** through `srcset`/`sizes`, and add a `<link rel="preload" as="image" imagesrcset=... >` for it in `index.html`.
- **Fonts:** remove the render-blocking `@import url(fonts.googleapis.com...)` at the top of the CSS. Self-host the two chosen families (`@fontsource-variable/geist`, `@fontsource-variable/geist-mono` or `@fontsource-variable/jetbrains-mono`), subset to Latin, use `font-display: swap`, and preload only the heading weight used above the fold. Add `size-adjust`/metric overrides on the fallback stack if you see a font-swap layout shift.

### 4.2 Main thread, TBT and INP

- **`App.tsx` re-renders the entire app on every scroll event.** `handleScroll` calls `setScrollYValue` and `setScrollYProgressValue` (check whether either value is even read) plus `setScrolled` and `setActiveSection`. Fix it:
  - Delete unused state.
  - Detect the active section with an `IntersectionObserver`, not by reading `offsetTop` per scroll.
  - Update `scrolled` only when the boolean actually flips.
  - `ScrollProgress` should use Framer's `useScroll` + `scaleX` (transform) with no React state.
- **`Scene3D`:** a full-page three.js canvas pulls in the whole `vendor-3d` chunk on first load. In order of preference: (a) remove it if it doesn't fit the new aesthetic, which a subtle CSS/SVG glow can replace; or (b) `React.lazy` it, mount it only after `requestIdleCallback` / first interaction, skip it entirely on `(pointer: coarse)` and `prefers-reduced-motion: reduce`, pause `useFrame` when the tab is hidden, and cap `dpr={[1, 1.5]}`. Its `mousemove` listener must be `{ passive: true }`. **Tell me which option you chose and why.**
- **`CustomCursor` and `MagneticButton`:** disable on touch / `(pointer: coarse)` and under reduced motion. Make sure cursor movement uses `transform` through motion values or refs, never React state per move. Make sure the native cursor stays visible for accessibility, or drop the custom cursor entirely if it hurts INP.
- Lazy-load below-the-fold sections that pull heavy code (for example `ResumePage` with its SVG chart, `BlogPage` modals, `ContactPage`) with `React.lazy` + `Suspense`, using fallbacks with **reserved height** so nothing shifts. Keep the anchors working: the `<section id>` wrappers stay in `App.tsx` and render eagerly.
- Remove `React.memo` wrappers that do nothing once the scroll re-render is fixed, and keep any that measurably help.

### 4.3 CLS (target 0.00)

- Every `<img>` gets explicit `width` and `height` (intrinsic pixel size) plus CSS sizing, or sits in an `aspect-ratio` box. Today most images have neither: the profile photo, the logo, project thumbnails, cert images, and the resume images (which only have `height: 220px` inline).
- Everything below the fold gets `loading="lazy" decoding="async"`.
- Card tab switches, the mobile menu, the cert modal, `Suspense` fallbacks and font swaps must not move layout.
- Entrance animations start from `opacity: 0` + `translateY`. That's fine for CLS, but **reserve the final space.** Never animate `height`, `width`, `top`/`left` or `margin`.

### 4.4 Assets

- Audit `src/assets/` and delete files nothing imports. Candidates I noticed: `ccnaReallll.jfif`, `mySql.png` (a duplicate of `mysql.webp`), and possibly `ccnaReallll.webp`, `codingDaily.webp`, `lifeAsHau.webp`, `holyAngel.webp`, `top1.webp`. **Grep each one before deleting, and list the deletions for me.**
- Re-encode every remaining raster: AVIF primary, WebP fallback, resized to at most 2× its largest displayed size. The repo already has `sharp`, `convert_images.py` and `convertCertifications.mjs`. Reuse or replace them with one documented `scripts/optimize-images.mjs`. Don't re-encode the certificate PDFs. They're linked downloads and don't affect page load.
- Certificate images must stay legible in the cert modal. Keep a high-quality variant for the modal and a small one for the carousel.

### 4.5 Animation performance (Framer Motion audit)

- Grep every `motion.*`, `whileHover`, `whileInView`, `animate`, `variants` and `layoutId`. Animate **only `opacity` and `transform`** (`x`, `y`, `scale`, `rotate`). Replace the `whileHover={{ boxShadow: ... }}` on tech and skill cards with a CSS `:hover` change on a pseudo-element's opacity.
- Use `LazyMotion` + `domAnimation` with the `m` component to cut Framer's bundle size, and enable `strict` so a stray `motion` import fails loudly.
- Wrap the app in `<MotionConfig reducedMotion="user">`, and add a global `@media (prefers-reduced-motion: reduce)` block that disables CSS animations and transitions and the marquee.
- `whileInView` gets `viewport={{ once: true, margin: "-10%" }}` everywhere. Keep staggers short (≤ 60ms per item, ≤ 400ms total).
- Remove the inline `document.documentElement.style.scrollBehavior = 'smooth'` and set `scroll-behavior: smooth` in CSS, disabled under reduced motion.
- Add `will-change: transform` only on elements that animate continuously (marquee, cursor), never globally.

### 4.6 Bundle

- `npm uninstall` every dependency you confirmed unused in §1. Delete `NotFoundPage.tsx` (never routed) or route it properly. Ask me which.
- Simplify `manualChunks` once the deps are gone. Drop `vendor-charts` if `recharts` is removed.
- Use per-icon imports from `lucide-react`. Named imports already tree-shake, but confirm the `vendor-ui` chunk shrinks.
- Add `rollup-plugin-visualizer` temporarily, report the top 10 modules by size, then remove it.
- Report the before and after sizes (gzip) for every output chunk.

---

## 5. SEO, semantics and accessibility

### 5.1 Landmarks

- `<header>` wraps the nav. `<main id="main">` wraps all sections. `<footer>` is already in `Footer.tsx`; keep it outside `<main>`. Each `<section>` gets `aria-labelledby` pointing to its `h2`.
- Add a "Skip to content" link as the first focusable element.
- Change the mobile menu button to `aria-expanded`, `aria-controls`, and a label ("Open menu" / "Close menu"). When the menu is open, trap focus and close it on Escape.
- Every icon-only link or button gets an accessible name.

### 5.2 Contrast and focus

- All body text ≥ 4.5:1 on its background; large text ≥ 3:1. Check `--color-fg-subtle` carefully.
- Visible `:focus-visible` ring (2px accent + offset) on every interactive element.

### 5.3 `index.html` head

Keep the existing `<title>` and description. Add:

```html
<meta name="theme-color" content="#09090b" media="(prefers-color-scheme: dark)" />
<meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
<meta name="color-scheme" content="dark light" />
<link rel="canonical" href="{SITE_URL}/" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />  <!-- generate from logo.webp -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Josh Andrei Aguiluz" />
<meta property="og:title" content="Josh Andrei Aguiluz | Backend-focused Full-Stack Engineer" />
<meta property="og:description" content="(reuse the existing meta description verbatim)" />
<meta property="og:url" content="{SITE_URL}/" />
<meta property="og:image" content="{SITE_URL}/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="..." />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="{SITE_URL}/og-image.png" />
```

- **`og-image.png`** (1200×630, in `public/`): build it from existing material only, meaning the logo, name, existing title line and new theme colors. Render it with a small `sharp` + SVG script so it can be regenerated. Keep it under 300 KB.
- Add JSON-LD `Person` structured data using only facts already on the site: name, job title as written in the existing meta, `alumniOf` Holy Angel University, and `sameAs` with the GitHub profile `https://github.com/Josh-Aguiluz` plus any other profile links that already exist in `Footer.tsx` / `ContactPage.tsx`.
- Add `public/robots.txt` and `public/sitemap.xml` (single URL).
- Keep `public/_redirects` (SPA fallback for Netlify).

### 5.4 Best Practices

- No console errors or warnings in production.
- Every `target="_blank"` link has `rel="noopener noreferrer"`.
- Images served at the right aspect ratio and resolution.

### 5.5 Title sync

`App.tsx` rewrites `document.title` per section. Keep it, but its base string ("Backend Engineer") differs from `index.html` ("Backend-focused Full-Stack Engineer"). Make them consistent, and ask me which wording to use.

### 5.6 Production URL (`{SITE_URL}`)

I couldn't find the deployed URL in the repo. **Search the repo for it first** (README, Netlify config, footer links). If you can't find it, **stop and ask me.** Never invent a domain. OG and canonical tags require absolute URLs.

---

## 6. Execution order (one commit each)

1. **Inventory and baseline:** §1 summary, the dependency usage list, a baseline Lighthouse run, baseline bundle sizes. Change nothing yet. → *Report to me.*
2. **CSS pipeline:** real Tailwind v4 via `@tailwindcss/vite`, tokens, migrated custom CSS, dead aliases removed. The site should look the **same** after this step. Verify the certificates section is pixel- and behavior-identical.
3. **Dependency purge and dead code:** uninstall unused packages, delete unused assets and components (with the list sent to me).
4. **Data consolidation:** `src/data/projects.ts` and `src/data/skills.ts` built from the existing arrays, plus the Technical View fields. → *Show me the extracted fields for approval.*
5. **Design system and shell:** dual theme (dark default + light) with no-flash script, fonts, nav, layout container, section rhythm, landmarks, skip link.
6. **Sections:** Hero → About (Bento skills, certifications restyle) → Projects (Smart Cards) → Resume → Blog → Contact → Footer.
7. **Performance pass:** §4 in full (images, LCP, scroll handler, Scene3D, cursor, lazy sections, Framer audit).
8. **SEO and meta:** §5 (head tags, OG image, JSON-LD, robots, sitemap).
9. **Final verification:** Lighthouse mobile and desktop, before/after table, keyboard-only walkthrough, 375px / 768px / 1440px screenshots, certificates checklist from §3.

## 7. Definition of done

- [ ] Lighthouse (mobile, production build): Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100. If you can't reach a target, explain exactly why.
- [ ] CLS ≤ 0.01, LCP ≤ 2.0s (mobile simulated), TBT ≤ 150ms.
- [ ] Dark and light modes both fully styled, toggle works, no theme flash on load.
- [ ] No horizontal scroll at 320px–1920px.
- [ ] The whole page works with keyboard only, and reduced motion is respected.
- [ ] All 5 projects appear with Overview and Technical View, and nothing in either view is invented.
- [ ] The certifications section has identical data and behavior, restyled and still prominent.
- [ ] One `<h1>`, landmarks present, every image has explicit dimensions and alt text.
- [ ] OG and Twitter previews validated (share the debugger output or a screenshot of the rendered card).
- [ ] `npm run build` passes with zero new warnings, and a bundle size before/after table is provided.
- [ ] A short `CHANGELOG` section in the PR description listing every removed dependency, asset and component.
