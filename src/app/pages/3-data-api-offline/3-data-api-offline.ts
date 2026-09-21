import { Component, computed, signal } from '@angular/core';
import { Presentation } from '../../shared/presentation/presentation';
import { PresentationView } from '../../shared/presentation/presentation-view';

@Component({
	selector: 'app-data-api-offline',
	imports: [Presentation, PresentationView],
	templateUrl: './3-data-api-offline.html',
	styleUrls: ['../1-hybrid-mobile-apps/1-hybrid-mobile-apps.css', './3-data-api-offline.css'],
})
export class DataApiOffline {
	readonly slides = [
		[
			'Лекція 03',
			'Дані, API, авторизація та Offline',
			'Як отримувати дані, зберігати сесію та працювати без інтернету.',
			['HTTP → API → Session → Local data → Sync'],
			'Приклад: каталог магазину, замовлення та редагування опису товару менеджером.',
		],
		[
			'Шлях даних',
			'Від дотику до backend і назад',
			'Продовжуємо карту frontend з другої лекції.',
			[
				'Page → Service → API client → Backend',
				'Backend → DTO → Application model → State → UI',
			],
			'Page координує дію. API layer відповідає за мережевий контракт.',
		],
		[
			'HTTP',
			'Запит і відповідь',
			'Клієнт описує операцію, сервер повертає результат.',
			[
				'GET /products/42 HTTP/1.1\nHost: api.example.com\nAccept: application/json',
				'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{"product_id":42,"price_minor":120000,"currency":"UAH"}',
			],
			'HTTPS захищає передачу даних. Status code і body мають різні ролі.',
		],
		[
			'REST',
			'Ресурси та операції',
			'URL називає ресурс; HTTP method описує дію.',
			[
				'GET /products — отримати каталог',
				'POST /orders — створити замовлення',
				'PATCH /products/42 — змінити частину товару',
				'DELETE /drafts/7 — видалити чернетку',
			],
			'Контракт API визначає формат, права доступу та можливі відповіді.',
		],
		[
			'JSON',
			'DTO та модель застосунку',
			'Дані з мережі потребують перевірки перед використанням.',
			[
				'Backend DTO\n{"product_id":42,"price_minor":120000,"currency":"UAH"}',
				'validate → map\nProduct { id: 42, priceMinor: 120000, currency: "UAH" }\nДля показу: 1200 грн',
			],
			'TypeScript тип не перевіряє JSON під час виконання. Перевіряйте структуру на межі API.',
		],
		[
			'Інтерактивна вправа',
			'Від кнопки «Купити» до API',
			'Рюкзак, товар №42, коштує 1200 грн. Порівняйте перегляд товару та оформлення замовлення.',
			[],
			'GET /products/42 читає товар. POST /orders створює замовлення, а JSON передає товар і кількість. Ціну перевіряє сервер.',
		],
		[
			'API layer',
			'Спільна межа мережевої роботи',
			'Компоненти працюють із моделями та зрозумілими помилками.',
			[
				'Base URL + headers + serialization',
				'Response validation + DTO mapping',
				'Cancellation + normalized errors',
			],
			'Для пошуку скасовуйте застарілі запити або ігноруйте їхні результати.',
		],
		[
			'Помилки',
			'Коли повторювати запит',
			'Відсутність відповіді не означає, що сервер не виконав операцію.',
			[
				'Timeout / network error → результат може бути невідомим',
				'400 / 403 → виправити запит або права',
				'429 / 503 → обмежені retries з backoff; врахувати Retry-After',
			],
			'Для повтору POST зберігайте той самий idempotency key і payload. Без підтримки сервера спочатку перевірте результат операції.',
		],
		[
			'Доступ',
			'Authentication та Authorization',
			'Встановлення особи й перевірка прав — різні завдання.',
			[
				'Authentication → хто виконує запит?',
				'Authorization → чи дозволена ця операція?',
				'401 → потрібна чинна сесія · 403 → доступ заборонено',
			],
			'Route guard покращує UX. Backend перевіряє права для кожної захищеної операції.',
		],
		[
			'Сесія',
			'Життєвий цикл tokens',
			'Модель access / refresh залежить від контракту авторизації.',
			[
				'Sign in → access token + refresh mechanism',
				'Authorization: Bearer <access-token>',
				'Expiry → один refresh → один повтор запиту',
				'Sign out → завершити сесію та очистити приватні локальні дані',
			],
			'Один refresh для паралельних запитів. Відхилений refresh вимагає входу. Timeout або 5xx призупиняє запити, але не стирає сесію.',
		],
		[
			'Інтерактивна вправа',
			'Строк дії access token минув',
			'GET отримав 401 через прострочений token. Порівняйте успіх, відмову та мережеву помилку refresh.',
			[],
			'Симуляція сесії; справжні облікові дані не використовуються.',
		],
		[
			'Local data',
			'Що зберігати на пристрої',
			'Сховище обирають за типом даних і вимогами продукту.',
			[
				'Налаштування → key-value storage',
				'Каталог + чернетки → локальна база',
				'Секрети сесії → відповідне захищене сховище',
			],
			'Розділяйте дані й outbox за користувачем. Перед виходом попередьте про невідправлені зміни та узгодьте їх видалення.',
		],
		[
			'Локальна база',
			'IndexedDB та SQLite',
			'Обидва підходи дозволяють зберігати структуровані дані.',
			[
				'IndexedDB → асинхронна база у web-середовищі',
				'SQLite → SQL база через відповідний native plugin',
				'products · documents · drafts · outbox',
			],
			'Плануйте transactions, міграції схеми, обмеження обсягу та очищення.',
		],
		[
			'Кешування',
			'Звідки читати дані',
			'Стратегія залежить від допустимої давності даних.',
			[
				'Network-first → API з timeout, кеш при недоступності мережі',
				'Cache-first → придатна локальна копія, інакше API',
				'Stale-while-revalidate → показати cache та оновити у фоні',
			],
			'Визначте строк придатності й інвалідацію кешу. Не приховуйте 401 / 403 старою приватною копією. Позначайте давність даних.',
		],
		[
			'HTTP cache validation',
			'ETag та умовні запити',
			'Незмінений документ не потрібно завантажувати повторно.',
			[
				'200 OK\nETag: "doc-42-v1"\n\n{ document body }',
				'GET /documents/42\nIf-None-Match: "doc-42-v1"',
				'304 Not Modified → без body → використати локальну копію',
			],
			'Без змін: 304 без body. Після змін: 200 з новим body та ETag. Умовний GET економить передачу лише незміненого документа.',
		],
		[
			'Інтерактивна вправа',
			'Документ змінився?',
			'Завантажте документ, повторіть запит, змініть серверну версію.',
			[],
			'Навчальна симуляція HTTP: явно показує status, headers і передачу body.',
		],
		[
			'Offline-first',
			'Локальні дані та черга змін',
			'UI читає локальну базу; синхронізація узгоджує її із сервером.',
			[
				'Read → local database → UI',
				'Edit → transaction: draft + outbox operation',
				'Sync → підтвердження конкретної операції → оновити базу й outbox',
			],
			'Черга переживає перезапуск. Зберігайте ID операції, payload і базову версію. Відповідь на стару зміну не має стирати новішу локальну правку.',
		],
		[
			'Інтерактивна вправа',
			'Мережа зникла',
			'Каталог уже збережений. Створіть чернетки offline, увімкніть мережу та спробуйте sync із недоступним API.',
			[],
			'Симуляція в пам’яті з ручним sync. У production потрібне постійне сховище, а для запуску offline ще й доступний код інтерфейсу.',
		],
		[
			'Network + lifecycle',
			'Повернення до мережі',
			'Підключення до Wi-Fi ще не доводить доступність backend.',
			[
				'Reconnect / resume → перевірити актуальність і спробувати API',
				'Timeout → показати локальні дані та можливість retry',
				'Лише один sync worker → обмежені повтори',
			],
			'Network state — сигнал для спроби, а фактичний результат API визначає успіх.',
		],
		[
			'Синхронізація',
			'Повторна доставка та конфлікти',
			'Зміни на двох пристроях можуть стосуватися однієї версії документа.',
			[
				'pending → syncing → synced / retry / conflict',
				'PATCH /documents/42\nIf-Match: "doc-42-v1"',
				'412 → отримати серверну версію → узгодити локальні зміни → новий If-Match',
			],
			'If-Match потребує strong ETag. Idempotency захищає від дублікатів; контроль версії — від перезапису чужих змін.',
		],
		[
			'Підсумок',
			'Повний шлях даних',
			'Усі механізми працюють як одна система.',
			[
				'Sign in → GET → validate → local database',
				'Repeat GET + ETag → 304 без змін / 200 з оновленими даними',
				'Offline edit → outbox → reconnect → conditional update',
			],
			'Далі: Capacitor, Native bridge, plugins і можливості Android / iOS.',
		],
	].map(([chapter, title, lead, details, takeaway], index) => ({
		id: index + 1,
		chapter: chapter as string,
		title: title as string,
		lead: lead as string,
		details: details as string[],
		takeaway: takeaway as string,
	}));
	readonly requestAction = signal<'view' | 'order'>('order');
	readonly quantity = signal(1);
	readonly sampleResponse = signal('');
	readonly requestPreview = computed(() =>
		this.requestAction() === 'view'
			? 'GET /products/42\nAccept: application/json\n\n(без body)'
			: 'POST /orders\nContent-Type: application/json\n\n' +
				JSON.stringify({ items: [{ productId: 42, quantity: this.quantity() }] }, null, 2),
	);
	selectRequestAction(action: 'view' | 'order'): void {
		this.requestAction.set(action);
		this.sampleResponse.set('');
	}
	changeQuantity(delta: number): void {
		this.quantity.update((value) => Math.max(1, Math.min(5, value + delta)));
		this.sampleResponse.set('');
	}
	sendSampleRequest(): void {
		this.sampleResponse.set(
			this.requestAction() === 'view'
				? '200 OK\n' +
						JSON.stringify(
							{ product_id: 42, price_minor: 120000, currency: 'UAH' },
							null,
							2,
						)
				: '201 Created\nLocation: /orders/101\n' +
						JSON.stringify(
							{
								id: 101,
								quantity: this.quantity(),
								total_minor: 120000 * this.quantity(),
								currency: 'UAH',
							},
							null,
							2,
						),
		);
	}
	readonly sessionResult = signal('Запит → 401 Unauthorized');
	refresh(outcome: 'success' | 'rejected' | 'unavailable'): void {
		const results = {
			success: '401 → refresh успішний → новий access token → повтор GET → 200 OK',
			rejected:
				'401 → refresh відхилено (invalid_grant) → зупинити sync → потрібен вхід. Чернетки не передавати іншому користувачу.',
			unavailable:
				'401 → refresh: timeout / 503 → призупинити захищені запити. Зберегти локальні зміни, повторити за політикою авторизації.',
		};
		this.sessionResult.set(results[outcome]);
	}
	readonly serverVersion = signal(1);
	changeDocument(): void {
		this.serverVersion.update((version) => version + 1);
	}
	readonly cachedVersion = signal<number | null>(null);
	readonly transferred = signal(0);
	readonly etagResponse = signal('Натисніть «Запитати документ» для першого GET.');
	readonly etagRequest = signal('GET /documents/42');
	requestDocument(): void {
		const cached = this.cachedVersion();
		this.etagRequest.set(
			'GET /documents/42' +
				(cached === null ? '' : '\nIf-None-Match: "doc-42-v' + cached + '"'),
		);
		if (cached === this.serverVersion()) {
			this.etagResponse.set(
				'304 Not Modified\nETag: "doc-42-v' +
					cached +
					'"\nBody: відсутній · 0 байтів документа\nВикористовуємо локальну копію.',
			);
		} else {
			const version = this.serverVersion();
			this.cachedVersion.set(version);
			this.transferred.update((count) => count + 1);
			this.etagResponse.set(
				'200 OK\nETag: "doc-42-v' +
					version +
					'"\nBody: {"id":42,"revision":' +
					version +
					'}\nBody та ETag збережено разом.',
			);
		}
	}
	resetDocument(): void {
		this.serverVersion.set(1);
		this.cachedVersion.set(null);
		this.transferred.set(0);
		this.etagRequest.set('GET /documents/42');
		this.etagResponse.set(
			'Симуляцію скинуто: сервер v1, кеш порожній. Наступний GET отримає 200 з body.',
		);
	}
	readonly online = signal(false);
	readonly backendAvailable = signal(true);
	readonly pending = signal(0);
	readonly draftCount = signal(0);
	readonly offlineMessage = signal('Локальний каталог: Рюкзак · 1200 грн');
	saveDraft(): void {
		this.draftCount.update((count) => count + 1);
		this.pending.update((count) => count + 1);
		this.offlineMessage.set('Нову чернетку збережено локально та додано до черги.');
	}
	sync(): void {
		if (!this.online()) {
			this.offlineMessage.set('Мережі немає. Черга збережена; спробуйте після reconnect.');
		} else if (!this.backendAvailable()) {
			this.offlineMessage.set(
				'Мережа є, але API повернув 503. Підтвердження немає, усі зміни залишаються в черзі.',
			);
		} else if (this.pending() === 0) {
			this.offlineMessage.set('Усі зміни вже синхронізовано.');
		} else {
			this.offlineMessage.set(
				'Backend підтвердив ' + this.pending() + ' змін. Черга порожня.',
			);
			this.pending.set(0);
		}
	}
}
