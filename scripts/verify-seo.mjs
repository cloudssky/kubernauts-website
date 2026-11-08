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
// Release allowlist: 7 bilingual editorial page pairs.
const pairs = [
  ['de/', 'en/'],
  ['de/kubernauts-kubernetes-services/', 'en/kubernauts-kubernetes-services/'],
  ['de/kubernauts-kubernetes-services/platform-engineering/', 'en/kubernauts-kubernetes-services/platform-engineering/'],
  ['de/kubernauts-kubernetes-services/ai-mlops-services/', 'en/kubernauts-kubernetes-services/ai-mlops-services/'],
  ['de/kubernauts-kubernetes-services/cloud-native-transformation/', 'en/kubernauts-kubernetes-services/cloud-native-transformation/'],
  ['de/openkubes/', 'en/openkubes/'],
  ['de/contact/', 'en/contact/']
];
const approvedPaths = [
  '/de/', '/en/',
  '/de/kubernauts-kubernetes-services/index.html', '/en/kubernauts-kubernetes-services/index.html',
  ...pairs.slice(2).flatMap(([de,en]) => ['/'+de, '/'+en])
];
assert.equal(approvedPaths.length, 14);
for(const [de,en] of pairs){
  const pages = [read(de+'index.html'), read(en+'index.html')];
  for(const html of pages){
    assert.ok(html.includes(released?'content="index,follow"':'content="noindex,follow"'), `Incorrect robots for ${de} / ${en}`);
    assert.ok(html.includes('hreflang="de"') && html.includes('hreflang="en"'), `Missing language pair for ${de} / ${en}`);
  }
}
for(const legacy of ['de/products/', 'en/products/', 'de/openkubes/inhouse-ai/', 'en/openkubes/inhouse-ai/']){
  assert.ok(read(legacy+'index.html').includes('content="noindex,follow"'), `Legacy route indexable: ${legacy}`);
}
const review=read('brand-compare/index.html');
assert.ok(review.includes('content="noindex,follow"'),'Brand comparison exposed to indexing');
const robots=read('robots.txt');
assert.ok(robots.includes(released?'Allow: /':'Disallow: /'),'Incorrect robots.txt for release mode');
const sitemap=read('sitemap.xml');
assert.ok(sitemap.includes('<urlset'),'Missing XML sitemap');
if(!released) assert.ok(!sitemap.includes('<loc>'),'Unreleased URLs in sitemap');
else {
  for(const path of approvedPaths)assert.ok(sitemap.includes('<loc>https://kubernauts.de'+path+'</loc>'), `Missing sitemap URL ${path}`);
  assert.equal((sitemap.match(/<loc>/g)||[]).length,14,'Only 14 editorial pages may be included');
  assert.ok(!sitemap.includes('brand-compare'));
}
console.log('SEO build verification passed ('+(released?'release':'preview')+' mode).');
