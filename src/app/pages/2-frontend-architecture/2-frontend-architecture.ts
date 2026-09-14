import { Component, computed, signal } from '@angular/core';
import { Presentation } from '../../shared/presentation/presentation';
import { PresentationView } from '../../shared/presentation/presentation-view';

type ArchitectureLayer = 'Page' | 'Component' | 'Service' | 'State' | 'API';
type RequestState = 'idle' | 'loading' | 'success' | 'empty' | 'error';

@Component({
	selector: 'app-frontend-architecture',
	imports: [Presentation, PresentationView],
	templateUrl: './2-frontend-architecture.html',
	styleUrls: [
		'../1-hybrid-mobile-apps/1-hybrid-mobile-apps.css',
		'./2-frontend-architecture.css',
	],
})
export class FrontendArchitecture {
	readonly slides = [
		[
			'Архітектура frontend',
			'Архітектура frontend мобільного застосунку',
			'Як перетворити набір екранів на систему, яку легко розвивати',
		],
		[
			'Система',
			'Архітектура створює порядок у коді.',
			'Вона допомагає зрозуміти, де що знаходиться і як працює разом.',
		],
		[
			'Карта застосунку',
			'Від дотику до даних і назад.',
			'Кожен шар має одне зрозуміле завдання.',
		],
		[
			'Структура проєкту',
			'Структура папок пояснює продукт.',
			'Файли мають бути там, де команда очікує їх знайти.',
		],
		['Організація', 'За типом чи за функцією?', 'Feature-підхід тримає пов’язаний код поруч.'],
		[
			'Ролі UI',
			'Page координує. Component відображає.',
			'Повторне використання починається з чіткої відповідальності.',
		],
		[
			'Інтерактивна вправа',
			'Де має жити цей код?',
			'Класифікуйте частини застосунку за їхньою відповідальністю.',
		],
		[
			'Application Shell',
			'Стабільна рамка навколо змінного контенту.',
			'Shell і layouts формують незмінну географію застосунку.',
		],
		[
			'Routing',
			'Route перетворює адресу на екран.',
			'Маршрут описує стан навігації, який можна відтворити.',
		],
		[
			'Mobile navigation',
			'Кнопка «Назад» є частиною архітектури.',
			'Tabs, stack і deep links мають різну семантику.',
		],
		[
			'Інтерактивна вправа',
			'Побудуйте навігаційний стек.',
			'Відкривайте екрани та перевірте, куди повертає Back.',
		],
		[
			'Services',
			'UI не повинен знати всі деталі.',
			'Сервіси інкапсулюють можливості та інтеграції.',
		],
		[
			'Dependency flow',
			'Залежності течуть через стабільні межі.',
			'Page координує, service виконує, state повідомляє UI.',
		],
		[
			'State',
			'Не кожен стан має бути глобальним.',
			'Область життя стану повинна відповідати області його використання.',
		],
		[
			'Інтерактивна вправа',
			'UI відображає стан.',
			'Один екран повинен явно показувати loading, success, empty та error.',
		],
		[
			'Forms',
			'Форма працює як машина станів.',
			'Значення, валідація та відправлення потребують окремих станів.',
		],
		[
			'API layer',
			'Мережа закінчується на межі API layer.',
			'UI працює з моделями застосунку, а не з випадковою формою відповіді.',
		],
		[
			'Mobile-first UI',
			'Проєктуйте від найжорсткіших обмежень.',
			'Дотик, клавіатура, safe areas та вузький viewport змінюють рішення.',
		],
		[
			'Lifecycle',
			'Екран може зникнути, але процес залишиться.',
			'Listeners, subscriptions і timers потребують контрольованого завершення.',
		],
		[
			'Підсумок',
			'Фреймворки різні. Відповідальності ті самі.',
			'Добра архітектура робить зміни локальними та передбачуваними.',
		],
	].map(([chapter, title, lead], index) => ({ id: index + 1, chapter, title, lead }));

	readonly layers = [
		['Application Shell', 'Глобальна рамка, layouts і точки навігації.'],
		['Pages', 'Екрани маршруту: збирають дані та компонують UI.'],
		['Components', 'Фокусовані, повторно використовувані частини інтерфейсу.'],
		['State', 'Джерело істини та переходи між станами.'],
		['Services', 'Бізнес-операції, storage, analytics і platform adapters.'],
		['API layer', 'HTTP-клієнт, DTO, mapping та єдина модель помилок.'],
	];
	readonly structure = [
		['app/', 'application shell, routing, global providers'],
		['features/catalog/', 'pages, components, state та services каталогу'],
		['features/checkout/', 'ізольований flow оформлення замовлення'],
		['shared/ui/', 'повторно використовувані presentation-компоненти'],
		['core/', 'API clients, auth, storage, platform adapters'],
	];
	readonly architectureItems: { name: string; hint: string; answer: ArchitectureLayer }[] = [
		{
			name: 'Product details screen',
			hint: 'Екран, відкритий маршрутом /products/:id',
			answer: 'Page',
		},
		{
			name: 'Price badge',
			hint: 'Невеликий повторно використовуваний UI',
			answer: 'Component',
		},
		{ name: 'Checkout orchestration', hint: 'Операція, яку викликає UI', answer: 'Service' },
		{ name: 'Active cart', hint: 'Джерело істини для декількох екранів', answer: 'State' },
		{ name: 'Products HTTP client', hint: 'Знає endpoint і DTO backend', answer: 'API' },
	];
	readonly architectureIndex = signal(0);
	readonly architectureChoice = signal<ArchitectureLayer | null>(null);
	readonly architectureLayers: ArchitectureLayer[] = [
		'Page',
		'Component',
		'Service',
		'State',
		'API',
	];

	chooseArchitecture(layer: ArchitectureLayer): void {
		this.architectureChoice.set(layer);
	}
	nextArchitectureItem(): void {
		this.architectureIndex.update((index) => (index + 1) % this.architectureItems.length);
		this.architectureChoice.set(null);
	}

	readonly navigationStack = signal(['Home']);
	readonly destinations = ['Catalog', 'Product', 'Checkout'];
	openScreen(screen: string): void {
		if (this.navigationStack().at(-1) !== screen)
			this.navigationStack.update((stack) => [...stack, screen]);
	}
	goBack(): void {
		this.navigationStack.update((stack) => (stack.length > 1 ? stack.slice(0, -1) : stack));
	}
	resetNavigation(): void {
		this.navigationStack.set(['Home']);
	}

	readonly state = signal<RequestState>('idle');
	readonly requestStates: { id: RequestState; label: string; message: string }[] = [
		{ id: 'idle', label: 'Idle', message: 'Ще не було запиту. Покажіть дію, з якої почати.' },
		{
			id: 'loading',
			label: 'Loading',
			message: 'Покажіть progress і заблокуйте лише конфліктні дії.',
		},
		{
			id: 'success',
			label: 'Success',
			message: 'Дані готові. UI відображає колекцію та доступні дії.',
		},
		{ id: 'empty', label: 'Empty', message: 'Запит успішний, але даних немає. Це не помилка.' },
		{
			id: 'error',
			label: 'Error',
			message: 'Поясніть проблему та запропонуйте безпечний retry.',
		},
	];
	readonly currentRequestState = computed(() =>
		this.requestStates.find((item) => item.id === this.state())!,
	);
	readonly stateScopes = [
		['Local', 'Відкрите меню, значення input, active accordion'],
		['Feature', 'Filters каталогу, cart, checkout draft'],
		['Global', 'Session користувача, locale, theme'],
		['Server state', 'Products, orders, profiles із API'],
	];
	readonly frameworks = [
		['Відповідальність', 'Angular', 'React', 'Vue'],
		['UI building block', 'Component', 'Component', 'Component'],
		['Routing', 'Angular Router', 'React Router*', 'Vue Router'],
		['Shared logic', 'Service / function', 'Hook / module', 'Composable / service'],
		['Reactive state', 'Signals / RxJS', 'State / reducer / store', 'ref / reactive / store'],
		['Forms', 'Reactive Forms', 'Controlled / library', 'Bindings / library'],
	];
}
