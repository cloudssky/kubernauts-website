import type { APIRoute } from 'astro';
export const prerender = true;
export const GET: APIRoute = () => {
  const released = process.env.SITE_INDEXABLE === 'true';
  const text = released
    ? 'User-agent: *\nAllow: /\nDisallow: /brand-compare/\nSitemap: https://kubernauts.de/sitemap.xml\n'
    : 'User-agent: *\nDisallow: /\n';
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
