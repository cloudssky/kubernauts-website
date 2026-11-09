# Kubernauts Relaunch — SEO & URL Migration Audit (working draft)

Audit date: 2026-11-08  
Scope: Astro PR #1 (`feat/enterprise-deep-tech-homepage`), published legacy URLs discoverable from the existing site and search.  
Status: **Pre-launch checklist, not launch authorization**. The live sitemap could not be retrieved in this audit. A complete crawl and Search Console export are still required.

## Critical finding: wrong static output paths — FIXED IN THIS BRANCH

Astro default `build.format: 'directory'` turns `src/pages/foo/index.html.astro` into `dist/foo/index.html/index.html`, not `dist/foo/index.html`.

GitHub Actions build output on 2026-11-08 demonstrated both errors:
- `/de/kubernauts-kubernetes-services/index.html/index.html` — **Google Ads final URL impact**.
- `/de/openkubes/openkubes-edge/index.html/index.html` — existing Edge URL impact.
- Corresponding `/en/` paths had the same issue.

Fixed: replace `index.html.astro` with `index.astro` in these four page locations. The output should now be `dist/**/index.html`. **Verify using the next GitHub Actions build logs and production HTTP requests**.

## URL decisions

| Legacy public path | Astro target / output path | Action | Status / caution |
|---|---|---|---|
| `/` | `/` | Replace old homepage with real homepage or redirect to `/de/` | BLOCKER: current `/` is a language-selection placeholder, `noindex` |
| `/de/home/` | `/de/` | 301 redirect at proxy/CDN | Missing redirect |
| `/de/` | `/de/` | Keep | Built |
| `/en/` | `/en/` | Keep | Built |
| `/de/contact.html` | `/de/contact/` | 301 redirect at proxy/CDN | Missing redirect |
| `/de/impressum.html` | `/de/impressum/` | 301 redirect at proxy/CDN | Verify legacy path |
| `/de/datenschutz.html` | `/de/datenschutz/` | 301 redirect at proxy/CDN | Missing redirect |
| `/de/kubernauts-kubernetes-services/index.html` | exact same path | Keep, no redirect, Google Ads final URL | CRITICAL: static-path bug fixed; verify HTTP 200 |
| `/de/kubernauts-kubernetes-services/` | `/de/kubernauts-kubernetes-services/index.html` | Existing directory path should serve index.html as normal static hosting | Verify HTTP 200 |
| `/de/kubernauts-kubernetes-services/platform-engineering/` | same | Keep | Built |
| `/de/kubernauts-kubernetes-services/ai-mlops-services/` | same | Keep | Built; confirm actual legacy slug |
| `/de/kubernauts-kubernetes-services/cloud-native-transformation/` | same | Keep | New service page |
| `/de/kubernauts-kubernetes-services/24x7-support-und-managed-operations/` | TBD | Preserve legacy landing or add proper 301 to comprehensive operations page | Not in menu; URL MUST NOT become 404 |
| `/de/openkubes/` | TBD | Preserve with a dedicated OpenKubes overview or 301 to matching overview | Currently missing |
| `/de/openkubes/sovereign-platform/` | TBD | Preserve core sovereign positioning and relevant SEO value | Currently missing |
| `/de/openkubes/openkubes-anywhere/` | TBD | Preserve Anywhere content or consolidate with matching hub | Currently missing |
| `/de/openkubes/openkubes-ai/` | `/de/openkubes/inhouse-ai/` | 301 redirect preferred | Currently serves duplicate content with canonical; not 301 |
| `/de/openkubes/inhouse-ai/` | same | Keep | Built |
| `/de/openkubes/openkubes-edge/index.html` | exact same path | Keep | Static-path bug fixed; verify HTTP 200 |
| `/de/openkubes/bare-metal-kubernetes-platform/index.html` | same directory index.html | Keep | Built |
| `/de/openkubes/openkubes-robotics-platform/` | same | Keep | Built |
| `/de/openkubes/openkubes-enterprise-kubernetes-security-framework/` | same | Keep | Built |
| `/de/products/` | same | New overview | Built |
| `/de/products/bare-metal/` | canonical points to legacy Bare Metal | Treat as alias or consolidate with single canonical | Duplicate content |
| `/de/products/robotics/` | canonical points to legacy Robotics | Treat as alias or consolidate with single canonical | Duplicate content |
| `/de/products/security/` | canonical points to legacy Security | Treat as alias or consolidate with single canonical | Duplicate content |
| `/de/careers/` and role pages | TBD | Preserve indexed jobs, redirect to active role pages or retire with 410 after review | Missing |
| `/de/training/` | TBD | Preserve, migrate, or redirect to current training offering | Missing |
| `/en/` legacy subpages | matching `/en/` routes | Repeat path-level audit for English | Partial only |

## Must-do checks before replacing production

1. **Google Ads**: verify real 200 response at `https://kubernauts.de/de/kubernauts-kubernetes-services/index.html`, functional booking, consent-dependent Google tag / conversions, and no redirected final URL surprises.
2. **Complete legacy URL inventory**: export all indexed/linked URLs from Google Search Console plus old CMS sitemap and crawl. The public sitemap and robots.txt were not retrievable through the current inspection path.
3. **Redirect delivery**: GitHub Pages alone cannot issue custom HTTP 301 rules. Plan a compatible edge layer (CloudFront/Cloudflare or existing ingress) for old `.html`, Careers, Training, and consolidated product URLs; choose explicitly before cutover.
4. **Indexability**: `BaseLayout.astro` currently sets `<meta name="robots" content="noindex,follow" />` and `src/pages/index.astro` is also noindex. Keep noindex on preview; remove or replace at launch after approvals.
5. **Sitemap + robots**: configure `@astrojs/sitemap` (or equivalent), include canonical pages only, ensure robots policy and Search Console submission. Current `astro.config.mjs` only configures site + static output.
6. **Canonical/hreflang**: `BaseLayout.astro` emits hreflang only when `canonicalPath` is omitted. Add per-page DE/EN alternates on the production templates.
7. **URL canonical consistency**: prefer one canonical per item and 301 for aliases when feasible. The existing product aliases and old OpenKubes AI path currently render duplicate content.
8. **Link QA**: check internal links, all DE/EN language switch links, nav anchors, external links, 404s, Calendly and meetup. Confirm there are no references to a removed URL.
9. **Consent & tracking**: test reject/accept/preferences plus deferred execution, and confirm tags actually run only after appropriate consent. Cookie UI alone is not sufficient.
10. **Mobile, accessibility, performance**: responsive walkthroughs, keyboard focus for dropdowns, heading hierarchy, alt text, Core Web Vitals, image compression.
11. **Legal & brand assets**: review imprint/privacy language and ownership/rights of legacy slider assets before production.
12. **Launch**: GitHub Pages custom domain and HTTPS, DNS strategy, cache behavior, rollback, post-launch 404/search traffic monitoring.

## Notes and limitations

- Product detail pages for Bare Metal, Robotics and Security currently have both `/products/` and legacy `/openkubes/` variants; canonical metadata points to legacy targets. Keep one canonical version and plan permanent redirects for duplicates when CDN routing is available.
- The English routes need a separate inventory against the old site; simply mirroring German slugs does not prove the old English URLs match.
- An Astro *successful build* proves compilation, **not** production URL correctness. Read route-generation logs and verify actual output paths.
- Keep current `noindex` for preview until production readiness and explicit launch go-ahead.
