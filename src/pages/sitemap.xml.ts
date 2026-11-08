import type { APIRoute } from 'astro';
export const prerender = true;
const origin = 'https://kubernauts.de';
const escapeXml = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
export const GET: APIRoute = () => {
  // Only approved, real, public pages. Future landing pages must be added
  // deliberately after content and URL migration review.
  const pages = process.env.SITE_INDEXABLE === 'true' ? ['/de/', '/en/'] : [];
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    pages.map(path => '  <url><loc>' + escapeXml(origin+path) + '</loc></url>').join('\n') +
    (pages.length ? '\n' : '') + '</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
