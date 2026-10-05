import { Component, computed, signal } from '@angular/core';
import { Presentation } from '../../shared/presentation/presentation';
import { PresentationView } from '../../shared/presentation/presentation-view';

@Component({
	selector: 'app-hybrid-project-setup',
	imports: [Presentation, PresentationView],
	templateUrl: './5-hybrid-project-setup.html',
	styleUrls: ['../1-hybrid-mobile-apps/1-hybrid-mobile-apps.css', './5-hybrid-project-setup.css'],
})
export class HybridProjectSetup {
	readonly slides = [
		[
			'Лекція 05',
			'Створення та налаштування Hybrid-проєкту на Angular',
			'Минулого разу ми розглянули plugins і Native API. Тепер збираємо проєкт, у якому вони працюють: від порожньої папки до запуску на пристрої.',
			['Angular CLI → Capacitor → Android / iOS → Emulator → Device → Firebase'],
			'Це практична лекція: кожен крок можна повторити на власному комп’ютері, а plugins з лекції 4 підключаються вже в цей проєкт.',
		],
		[
			'Інструменти',
			'Що потрібно встановити',
			'Hybrid-проєкт має web-частину та native-частину — інструменти потрібні для обох.',
			[
				'Web: Node.js (LTS), npm, Angular CLI (npm install -g @angular/cli), Git',
				'Android: Android Studio, Android SDK, JDK (входить до Android Studio)',
				'iOS: macOS, Xcode, CocoaPods / Swift Package Manager',
				'Перевірка: node -v · npm -v · ng version',
			],
			'iOS-збірка можлива лише на macOS. На Windows і Linux доступний Android.',
		],
		[
			'Angular-проєкт',
			'ng new, ng serve, ng build',
			'Спочатку працюючий web-застосунок: Capacitor упаковує лише результат збірки.',
			[
				'ng new catalog-app — для мобільного застосунку SSR зазвичай не потрібен («No»)',
				'ng serve — dev-сервер на http://localhost:4200 з live reload',
				'ng build — production-збірка у dist/catalog-app/browser (має містити index.html)',
			],
			'Тека збірки сучасного Angular закінчується на /browser. Саме цей шлях піде в webDir.',
		],
		[
			'Capacitor',
			'Встановлення та ініціалізація',
			'Capacitor додається як звичайна npm-залежність, а потім ініціалізується.',
			[
				'npm install @capacitor/core',
				'npm install -D @capacitor/cli',
				'npx cap init "Catalog App" com.example.catalog',
			],
			'Це той самий runtime і bridge з лекції 4. cap init створює capacitor.config.ts; команди запускайте в корені Angular-проєкту.',
		],
		[
			'Конфігурація',
			'capacitor.config.ts',
			'Три поля визначають, що саме Capacitor упакує і як назве застосунок.',
			[
				'appId: "com.example.catalog" — унікальний ідентифікатор (reverse-domain)',
				'appName: "Catalog App" — назва під іконкою',
				'webDir: "dist/catalog-app/browser" — тека з web build',
			],
			'appId стає package name в Android і bundle id в iOS. Після публікації змінити його неможливо.',
		],
		[
			'Платформи',
			'Додавання Android та iOS',
			'Кожна платформа — окремий native-проєкт у теках android/ та ios/.',
			[
				'npm install @capacitor/android @capacitor/ios',
				'ng build — webDir має існувати до додавання платформи',
				'npx cap add android',
				'npx cap add ios',
			],
			'Теки android/ та ios/ комітяться в Git — це повноцінні проєкти, а не артефакти збірки.',
		],
		[
			'Синхронізація',
			'npx cap sync',
			'Native-проєкт має власну копію web build і власні plugins — саме тому в лекції 4 після npm install потрібен був cap sync.',
			[
				'npx cap copy — лише копіює web build у native-проєкти',
				'npx cap update — оновлює native-залежності та plugins',
				'npx cap sync — copy + update разом (найчастіше використовується)',
			],
			'Правило: змінили web-код → ng build → npx cap sync → запустити з native IDE.',
		],
		[
			'Інтерактивна вправа',
			'Яка команда потрібна?',
			'Оберіть, що ви змінили в проєкті, і подивіться, що треба виконати далі.',
			[],
			'Симуляція: підказка відповідає типовому робочому циклу Capacitor.',
		],
		[
			'Android Studio',
			'Emulator і запуск',
			'Android Studio збирає Gradle-проєкт і запускає його на емуляторі.',
			[
				'npx cap open android — відкрити проєкт в Android Studio',
				'Дочекайтеся Gradle Sync; встановіть недостатні SDK за підказкою',
				'Device Manager → Create Device → Run ▶ — емулятор',
				'npx cap run android — збірка та запуск із терміналу',
			],
			'Перший Gradle Sync може тривати кілька хвилин — він завантажує залежності.',
		],
		[
			'Xcode',
			'Simulator і signing',
			'iOS-проєкт відкривається в Xcode; для реального пристрою потрібен signing.',
			[
				'npx cap open ios — відкрити проєкт у Xcode',
				'Оберіть simulator (iPhone 15) і натисніть Run ▶',
				'Signing & Capabilities → Team — акаунт Apple Developer',
			],
			'Simulator не потребує платного акаунта. Реальний пристрій — потребує Apple ID як мінімум.',
		],
		[
			'Фізичний пристрій',
			'Запуск на телефоні',
			'Реальний пристрій показує справжню продуктивність, камеру, GPS та жести.',
			[
				'Android: увімкнути Developer options → USB debugging, підключити кабелем',
				'iOS: Developer Mode у Settings → Privacy & Security, довіряти комп’ютеру',
				'Пристрій з’явиться у списку targets в Android Studio / Xcode',
			],
			'Якщо пристрій не видно: перевірте кабель (data, а не лише charge) і дозвіл USB debugging.',
		],
		[
			'Firebase',
			'Підключення проєкту та App Distribution',
			'Firebase потребує реєстрації native-застосунку за тим самим appId і вміє роздавати тестові збірки.',
			[
				'Firebase Console → Add project → Add app (Android / iOS) з appId',
				'Android: google-services.json → android/app/',
				'iOS: GoogleService-Info.plist → ios/App/App/',
				'App Distribution — роздати APK/AAB та IPA тестерам за посиланням, без магазину',
				'npm install firebase — web SDK; Push та Auth налаштовуються окремо',
			],
			'appId у Firebase має збігатися з capacitor.config.ts, інакше конфігурація не підхопиться.',
		],
		[
			'Google Play',
			'Testing tracks',
			'Перш ніж іти в production, збірку перевіряють реальні тестери через Play Console.',
			[
				'Збірка: Android Studio → Build → Generate Signed Bundle (AAB) → завантажити в Play Console',
				'Internal testing — до 100 тестерів, доступно за хвилини, без повного review',
				'Closed testing — запрошені тестери (email-список або Google Group)',
				'Open testing — будь-хто може долучитися за посиланням у Google Play',
				'Нові особисті акаунти: closed test із мінімум 12 тестерами протягом 14 днів перед production',
			],
			'Починайте з Internal testing: це найшвидший цикл «збірка → тестер». Деталі signing та релізу — у лекції 6.',
		],
		[
			'TestFlight',
			'Beta-тестування iOS',
			'TestFlight — офіційний спосіб роздати iOS-збірку без публікації в App Store.',
			[
				'Xcode → Product → Archive → Distribute App → App Store Connect (Upload)',
				'Internal testing — до 100 учасників команди, без beta review',
				'External testing — до 10 000 тестерів через email або публічне посилання, потрібен beta review',
				'Тестери встановлюють застосунок через додаток TestFlight на iPhone',
				'Збірка діє 90 днів, потім завершується',
			],
			'Потрібен платний Apple Developer Program. Certificates та provisioning розбираємо в лекції 6.',
		],
		[
			'Підсумок',
			'Робочий цикл Hybrid-проєкту',
			'Після першого налаштування щоденна робота зводиться до короткого циклу.',
			[
				'Перший раз: ng new → cap init → cap add android / ios',
				'Щоразу: ng build → npx cap sync → Run у Android Studio / Xcode',
				'Нові plugins та зміна capacitor.config.ts → завжди npx cap sync',
			],
			'Тепер у вас є проєкт, де працюють Camera, Geolocation та інші plugins з лекції 4. Далі: production build, signing та публікація.',
		],
	].map(([chapter, title, lead, details, takeaway], index) => ({
		id: index + 1,
		chapter: chapter as string,
		title: title as string,
		lead: lead as string,
		details: details as string[],
		takeaway: takeaway as string,
	}));

	readonly changes = [
		{
			label: 'Змінив TS / HTML / CSS',
			steps: 'ng build\nnpx cap sync\nRun у Android Studio / Xcode',
		},
		{
			label: 'Встановив новий plugin',
			steps: 'npm install @capacitor/camera\nnpx cap sync\nRun (потрібен новий native build)',
		},
		{
			label: 'Додаю нову платформу',
			steps: 'ng build\nnpx cap add android\nnpx cap open android',
		},
	];
	readonly selectedChange = signal(0);
	readonly requiredSteps = computed(() => this.changes[this.selectedChange()].steps);
	selectChange(index: number): void {
		this.selectedChange.set(index);
	}
}
