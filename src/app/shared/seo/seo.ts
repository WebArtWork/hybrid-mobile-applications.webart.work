import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SEO_IMAGES, SeoImage } from './seo-images';

const SITE_NAME = 'Курс «Гібридні мобільні додатки»';
const SITE_URL = 'https://hybrid-mobile-applications.webart.work';

@Injectable({ providedIn: 'root' })
export class Seo {
	private readonly document = inject(DOCUMENT);
	private readonly meta = inject(Meta);

	update(
		path: string,
		title: string,
		description: string,
		image: SeoImage = SEO_IMAGES.index,
	): void {
		const url = `${SITE_URL}/${path}`.replace(/\/$/, '') || SITE_URL;
		const imageUrl = new URL(image.path, SITE_URL).href;

		this.meta.updateTag({ name: 'description', content: description });
		this.meta.updateTag({ property: 'og:type', content: 'website' });
		this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
		this.meta.updateTag({ property: 'og:title', content: title });
		this.meta.updateTag({ property: 'og:description', content: description });
		this.meta.updateTag({ property: 'og:url', content: url });
		this.meta.updateTag({ property: 'og:locale', content: 'uk_UA' });
		this.meta.updateTag({ property: 'og:image', content: imageUrl });
		this.meta.updateTag({ property: 'og:image:secure_url', content: imageUrl });
		this.meta.updateTag({ property: 'og:image:type', content: 'image/png' });
		this.meta.updateTag({ property: 'og:image:width', content: String(image.width) });
		this.meta.updateTag({ property: 'og:image:height', content: String(image.height) });
		this.meta.updateTag({ property: 'og:image:alt', content: image.alt });
		this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
		this.meta.updateTag({ name: 'twitter:title', content: title });
		this.meta.updateTag({ name: 'twitter:description', content: description });
		this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
		this.meta.updateTag({ name: 'twitter:image:alt', content: image.alt });

		this.setCanonical(url);
	}

	private setCanonical(url: string): void {
		let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
		if (!link) {
			link = this.document.createElement('link');
			link.setAttribute('rel', 'canonical');
			this.document.head.appendChild(link);
		}
		link.setAttribute('href', url);
	}
}
