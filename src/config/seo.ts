/**
 * Single source of truth for the initial editorial SEO release.
 * Seven primary content routes in two languages = 14 approved pages.
 * Legal pages exist but stay noindex. Legacy/experimental routes are retained
 * temporarily for link and redirect analysis and must NOT enter the sitemap.
 */
export const seoOrigin = 'https://kubernauts.de';
export const editorialPagePairs = [
  { de: '/de/', en: '/en/' },
  { de: '/de/kubernauts-kubernetes-services/index.html', en: '/en/kubernauts-kubernetes-services/index.html' },
  { de: '/de/kubernauts-kubernetes-services/platform-engineering/', en: '/en/kubernauts-kubernetes-services/platform-engineering/' },
  { de: '/de/kubernauts-kubernetes-services/ai-mlops-services/', en: '/en/kubernauts-kubernetes-services/ai-mlops-services/' },
  { de: '/de/kubernauts-kubernetes-services/cloud-native-transformation/', en: '/en/kubernauts-kubernetes-services/cloud-native-transformation/' },
  { de: '/de/openkubes/', en: '/en/openkubes/' },
  { de: '/de/contact/', en: '/en/contact/' },
] as const;

export const seoApprovedPaths: ReadonlySet<string> = new Set(editorialPagePairs.flatMap(pair => [pair.de, pair.en]));
export const alternateLanguages: Record<string, { de: string; en: string }> = Object.fromEntries([
  ...editorialPagePairs,
  {de: '/de/impressum/', en: '/en/imprint/'},
  {de: '/de/datenschutz/', en: '/en/privacy/'},
].flatMap(pair => [[pair.de, pair], [pair.en, pair]]));
