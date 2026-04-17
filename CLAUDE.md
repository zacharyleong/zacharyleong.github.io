# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website for Zachary Leong (zacharyleong.com), built on Astro 4 with the [`brutal`](https://github.com/eliancodes/brutal) template as a starting point. Static site, deployed from `dist/`.

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

## Adding a project entry

Create `src/content/blog/<slug>.{md,mdx}` with frontmatter matching the schema in `src/content/config.ts`. `imgUrl` must point to a local image file (it goes through Astro's image pipeline). Set `draft: true` to keep it out of listings, or `externalLink` to redirect to an offsite URL.
