import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Inspect the actual production HTML, as a social crawler without JavaScript would.
const output = 'dist/course/browser';
const sitemap = await readFile(join(output, 'sitemap.xml'), 'utf8');
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
assert(pages.length > 0, 'The sitemap must contain pages');
const images = new Set();

for (const url of pages) {
	const route = url.pathname.replace(/^\/+|\/+$/g, '');
	const html = await readFile(join(output, route, 'index.html'), 'utf8');
	const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) =>
		Object.fromEntries(
			[...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]),
		),
	);
	const meta = (key) => {
		const matches = tags.filter((tag) => tag.property === key || tag.name === key);
		assert.equal(matches.length, 1, `${url.pathname}: exactly one ${key}`);
		assert(matches[0].content, `${url.pathname}: ${key} must not be empty`);
		return matches[0].content;
	};
	assert(/<title>[^<]+<\/title>/.test(html), `${url.pathname}: page title`);
	for (const key of [
		'description',
		'og:title',
		'og:description',
		'og:site_name',
		'twitter:title',
		'twitter:description',
	])
		meta(key);
	assert.equal(meta('og:url').replace(/\/$/, ''), url.href.replace(/\/$/, ''));
	const canonical = [...html.matchAll(/<link\b[^>]*>/g)]
		.map(([tag]) =>
			Object.fromEntries(
				[...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]),
			),
		)
		.filter((tag) => tag.rel === 'canonical');
	assert.equal(canonical.length, 1, `${url.pathname}: canonical`);
	assert.equal(canonical[0].href, meta('og:url'));
	assert.equal(meta('og:locale'), 'uk_UA');
	assert.equal(meta('twitter:card'), 'summary_large_image');
	const image = new URL(meta('og:image'));
	assert.equal(image.protocol, 'https:');
	assert.equal(image.origin, url.origin);
	assert.equal(meta('og:image:secure_url'), image.href);
	assert.equal(meta('twitter:image'), image.href);
	assert.equal(meta('twitter:image:alt'), meta('og:image:alt'));
	assert.equal(meta('og:image:type'), 'image/png');
	assert(!images.has(image.href), `${url.pathname}: image must be unique`);
	images.add(image.href);
	const png = await readFile(join(output, image.pathname.replace(/^\//, '')));
	assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
	assert.equal(Number(meta('og:image:width')), png.readUInt32BE(16));
	assert.equal(Number(meta('og:image:height')), png.readUInt32BE(20));
	assert(png.length < 5_000_000, `${image.pathname}: keep social image under 5 MB`);
	console.log(
		`OK ${url.pathname} → ${image.pathname} (${png.readUInt32BE(16)}×${png.readUInt32BE(20)})`,
	);
}

console.log(`Verified ${pages.length} prerendered pages and ${images.size} unique social images.`);
