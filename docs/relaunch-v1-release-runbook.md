# Kubernauts v1.0 — Same-day Release Runbook
Date: 2026-11-09
Branch: feat/enterprise-deep-tech-homepage
Owner sign-off: required before replacing kubernauts.de

## Current status
- New bilingual homepage, services, products, industry overview, manufacturing, banking & insurance, use cases, insights, careers, and legal pages are implemented in the feature branch.
- CI validates Astro build, SEO preview and release.
- GitHub Pages publication workflow is available at .github/workflows/pages.yml (only deploys main).
- The feature PR remains a draft; Pages not yet enabled; production DNS not changed.
- Editorial SEO allowlist is deliberately limited. Most additional routes will render with noindex until content is released. Do not confuse visible with indexed.
- No provider-side 301 redirect framework or complete GSC-based URL inventory exists.

## Critical blockers — explicitly sign off before public domain cutover
1. **Legal/privacy**: Both imprint pages still display a relaunch-draft note; privacy statements retain provider/retention/third-country review notes. Verify all details, including GitHub Pages hosting, third-country transfers, applicable agreements, GA/Ads/LinkedIn/OpenAI measurement tags and Calendly. The VAT data shown in code must match company documents. Do not remove review notes merely to hide them.
2. **Old URLs and paid traffic**: Before DNS cutover test HTTP 200 with correct content at /de/kubernauts-kubernetes-services/index.html (including query string and tracking), /de/contact.html, /de/datenschutz.html, /de/impressum.html, careers aliases, and valuable legacy industry / OpenKubes URLs. Any changed URL needs a planned server-side redirect or an exact static output path. GitHub Pages cannot configure arbitrary 301 rules.
3. **GitHub Pages availability**: Repository reported has_pages=false (2026-11-09). Admin must enable Settings → Pages → Build and deployment → Source: GitHub Actions.
4. **Launch workflow**: The Pages workflow is in the feature branch and runs on main or manual dispatch. Merge only after checks and confirmation; check deployed domain, 404, HTTPS and custom-domain validation.
5. **Indexability**: Review src/config/seo.ts and SITE_INDEXABLE=true. Many new content routes are not currently in the release allowlist and will remain noindex.

## Safe launch sequence
1. Pull feature branch, run npm ci && npm run build && npm run verify:seo; test locally DE/EN and mobile.
2. Review legal and ads destination, capture the current production site's complete URL inventory and current DNS records.
3. Enable GitHub Pages with GitHub Actions source; set custom domain only once cutover and routing are approved.
4. Review and mark PR #1 ready. Merge to main only with release sign-off.
5. Let .github/workflows/pages.yml publish dist, confirm success and inspect Actions environment URL.
6. Before switching public DNS, verify the deployed build, required relative/absolute asset paths, contact/Calendly, consent, and all key target pages; do not rely on local dev only.
7. Plan and execute DNS change using verified existing records; ensure www→apex HTTPS and GitHub Pages domain verification.
8. Immediately smoke test (HTTP 200, robots, sitemap, canonical, hreflang, conversion requests, mobile).
9. Retain previous hosting and a rollback procedure until monitoring is healthy; check GSC crawl/404 and Google Ads destinations.

## Required spot tests
- /, /de/, /en/
- /de/kubernauts-kubernetes-services/index.html
- /de/services/enterprise-ai-engineering/
- /de/kubernauts-kubernetes-services/sovereign-agentic-ai-operations/
- /de/industries/, /de/industries/industrial-manufacturing/, /de/industries/banking-and-insurance/
- /de/industries/use-cases-and-success-stories/
- /de/insights/, /de/insights/adrs-contracts/
- /de/careers/, /de/careers/keyaccount-manager/, /de/careers/sre-solution-architect/
- /de/datenschutz/, /de/impressum/, /en/privacy/, /en/imprint/
- /robots.txt, /sitemap.xml
- Query parameters on paid landing pages, mobile navigation and consent revisit

## Demo tomorrow
If domain cutover has unresolved blockers, show the local preview or an explicitly approved staging URL. Do not trade legal compliance, ads continuity or index preservation for a same-day DNS switch.
