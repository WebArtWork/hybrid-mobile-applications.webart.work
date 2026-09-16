import { Component, signal } from '@angular/core';
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
			'Каталог товарів і документ товару — наскрізний приклад цієї лекції.',
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
				'GET /api/products/42 HTTP/1.1\nAccept: application/json',
				'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{"id":42,"name":"Рюкзак","price":1200}',
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
				'Backend DTO\n{"product_id":42,"price_cents":120000}',
				'validate → map\nProduct { id: 42, price: 1200 }',
			],
			'TypeScript тип не перевіряє JSON під час виконання. Перевіряйте структуру на межі API.',
		],
		[
			'Інтерактивна вправа',
			'Зберіть запит',
			'Потрібно створити замовлення з товаром 42.',
			[],
			'Оберіть method та endpoint; перевірте контракт перед відправленням.',
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
			'POST замовлення повторюйте лише з підтриманим сервером idempotency key.',
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
			'Не запускайте паралельний refresh для кожного 401. Невдалий refresh повертає до входу.',
		],
		[
			'Інтерактивна вправа',
			'Access token завершився',
			'Запит отримав 401. Перевірте два варіанти refresh.',
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
			'Відокремлюйте дані користувачів. Вихід із сесії має очищати їхні приватні кеші.',
		],
		[
			'Secure storage',
			'Секрети сесії',
			'Native adapter може використовувати Keychain / Keystore.',
			[
				'Web layer → secure storage adapter → native platform',
				'Не записувати tokens у logs або звичайний localStorage',
				'Web: HttpOnly cookies можуть бути частиною backend-контракту',
			],
			'Захищене зберігання не усуває ризик XSS у працюючому застосунку. Обирайте й перевіряйте plugin окремо.',
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
				'Network-first → мережа; cache як fallback',
				'Cache-first → локальна копія; мережа за відсутності',
				'Stale-while-revalidate → показати cache та оновити у фоні',
			],
			'Кеш ресурсів інтерфейсу й база документів — окремі рівні. Позначайте давність даних.',
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
			'Якщо документ змінився: 200 + новий body + новий ETag. Запит перевірки залишається, передача документа — ні.',
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
				'Sync → backend acknowledgment → mark synced',
			],
			'Черга має переживати перезапуск. Не позначайте зміну доставленою до підтвердження сервера.',
		],
		[
			'Інтерактивна вправа',
			'Мережа зникла',
			'Каталог збережений. Чернетку можна змінити без мережі.',
			[],
			'Симуляція в пам’яті: у production база та outbox мають бути постійними.',
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
				'pending → syncing → synced / error',
				'PATCH /documents/42\nIf-Match: "doc-42-v1"',
				'Версія змінилась → 412 Precondition Failed → порівняти та узгодити',
			],
			'If-Match потребує strong ETag. Idempotency захищає від дублікатів; контроль версії — від перезапису чужих змін.',
		],
		[
			'Підсумок',
			'Повний шлях даних',
			'Усі механізми працюють як одна система.',
			[
				'Sign in → GET → validate → local database',
				'Repeat GET + ETag → 304 → reuse document',
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
	readonly method = signal('GET');
	readonly endpoint = signal('/products/42');
	readonly requestChecked = signal(false);
	readonly methods = ['GET', 'POST', 'PATCH', 'DELETE'];
	readonly endpoints = ['/products/42', '/orders'];
	readonly sessionResult = signal('Запит → 401 Unauthorized');
	refresh(success: boolean): void {
		this.sessionResult.set(
			success
				? '401 → refresh успішний → новий access token → повтор → 200 OK'
				: '401 → refresh відхилено → очистити сесію → екран входу',
		);
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
		this.etagResponse.set('Кеш очищено. Наступний запит отримає 200 з body.');
	}
	readonly online = signal(true);
	readonly pending = signal(0);
	readonly draftCount = signal(0);
	readonly offlineMessage = signal('Локальний каталог: Рюкзак · 1200 грн');
	saveDraft(): void {
		this.draftCount.update((count) => count + 1);
		this.pending.update((count) => count + 1);
		this.offlineMessage.set('Чернетка збережена локально. Очікує синхронізації.');
	}
	sync(): void {
		if (!this.online()) {
			this.offlineMessage.set('Мережі немає. Черга збережена; спробуйте після reconnect.');
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
