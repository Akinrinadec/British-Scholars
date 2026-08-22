import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith('.html')).sort();
const failures = [];

const report = (condition, message) => {
  if (!condition) failures.push(message);
};

const firstMatch = (html, pattern) => (html.match(pattern) || [])[1] || '';
const canonicalToFile = (canonical) => {
  const url = new URL(canonical);
  const pathname = url.pathname.replace(/^\//, '').replace(/\/$/, '');
  return pathname ? `${pathname}.html` : 'index.html';
};

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const seenTitles = new Map();
const seenDescriptions = new Map();
const seenCanonicals = new Map();
const indexableCanonicals = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const title = firstMatch(html, /<title>([^<]+)<\/title>/i);
  const description = firstMatch(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  const canonical = firstMatch(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const robots = firstMatch(html, /<meta\s+name="robots"\s+content="([^"]+)"/i).toLowerCase();
  const indexable = !robots.includes('noindex');

  report(Boolean(title), `${file}: missing title`);
  report(Boolean(description), `${file}: missing meta description`);
  report(Boolean(canonical), `${file}: missing canonical URL`);
  report((html.match(/<h1(?:\s|>)/gi) || []).length === 1, `${file}: must contain exactly one H1`);
  report(html.includes('site-events.js'), `${file}: missing site-events.js`);
  report(html.includes('property="og:image"'), `${file}: missing Open Graph image`);
  report(html.includes('name="twitter:card"'), `${file}: missing Twitter card metadata`);
  report(html.includes('rel="icon"'), `${file}: missing favicon declaration`);

  for (const [value, label, collection] of [
    [title, 'title', seenTitles],
    [description, 'description', seenDescriptions],
    [canonical, 'canonical', seenCanonicals],
  ]) {
    if (!value) continue;
    report(!collection.has(value), `${file}: duplicate ${label} also used by ${collection.get(value)}`);
    collection.set(value, file);
  }

  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      failures.push(`${file}: invalid JSON-LD (${error.message})`);
    }
  }

  if (indexable) {
    indexableCanonicals.push(canonical);
    if (file !== 'index.html') {
      report(html.includes('class="breadcrumb"'), `${file}: missing visible breadcrumb`);
      report(html.includes('"@type":"BreadcrumbList"'), `${file}: missing BreadcrumbList structured data`);
    }
  }

  for (const match of html.matchAll(/href="([^"]+)"/gi)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:|#)/i.test(href)) continue;
    const clean = href.split(/[?#]/)[0];
    if (!clean) continue;
    const target = clean.endsWith('.html') || path.extname(clean) ? clean : `${clean}.html`;
    report(fs.existsSync(path.join(root, target)), `${file}: broken local link to ${href}`);
  }
}

report(new Set(sitemapUrls).size === sitemapUrls.length, 'sitemap.xml: duplicate URL');
for (const canonical of indexableCanonicals) {
  report(sitemapUrls.includes(canonical), `${canonicalToFile(canonical)}: indexable canonical missing from sitemap.xml`);
}
for (const url of sitemapUrls) {
  const file = canonicalToFile(url);
  report(fs.existsSync(path.join(root, file)), `sitemap.xml: ${url} has no matching HTML file`);
  report(indexableCanonicals.includes(url), `sitemap.xml: ${url} is not an indexable canonical`);
}

const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
report(home.includes('https://britishscholars.ae/british-scholars-logo.svg'), 'index.html: Organization schema is missing the dedicated logo');
report(home.includes('info@britishscholars.ae'), 'index.html: Organization schema is missing the approved email');

if (failures.length) {
  console.error(`SEO validation failed with ${failures.length} problem${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO validation passed for ${htmlFiles.length} HTML pages and ${sitemapUrls.length} sitemap URLs.`);
