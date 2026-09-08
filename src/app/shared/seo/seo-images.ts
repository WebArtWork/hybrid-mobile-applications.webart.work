export interface SeoImage {
	path: string;
	alt: string;
	width: number;
	height: number;
}

function image(slug: string, alt: string): SeoImage {
  return { path: `/images/seo/${slug}.png`, alt, width: 1774, height: 887 };
}

/** One social preview per routable page, shared by prerendering and navigation. */
export const SEO_IMAGES = {
	index: image(
		'lecture-index',
		'Гібридні мобільні додатки: ноутбук, смартфони та модулі розробки.',
	),
	hybrid: image(
		'hybrid-mobile-apps',
		'Архітектура та екосистема: шари web-застосунку всередині смартфона.',
	),
	frontend: image(
		'frontend-architecture',
		'Архітектура frontend: компоненти інтерфейсу та навігація мобільного застосунку.',
	),
	data: image(
		'data-api-offline',
		'Дані, API та Offline: смартфон, сервер, база даних і локальний кеш.',
	),
	native: image(
		'native-api',
		'Capacitor та Native API: міст від web-коду до камери, геолокації та датчиків.',
	),
	setup: image(
		'hybrid-project-setup',
		'Створення Hybrid-проєкту: налаштування на ноутбуці та запуск на Android й iOS.',
	),
	deployment: image(
		'build-deployment',
		'Build та публікація: збірка, підпис і доставка застосунку на смартфони.',
	),
} satisfies Record<string, SeoImage>;
