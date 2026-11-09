# Kubernauts Corporate Website

Enterprise + Deep Tech redesign prototype for **kubernauts.de**, owned by Clouds Sky GmbH.

## Stack
- Astro 5 (static output)
- Vanilla CSS (no JavaScript framework needed for the homepage)
- GitHub Actions for build validation
- German and English pages under `/de/` and `/en/`

## Local development

Requires Node.js 22.

```bash
npm install
npm run dev
npm run build
```

Open `http://localhost:4321/de/` or `http://localhost:4321/en/`.

## Preview status

**Not ready for production.** The current site is a visual proof of concept. Its pages deliberately use `noindex` to avoid preview duplicates. There is **no automatic Pages deployment** and no change to production DNS.

Before launch: migrate current SEO URLs (especially Google Ads landing pages), replace placeholder mark with approved branding, add legal/privacy pages, accessibility and responsive QA, verify copy/contact address, add analytics with consent handling, generate sitemap, and set up redirect rules and production deployment.

## Architecture

- `src/pages/de` and `src/pages/en`: bilingual homepages
- `src/layouts/BaseLayout.astro`: shared SEO metadata and layout
- `src/styles/global.css`: reusable visual styles
- `public/favicon.svg`: temporary brand symbol
- `.github/workflows/ci.yml`: build validation

We will preserve existing URLs wherever practical; production DNS will remain untouched until a reviewed migration plan is approved.
