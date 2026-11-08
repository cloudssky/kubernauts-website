import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const root = new URL('../dist/', import.meta.url);
const read = (path) => {
  const file = new URL(path,root);
  assert.ok(existsSync(file), `Missing build asset: ${path}`);
  return readFileSync(file,'utf8');
};
const released=process.env.SITE_INDEXABLE==='true';
const home = {de: read('de/index.html'),en:read('en/index.html')};
for(const lang of ['de','en']){
  const h=home[lang];
  assert.match(h, new RegExp('<html lang="'+lang+'"'));
  assert.ok(h.includes('rel="canonical"'), `Missing canonical ${lang}`);
  assert.ok(h.includes('https://kubernauts.de/'+lang+'/'), `Bad canonical ${lang}`);
  assert.ok(h.includes('hreflang="de"') && h.includes('hreflang="en"'),`Missing alternates ${lang}`);
  assert.ok(h.includes('application/ld+json'), `Missing Organization schema ${lang}`);
  assert.ok(h.includes(released?'content="index,follow"':'content="noindex,follow"'),`Wrong robots status for ${lang}`);
}
for(const legal of ['de/impressum/','en/imprint/','de/datenschutz/','en/privacy/']){
  const h=read(legal+'index.html');
  assert.ok(h.includes('content="noindex,follow"'), `Legal page published without review: ${legal}`);
  assert.ok(h.includes('https://kubernauts.de/'+legal),`Missing correct legal canonical ${legal}`);
}
const review=read('brand-compare/index.html');
assert.ok(review.includes('content="noindex,follow"'),'Brand comparison exposed to indexing');
const robots=read('robots.txt');
assert.ok(robots.includes(released?'Allow: /':'Disallow: /'),'Incorrect robots.txt for release mode');
const sitemap=read('sitemap.xml');
assert.ok(sitemap.includes('<urlset'),'Missing XML sitemap');
if(!released) assert.ok(!sitemap.includes('<loc>'),'Unreleased URLs in sitemap');
else {
  for(const lang of ['de','en'])assert.ok(sitemap.includes('<loc>https://kubernauts.de/'+lang+'/</loc>'));
  assert.ok(!sitemap.includes('brand-compare'));
}
console.log('SEO build verification passed ('+(released?'release':'preview')+' mode).');
