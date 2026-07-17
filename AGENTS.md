# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Overview

Personal website for Zachary Leong (zacharyleong.com), built on Astro 4 with the [`brutal`](https://github.com/eliancodes/brutal) template as a starting point. Static site, deployed from `dist/`. The style is brutalism.

## Commands

```bash
pnpm dev       # local dev server (astro dev)
pnpm build     # astro check (typecheck) + astro build
pnpm preview   # serve built site
```

`package.json` declares `packageManager: pnpm@8.6.0`, but a `bun.lockb` is also present and more recently updated — prefer `pnpm` to stay consistent with the declared manager unless the user says otherwise.

There is no test suite and no lint script wired up (eslint/prettier are installed but not exposed via `pnpm` scripts).

## Architecture

- **Astro + UnoCSS + MDX.** `astro.config.ts` registers `sitemap`, `UnoCSS({ injectReset: true })`, and `mdx`. Styling is utility-first via UnoCSS (`uno.config.ts`); there is no Tailwind.
- **Content collection drives "projects".** `src/content/config.ts` defines a single `blog` collection (despite the name, these render as project pages). Schema requires `title`, `author`, `tags`, `description`, `pubDate`, `imgUrl` (resolved via Astro's `image()` helper), and optional `draft` / `externalLink`.
- **Routing.** `src/pages/projects/[slug].astro` calls `getCollection('blog')` and renders each entry. `.mdx` entries are wrapped in `layouts/BlogPost.astro`; plain `.md` entries render their own layout (set in frontmatter). `src/pages/projects/tags/[tag].astro` generates per-tag indexes. `feed.xml.js` produces the RSS feed.
- **OG image generation.** `src/pages/v1/generate/og/[slug].png.ts` and `default.png.ts` render Open Graph PNGs at build time using `satori` + `satori-html` + `@resvg/resvg-js`. The resvg native module is excluded from Vite's `optimizeDeps` (see `astro.config.ts`) — keep it that way.
- **Layouts.** `Default.astro` is the page shell; `BlogPost.astro` wraps MDX project entries; `ExternalLink.astro` is used for entries whose `externalLink` redirects offsite.
- **Components** are grouped by area under `src/components/{home,projects,layout,generic,errors}`. The `@eliancodes/brutal-ui` package supplies the base "brutalist" UI primitives.
- **Unpublished content** lives in `src/content/unpublished/` and is intentionally outside the `blog` collection so it doesn't get built.

## Video components

`Video.astro` (`@components/generic/Video.astro`) embeds videos from YouTube, Vimeo, or local files. Key props:

- `src` — URL (YouTube/Vimeo) or path (local `.mp4`).
- `maxWidth` — constrains width; the video is always centered horizontally.
- `aspectRatio` — CSS aspect-ratio string, default `16 / 9`.
- `lazy` (default `true`) — for embeds, shows a thumbnail + play button; click loads the iframe.
- `autoplayVisible` — uses `IntersectionObserver` to autoplay when scrolled into view (pauses when out of view for local files; loads iframe on first visibility for embeds). Mutually exclusive with `lazy` thumbnail behavior.
- `background` — shorthand that sets autoplay + loop + muted + no controls.
- `caption` — wraps in `<figure>/<figcaption>`.

Every `<Video>` is wrapped in a `.content-video-wrap` flex container that centers it.

`VideoRow.astro` (`@components/generic/VideoRow.astro`) places multiple `<Video>` components side by side. Props: `gap` (default `1rem`). Example:

```mdx
import Video from '@components/generic/Video.astro';
import VideoRow from '@components/generic/VideoRow.astro';

<VideoRow>
  <Video src="/videos/a.mp4" />
  <Video src="/videos/b.mp4" />
</VideoRow>
```

## Image components

### Unified lightbox (`ImageLightbox.astro`)

Custom zoom modal shared by `RoundedImage` and `ImageCarousel`. No external dependencies (replaces previous medium-zoom CDN usage).

- **API:** `window.__lightbox.open(imgElement)` / `window.__lightbox.close()`
- **Auto-wire:** Any `<img data-zoomable>` gets click-to-zoom automatically via event delegation.
- **Dismiss:** Click overlay/image, press Escape, or scroll (wheel event).
- The script self-guards — including `<ImageLightbox />` multiple times is safe.

### `RoundedImage.astro`

Single image with optional caption. Click-to-zoom via the unified lightbox.

- `src`, `alt`, `maxWidth`, `caption`, `loading`, `decoding`, `class`
- Adds `data-zoomable` to the `<img>` so the lightbox handles it.

### `ImageCarousel.astro`

Multi-image carousel with fade/slide transitions. Click any slide to open in the unified lightbox.

- `images` (array of `{ src, alt, caption? }`), `transition` (`'fade'` | `'slide'`), `autoplay`, `autoplaySpeed`, `aspectWidth`, `aspectHeight`, `theme` (`'light'` | `'dark'`)
- Keyboard navigation (arrow keys), dot indicators, prev/next arrows.

### `ImageGallery.astro`

Multi-image gallery using lightGallery for its own lightbox (separate from the unified lightbox — provides multi-image navigation with thumbnails).

- `images` (array of `{ src, alt?, thumb?, width?, height?, aspectRatio? }`)
- `layout`: `'grid'` (default, justified Google Photos style), `'horizontal'` (single scrollable row), `'vertical'` (stacked column)
- `caption`, `objectFit` (`'cover'` | `'contain'`), `galleryId`, `aspectRatio`
- On small screens (`<500px`), grid layout stacks items vertically with rounded corners only on first/last items.

### Caption styling

All components share global CSS variables `--caption-color` and `--caption-font-size` (defined in `:root` in `global.css`). The global `figcaption` rule uses these variables. Component-specific caption styles (`carousel-caption`, `gallery-caption`) also reference them for consistency.

## Adding a project entry

Create `src/content/blog/<slug>.{md,mdx}` with frontmatter matching the schema in `src/content/config.ts`. `imgUrl` must point to a local image file (it goes through Astro's image pipeline). Set `draft: true` to keep it out of listings, or `externalLink` to redirect to an offsite URL.
