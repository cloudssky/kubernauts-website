# Kubernauts Relaunch — SEO & Content Migration Audit
**Stand:** 2026-11-09  
**Repository:** `cloudssky/kubernauts-website`  
**Branch / revision:** `feat/enterprise-deep-tech-homepage` / `77ac211182f511eb85fae1cf2320685caac8fffb`  
**Status:** **Vorläufiger, evidenzbasierter Audit – kein Launch-Go.**  

> **Method:** Vergleich des Astro-Repositories (GitHub-Tree, SEO-Konfiguration, Komponenten/Routes) mit öffentlich auffindbaren Legacy-Seiten auf `kubernauts.de`. Die vollständige Legacy-Sitemap, ein HTTP-Crawl aller Pfade, GSC-Export, Ads-Metriken, Backlinks und aktuelle HTTP-Statuscodes liegen **nicht** vor. Öffentliche Suchtreffer belegen Existenz/Inhalt einer URL, nicht deren Ranking oder Traffic. Keine erfundenen Traffic- oder Rankingzahlen.

## Executive Summary

- **Hoch:** Das aktive Google-Ads-Ziel `/de/kubernauts-kubernetes-services/index.html` muss exakt erhalten bleiben. Astro generiert dafür `dist/de/kubernauts-kubernetes-services/index.html`; endgültiges HTTP-200-Verhalten erst auf dem Zielhosting verifizieren. EN ebenfalls prüfen.
- **Hoch:** Mehrere öffentlich sichtbare Legacy-Inhalte fehlen als eigenständige Routes (24x7 Support, Branchen, Use Cases, Training, Careers, Präsentationen/Whitepaper, Sovereign Agentic AI Operations).
- **Hoch:** `SITE_INDEXABLE` ist standardmäßig aus. Der Release-SEO-Allowlist umfasst bewusst nur **14 URLs / 7 Sprachpaare**; andere existierende Seiten bleiben auch bei Release `noindex`. Das schützt vor verfrühter Indexierung, kann beim Cutover aber organische Sichtbarkeit wichtiger Legacy-Landingpages entfernen.
- **Hoch:** Für geänderte Legacy-.html-Pfade ist kein serverseitiger Redirect-Mechanismus konfiguriert. GitHub Pages allein ermöglicht keine frei definierbaren HTTP-301-Regeln.
- **Mittel:** Canonicals/Hreflang sind für die initiale Allowlist aufgesetzt; neue, noch nicht freigegebene Routes haben nicht durchgehend redaktionell geprüfte DE/EN-Paare.
- **Mittel:** Consent-UI existiert, aber Analytics-/Ads-Tags und ihre technisch nachgewiesene Freigabe bzw. Conversion-Messung sind nicht nachgewiesen. Cookie-Einwilligung ≠ funktionierende Marketing-Messung.
- **Mittel:** Root `/` ist derzeit eine `noindex`-Sprachauswahl; die bestehende `/`-Homepage besitzt eine andere Inhaltsfunktion. Root-Strategie vor Migration festlegen.

## 1. Technische SEO-Bestandsaufnahme (Quellcode-verifiziert)

| Bereich | Befund | Maßnahme / Gate |
|---|---|---|
| Static output | Astro `output:'static'`; generierte `index.html`-Dateien | Staging-HTTP-Smoke-Test für alle Pfade und Slash-Varianten |
| Preview indexability | `BaseLayout.astro`: `noindex,follow`, solange `SITE_INDEXABLE` nicht `true` | Beibehalten bis Freigabe |
| Release indexability | `src/config/seo.ts`: 14 indexierbare Pfade, 7 DE/EN-Paare | Vor Launch mit tatsächlicher Content-Migrationsfreigabe erweitern |
| Sitemap | `src/pages/sitemap.xml.ts`: explizite SEO-Allowlist; leer in Preview | Release-Sitemap nach Freigabe auf Vollständigkeit prüfen |
| Robots | `src/pages/robots.txt.ts`: Preview `Disallow: /`; Release `Allow: /` | Deploy-Artefakt explizit in Release-Mode testen |
| Canonicals | `BaseLayout.astro` benutzt `canonicalPath` oder Sprach-Homepage | Canonical je Page gegen physische Route und SEO-Entscheidung prüfen |
| Hreflang | `src/config/seo.ts` enthält Allowlist-Alternates und Legal-Paare | Jede neue DE/EN-Paarung prüfen, keine falschen Gegenstücke |
| Structured data | `Organization` und `WebSite` JSON-LD auf DE-/EN-Homepages | Tatsächliche Firmenangaben kontrollieren; Article/Service/FAQ erst bei sachlicher Eignung |
| SEO tests | `scripts/verify-seo.mjs` prüft 14 URLs, noindex, Sitemap, Titles, Alternates | URL-Crawler und vollständige Link-/HTTP-Tests zusätzlich erforderlich |
| Legal | Impressum/Privacy bleiben auch bei Release `noindex` | Inhalt juristisch abnehmen; Indexierungsentscheidung separat |
| Consent | `ConsentManager.astro` mit Analytics-/Marketing-Auswahl | Keine Tags ohne aktives Opt-in; echten Tag-/Conversion-Test nachrüsten |
| Hosting redirects | Keine bestätigte 301-Lösung für Altpfade | CDN/Edge-Redirects oder exakte Pfaderhaltung als Launch-Blocker |
| Root | `src/pages/index.astro`: `noindex` Sprachauswahl | Root `/` auf DE-Landing lenken oder vollwertig gestalten; Canonical festlegen |

### Aktuelle Release-Index-Whitelist (14 URLs)

Sprachpaare: `/`, `/kubernauts-kubernetes-services/index.html`, `/kubernauts-kubernetes-services/platform-engineering/`, `/kubernauts-kubernetes-services/ai-mlops-services/`, `/kubernauts-kubernetes-services/cloud-native-transformation/`, `/openkubes/`, `/contact/` — jeweils unter `/de` und `/en`. Das ist eine **bewusste Initialfreigabe, keine vollständige Abbildung der Legacy-Präsenz**. Siehe `src/config/seo.ts` und `docs/SEO-RELEASE-CHECKLIST.md`.

## 2. URL-/Content-Migration-Matrix: priorisierte, belegte Legacy-Pfade

**Status-Legende:** `KEEP` exakten Pfad behalten; `MIGRATE` relevanten Inhalt neu aufbauen/Route hinzufügen; `REVIEW` URL, Business-Status und Suchnachfrage prüfen; `301` erst nach festgelegter Zielseite und technischer Redirect-Implementierung. Ein existierender Astro-Pfad ist **nicht automatisch in der Release-Allowlist**.

| Priorität | Legacy-URL | Neuer Status/Ziel | Empfehlung |
|---|---|---|---|
| P0 | `/` | `/` aktuell Sprachauswahl | Root-Homepage/Redirect-Strategie entscheiden; vermeiden, dass Nutzer und Suchmaschinen auf dünne Auswahlseite fallen |
| P0 | `/de/` | Vorhanden; allowlisted | KEEP, Inhalte/SEO prüfen |
| P0 | `/en/` | Vorhanden; allowlisted | KEEP |
| P0 | `/de/kubernauts-kubernetes-services/index.html` | Vorhanden; allowlisted | **KEEP exakt**: Ads-Final-URL, Booking und Conversion testen |
| P0 | `/en/kubernauts-kubernetes-services/index.html` | Vorhanden; allowlisted | KEEP, Status/Content prüfen |
| P0 | `/de/kubernauts-kubernetes-services/` | Gleiche Directory-Indexdatei | Für direktes HTTP-200 und einheitlichen Canonical prüfen |
| P0 | `/de/kubernauts-kubernetes-services/platform-engineering/` | Vorhanden; allowlisted | KEEP, alte technische Tiefe (GitOps, Observability, Workloads) bewahren |
| P0 | `/de/kubernauts-kubernetes-services/ai-mlops-services/` | Vorhanden; allowlisted | KEEP, Private AI, GPU, Edge AI, Model Ops berücksichtigen |
| P1 | `/de/kubernauts-kubernetes-services/24x7-support-und-managed-operations/` | **Route fehlt** | **MIGRATE** eigene Managed Ops-/24×7-Seite oder begründeter 301 auf inhaltlich äquivalente Ops-Landingpage; keine pauschale Homepage-Weiterleitung |
| P1 | `/de/industries/` | **Route fehlt**; Legacy zeigt Insurance-Inhalte | REVIEW **ungewöhnlicher Slug**: echte Insurance-Seite oder Branchen-Hub? In jedem Fall nicht auf 404 fallen lassen |
| P1 | `/de/industries/industrial-manufacturing/` | **Route fehlt** | MIGRATE Fertigungsindustrie & Industrial Edge |
| P1 | `/de/industries/banking-and-insurance/index.html` | **Route fehlt** | MIGRATE Banking/Insurance, separate Intention prüfen |
| P1 | `/de/industries/use-cases-and-success-stories/` | **Route fehlt** | MIGRATE Case-Study-Hub; Referenzen, Kennzahlen und Kundenzitate nur mit Beleg/Einwilligung |
| P1 | `/de/openkubes/` | Vorhanden; allowlisted | KEEP, Produkt-Hub und interne Links |
| P1 | `/de/openkubes/sovereign-platform/` | Vorhanden; **nicht allowlisted** | Redaktionsprüfung + Releasefreigabe prüfen |
| P1 | `/de/openkubes/openkubes-anywhere/` | Vorhanden; nicht allowlisted | KEEP inkl. Whitepaper-CTA |
| P1 | `/de/openkubes/openkubes-edge/index.html` | Physisch als Directory-Index; nicht allowlisted | Exact-URL/Canonical prüfen, Index-Freigabe nach Content-Review |
| P1 | `/de/openkubes/openkubes-robotics-platform/` | Vorhanden; nicht allowlisted | KEEP, Content-Review / Releasefreigabe |
| P1 | `/de/openkubes/openkubes-ai/` | Vorhanden, Canonical `/de/openkubes/inhouse-ai/` | Doppelcontent-Strategie: bevorzugt 301 nach vollständigem Inhaltsvergleich; bis dahin canonical/Indexierung prüfen |
| P1 | `/de/openkubes/sovereign-agentic-ai-operations/` | **Route fehlt** | MIGRATE, Positionierung gegenüber Kubernautic und OpenKubes klar abgrenzen |
| P1 | `/.galleries/downloads/OpenKubes-Anywhere-Whitepaper_DE.pdf` | **Datei nicht im Astro-public Tree gefunden** | Datei/Downloadziel sichern; alten PDF-Pfad exakt bewahren oder 301 auf identisches PDF |
| P1 | `/.galleries/downloads/OpenKubes-Anywhere-Whitepaper_EN.pdf` | **Datei nicht im Astro-public Tree gefunden** | Wie DE |
| P2 | `/de/training/` | **Route fehlt** | REVIEW bestehendes Angebot und Suchintention; ggf. Kurs-Seite erhalten |
| P2 | `/de/careers/` | **Route fehlt** | REVIEW: Stellenstatus prüfen, aktuelle Jobs migrieren oder gezielt 410/301 |
| P2 | `/de/careers/keyaccount-manager/` | **Route fehlt** | REVIEW aktuelle Ausschreibung |
| P2 | `/de/careers/kubernetes-platform-engineer/` | **Route fehlt** | REVIEW aktuelle Ausschreibung |
| P2 | `/de/careers/lead-devops-engineer/` | **Route fehlt** | REVIEW aktuelle Ausschreibung |
| P2 | `/en/careers/` | **Route fehlt** | REVIEW Sprach-/Job-Paarung |
| P2 | `/en/openkubes/OpenKubes-Presentation.html` | **Route fehlt** | REVIEW Präsentation und Link-/Backlink-Wert, ggf. statisch erhalten |
| P1 | `/de/contact.html` | `/de/contact/` vorhanden | Nach Status-/Linkprüfung 301 |
| P1 | `/de/impressum.html` | `/de/impressum/` vorhanden | Legal QA; 301 falls Altpfad genutzt |
| P1 | `/de/datenschutz.html` | `/de/datenschutz/` vorhanden | Legal QA; 301 nach Cutover |
| P2 | `/de/products/` und Produktdetailrouten | Neu, weitgehend nicht allowlisted | Redaktionsprüfung der Product-Hubs; Alias-/Canonical-Konzept |
| P2 | `/de/kubernautic/` | Neu, nicht allowlisted | Product-Marketing-Strategie/Indexfreigabe bewusst entscheiden |

**Englische Seiten:** Für viele Old-Site-Routes existieren englische Pendants, aber die Legacy-Slug-Struktur ist nicht überall identisch. Keine automatische DE→EN-Abbildung ohne URL-Inventar. Der bisherige Indexfund `/en/openkubes/openkubes-robotics-platform/index.html` zeigt, dass auch explizite `index.html`-Varianten relevant sein können.

### Zusätzlich entdeckte wertvolle Inhaltsgruppen

- **Support/Managed Operations:** eigene Leistungsintention, 24×7-Betrieb, Incident Response, Hardening, Upgrades und SLA-Modelle.
- **Vertikale Landingpages:** Insurance, Banking, Manufacturing; separate Search Intent gegenüber allgemeinen Branchen-Karten der neuen Homepage.
- **Cases/Proof:** vorhandene Use-Case-Seite; Aussagen zu Erfolgen und Ergebnissen einzeln verifizieren.
- **Learning/Community/Recruiting:** Trainings, Meetup, Jobs; bei aktiven Angeboten eigene URLs statt pauschale Weiterleitungen.
- **Downloads:** Whitepaper-DE/EN sind separat verlinkbare und potenziell indexierte Ressourcen.
- **Agentic AI:** OpenKubes Sovereign Agentic AI Operations ist nicht identisch mit der neuen Kubernautic-Produktseite; strategische Content-Zuordnung nötig.

## 3. Content Gap und Qualitätsbeurteilung

| Thema / Search Intent | Legacy-Substanz | Relaunch-Stand | Lücke / Entscheidung |
|---|---|---|---|
| Kubernetes Beratung | Operations und Platform Engineering | Dedizierte Consulting-Seite mit CTA/FAQ | Am wichtigsten: Ads, HTTP-200, gleiche Intention und Conversion |
| Platform Engineering | GitOps, Observability, Lifecycle, Multi-Cluster | Vorhandene SEO-Landingpage | Technische Tiefe vergleichen; nicht nur Karten-/Marketing-Text |
| 24×7 Kubernetes Support | Eigenständige detaillierte Leistungsseite | Nur Ops-Kontext | Eigenständige URL/Content fehlt |
| AI & MLOps | Kubernetes+GPU, Private AI, Edge AI, Robotics | Landingpage vorhanden | Technologie-/Betriebsdetails verifizieren |
| Industries | Mehrere branchenspezifische Seiten | Sechs Homepage-Karten, keine Branchenunterseiten | Große Lücke: Search Intent und Deep Content |
| Use Cases & Success Stories | Mehrere Branchenfälle | Nur allgemeine Marketingaussagen | Referenzen/Proof bzw. redaktionell korrekt gekennzeichnete illustrative Use Cases |
| OpenKubes | Produktfamilie, Anywhere, Edge, Security, Robotics | Viele Detailseiten vorhanden | Inhaltserhalt, Indexfreigabe, PDF-Links und Aliase prüfen |
| Training/Careers | Aktive Landingpages / spezifische Jobs | Fehlt | Business-Entscheidung und Migrationspfad |
| Whitepapers | Direkt abrufbare PDF-Assets | Fehlt im public Tree | Pfade/Assets unbedingt sichern |
| Product AI | Neues Kubernautic + ältere Agentic-AI-Inhalte | Neue Produktseite vorhanden | Klare interne Verlinkung ohne Themen-Kannibalisierung |

## 4. Konkrete SEO-/Launch-Blocker

1. **Ads-Zielseiten-Gate:** Live/Staging HTTP 200 und Renderings für alle bekannten Originalpfade, insbesondere `/de/kubernauts-kubernetes-services/index.html`. Test: Buttons zu Calendly, Query-Parameter (`gclid`, `utm_*`) und Conversion-Signal mit/ohne Consent.
2. **Source-of-truth URL-Inventar:** Live-Sitemap/CMS-Export + Search Console `Pages` und `Performance → Pages` + ggf. Ads-Zielseitenbericht zusammenführen. Diese Daten liegen im aktuellen Audit nicht vor.
3. **Redirect-Matrix:** Pro Legacy-URL `KEEP 200`, `301 exact semantic destination`, `410 retired` oder `HOLD`. Auf CDN/Edge oder anderem HTTP-Host umsetzen; clientseitige JS-Redirects sind kein Ersatz für 301.
4. **Editorial index allowlist:** Nicht mit nur 14 freigegebenen Seiten deployen, solange weitere umsatz-/traffic-relevante Inhalte noch nicht migriert oder mit genehmigten Redirects versehen sind.
5. **Root und Language:** Root-Status, `www`↔apex, `/de/home/`, Sprachwechsel und Hreflang mit realen 200/301-Antworten testen.
6. **Rechts- und Consent-Freigabe:** Impressum/Datenschutz aktuell und juristisch geprüft; echte Tag-Ladung/Blockierung inkl. Consent-Änderung, nicht nur Modal testen.
7. **Files/Downloads:** Whitepapers und historische Downloads im neuen Hosting verfügbar machen oder gezielt umleiten.
8. **Release QA:** Controlled `SITE_INDEXABLE=true` Build, automatisierter Dist-/Links-Crawl, 404-Page, mobile Accessibility/Lighthouse; anschließend DNS/Rollback-Plan.
9. **Post-Launch:** GSC Crawl/Index, 404/Redirect-Logs, Ads-Conversion-Signale und Seitenperformance überwachen.

## 5. Empfohlener Arbeitsplan

### Sprint A – SEO-Sicherung vor neuen Inhalten (P0)
- GSC + CMS-Sitemap exportieren, alle gefundenen URLs normalisieren; Search Impressions, Clicks und Conversions priorisieren.
- Ads-Zielseiten für jeden Search/Display-Ad anhand finaler URL/HTTP/Tagging nachprüfen.
- CDN-/Redirect-Option beschließen; Root-Homepage und Slash-Policies definieren.
- DE/EN-CMS-/PDF-Ressourcen archivieren.

**Definition of Done:** Vollständiger URL-Report mit Status, Indexability, Ziel und Eigentümer; technisch dokumentierte 301-/200-Strategie.

### Sprint B – Content Migration (P1)
- 24×7 Operations-Seite; Manufacturing + Banking/Insurance + Industries-Hub; Use-Case-Hub.
- Sovereign Agentic AI Operations, Whitepapers, Training/Careers nach Business-Freigabe.
- Details und DE/EN-Links gegen historische Texte prüfen; keine unbelegten Ergebnis-/Referenzzahlen.
- Canonicals, Alternates und freigegebene Release-Allowlist im selben PR aktualisieren.

**Definition of Done:** Alle priorisierten Legacy-URLs bedienen passende Inhalte oder genehmigte serverseitige Redirects.

### Sprint C – Release Validation (P0/P1)
- `npm run build && npm run verify:seo` im Preview und `SITE_INDEXABLE=true npm run build && SITE_INDEXABLE=true npm run verify:seo` separat.
- Staging/Production HTTP-Spider: Redirect-Chains, relative Links, Assets, Canonicals, hreflang, noindex, Sitemap, 404.
- Mobile, keyboard, Core Web Vitals, Calendly-/Consent-/Conversion-Smoke-Test.
- Relaunch mit Rollback-Runbook; GSC-Sitemap und Monitoring.

**Definition of Done:** Freigegebener SEO-Release, keine ungeklärten P0-Pfade und nachgewiesene Ads-Funktion.

## 6. Nachweis / Quellen

### Repository (2026-11-09)
- `src/config/seo.ts`, `src/layouts/BaseLayout.astro`, `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`, `scripts/verify-seo.mjs`, `astro.config.mjs`
- `docs/relaunch-url-seo-audit.md` (historischer Entwurf vom 2026-11-08; einige damalige „fehlenden“ OpenKubes-Routes wurden seitdem implementiert)
- GitHub Tree of `feat/enterprise-deep-tech-homepage` at `77ac211182f511eb85fae1cf2320685caac8fffb`.

### Öffentliche Legacy-Belege (nicht vollständiger Crawl)
- https://kubernauts.de/de/kubernauts-kubernetes-services/
- https://kubernauts.de/de/kubernauts-kubernetes-services/24x7-support-und-managed-operations/
- https://kubernauts.de/de/kubernauts-kubernetes-services/platform-engineering/
- https://kubernauts.de/de/kubernauts-kubernetes-services/ai-mlops-services/
- https://kubernauts.de/de/industries/
- https://kubernauts.de/de/industries/industrial-manufacturing/
- https://kubernauts.de/de/industries/banking-and-insurance/index.html
- https://kubernauts.de/de/industries/use-cases-and-success-stories/
- https://kubernauts.de/de/openkubes/openkubes-anywhere/
- https://kubernauts.de/de/openkubes/openkubes-edge/index.html
- https://kubernauts.de/de/openkubes/sovereign-platform/
- https://kubernauts.de/de/openkubes/sovereign-agentic-ai-operations/
- https://kubernauts.de/de/careers/
- https://kubernauts.de/de/training/
- https://kubernauts.de/.galleries/downloads/OpenKubes-Anywhere-Whitepaper_DE.pdf
- https://kubernauts.de/.galleries/downloads/OpenKubes-Anywhere-Whitepaper_EN.pdf

### Audit-Grenzen
Websuch-Ergebnisse zeigen auffindbare URLs und Inhalt, liefern aber weder vollständige Crawldaten noch Search Console, HTTP-Header, interne Analytics oder Ads-Conversions. Das alte `/sitemap.xml` und `/robots.txt` waren in der verfügbaren Leseumgebung nicht abrufbar. Die Einstufung „Route fehlt“ basiert auf dem vollständigen Repo-Tree; Status `200`/`301` auf der künftigen Live-Domain ist damit **nicht** bestätigt.

## Editorial decisions recorded after audit (2026-11-09)

These decisions supersede migration recommendations above where they differ.

- **24×7 Managed Operations:** **Do not migrate as a separate sales/service page.** Do not promise a blanket 24×7 SLA. Preserve the legacy URL in the redirect/retirement inventory and determine suitable 301 vs 410 based on search/links/contractual reality.
- **Sovereign Agentic AI Operations:** approved as a fifth **Service**, explicitly not under Products. Added DE/EN pages at `/{lang}/kubernauts-kubernetes-services/sovereign-agentic-ai-operations/` and linked in Services navigation. The original `/de/openkubes/sovereign-agentic-ai-operations/` still needs an explicit redirect decision at launch.
- **Careers:** publish **only** Key Account Manager and SRE Solution Architect. DE careers hub and full German descriptions added at `/de/careers/`, `/de/careers/keyaccount-manager/`, and `/de/careers/sre-solution-architect/`. The legacy `/de/careers/keyaccount-manager/index.html` maps to the static index file under the same directory; final HTTP verification remains necessary.
- **Other legacy jobs:** Kubernetes Engineer, Lead DevOps Engineer and other advertisements should not be carried into the new jobs overview. Their historic URLs require a case-by-case 301/410 decision.
- **Language coverage:** `/en/careers/` lists the positions in English and links to the approved German job descriptions. Full translated English role pages were **not** invented.
- **Indexing:** No production allowlist expansion until content, legal, language parity and redirect plan are reviewed. The new pages currently build as noindex under existing policy.
