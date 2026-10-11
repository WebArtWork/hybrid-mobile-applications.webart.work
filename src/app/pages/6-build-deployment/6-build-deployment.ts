import { Component, computed, signal } from '@angular/core';
import { Presentation } from '../../shared/presentation/presentation';
import { PresentationView } from '../../shared/presentation/presentation-view';

@Component({
	selector: 'app-build-deployment',
	imports: [Presentation, PresentationView],
	templateUrl: './6-build-deployment.html',
	styleUrls: ['../1-hybrid-mobile-apps/1-hybrid-mobile-apps.css', './6-build-deployment.css'],
})
export class BuildDeployment {
	readonly slides = [
		[
			'Лекція 06',
			'Build, Deployment та публікація застосунку',
			'У лекції 5 ми вже зібрали AAB, зробили Archive і роздали збірку через Internal testing та TestFlight. Сьогодні розберемо все, що відділяє тестову збірку від релізу для всіх.',
			['Environments → Hosting → Icons → Versions → Keys → Store page → Review → Rollout → CI/CD'],
			'Тестова збірка працює на телефоні тестера. Реліз має пройти перевірку магазину й безпечно оновлюватися роками.',
		],
		[
			'Environments',
			'Різні налаштування для dev, staging і prod',
			'ng generate environments створює файли, які Angular підміняє під час збірки (fileReplacements в angular.json).',
			[
				'src/environments/environment.ts: production',
				'src/environments/environment.development.ts: ng serve',
				'import { environment } from "../environments/environment"  // один import для всіх режимів',
			],
			'Environment-файли потрапляють у bundle. Серверні ключі та паролі туди не кладуть: їх бачить кожен користувач.',
		],
		[
			'Firebase Hosting',
			'Публікація web-версії',
			'Той самий build можна викласти як web-застосунок або PWA з HTTPS і CDN.',
			[
				'npm install -g firebase-tools · firebase login',
				'firebase init hosting, public directory: dist/catalog-app/browser',
				'Configure as a single-page app: Yes, щоб усі маршрути вели на index.html',
				'firebase deploy --only hosting',
				'firebase hosting:channel:deploy preview (тимчасове посилання для перевірки)',
			],
			'Web-реліз оновлюється миттєво, без review магазину. Native-реліз так не працює.',
		],
		[
			'Іконки та splash',
			'@capacitor/assets',
			'Android та iOS потребують десятків розмірів іконок і splash-екранів. Їх генерують з кількох вихідних файлів.',
			[
				'npm install -D @capacitor/assets',
				'assets/icon-only.png, icon-foreground.png, icon-background.png (від 1024×1024)',
				'assets/splash.png, splash-dark.png (від 2732×2732)',
				'npx capacitor-assets generate: записує ресурси в android/ та ios/',
			],
			'icon-foreground та icon-background потрібні для adaptive icon в Android: система сама обрізає її в коло чи квадрат.',
		],
		[
			'Версії',
			'versionCode, versionName, build number',
			'Магазин відрізняє збірки за номером, а користувач бачить назву версії.',
			[
				'Android (android/app/build.gradle): versionCode 12 (ціле число, лише зростає); versionName "1.3.0"',
				'iOS (Xcode → General): Version 1.3.0 · Build 12; build має зростати',
				'Semantic Versioning: MAJOR.MINOR.PATCH, наприклад 1.3.0 → 1.3.1 для виправлення',
			],
			'Найчастіша помилка завантаження: «versionCode has already been used». Підніміть номер перед кожною збіркою.',
		],
		[
			'Android signing',
			'Keystore та Play App Signing',
			'Оновлення приймається, лише якщо його підписано тим самим ключем, що й попередні версії.',
			[
				'keytool -genkey -v -keystore release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload',
				'npx cap build android --keystorepath release.jks --keystorealias upload --androidreleasetype AAB',
				'Upload key: ваш ключ для завантаження; app signing key зберігає Google і підписує ним збірки для користувачів',
				'release.jks і паролі не зберігають у Git, лише в менеджері паролів або secrets у CI',
			],
			'Втрачений upload key можна скинути через підтримку Play. Без Play App Signing втрата ключа означає, що застосунок більше не оновити.',
		],
		[
			'iOS signing',
			'Certificates та provisioning',
			'Apple перевіряє, хто підписав застосунок і на яких пристроях він може працювати.',
			[
				'Certificate: підтверджує розробника (Apple Development / Apple Distribution)',
				'App ID: bundle id з capacitor.config.ts (com.example.catalog)',
				'Provisioning profile: зв’язує certificate, App ID і пристрої (Development / App Store)',
				'Xcode → Signing & Capabilities → Automatically manage signing',
			],
			'Автоматичний signing закриває більшість випадків. Ручні profiles потрібні переважно для CI.',
		],
		[
			'Сторінка в магазині',
			'Play Console та App Store Connect',
			'Перед першим production-релізом обидва магазини вимагають схожий набір інформації.',
			[
				'Акаунт: Google Play $25 одноразово; Apple Developer Program $99 на рік',
				'Графіка: іконка, скриншоти телефона; для Play ще feature graphic 1024×500',
				'Приватність: Data safety (Play) і App Privacy (Apple), включно з даними, які збирають SDK (Firebase Analytics)',
				'Privacy policy URL, Content rating / Age rating, цільова аудиторія',
				'Google щороку піднімає мінімальний targetSdkVersion для нових релізів',
			],
			'Форма приватності має відповідати реальній поведінці застосунку. Розбіжність сама по собі є причиною відхилення.',
		],
		[
			'Review',
			'Пройде перевірку?',
			'Оберіть ситуацію і подивіться, як на неї відреагує review магазину.',
			[],
			'Більшість відмов передбачувані. Перевірте їх до відправки, а не після.',
		],
		[
			'Після релізу',
			'Розгортання, моніторинг, оновлення',
			'Production-реліз відкривають частині користувачів і стежать за помилками.',
			[
				'Google Play: staged rollout 5% → 20% → 100%, можна зупинити; App Store: phased release на 7 днів',
				'Моніторинг: Firebase Crashlytics, Android vitals, Xcode Organizer',
				'Native-код, plugins, permissions → нова збірка через магазин і review',
				'Лише web-код → live update (OTA): Capgo, Capawesome (без зміни призначення застосунку)',
				'Застарілий API → екран «Оновіть застосунок» з посиланням на магазин',
			],
			'Встановлену збірку відкликати неможливо. Тому backend має підтримувати і старі версії застосунку.',
		],
		[
			'CI/CD',
			'Автоматичний реліз',
			'Ручна збірка на ноутбуці не повторюється. Pipeline у CI робить реліз однаковим щоразу.',
			[
				'Trigger: git tag v1.3.0 → GitHub Actions',
				'npm ci → ng build → npx cap sync → ./gradlew bundleRelease',
				'Keystore та паролі зберігають у GitHub Secrets (keystore як base64)',
				'iOS збирається лише на macOS runner; fastlane match зберігає certificates та profiles',
				'fastlane supply → Google Play · fastlane pilot → TestFlight',
			],
			'Після налаштування реліз зводиться до одного git tag, а ключі не лежать на чиємусь ноутбуці.',
		],
		[
			'Підсумок курсу',
			'Від ідеї до магазину',
			'За шість лекцій ми пройшли повний цикл hybrid-розробки.',
			[
				'Архітектура та frontend → дані, API, offline → Capacitor і Native API',
				'Проєкт: ng new → cap add → cap sync → emulator / device → testing',
				'Реліз: environments → assets → signing → store page → review → rollout',
			],
			'Фінальне завдання: опублікуйте свій застосунок в Internal testing або TestFlight з іконкою, версією 1.0.0 і заповненою формою приватності.',
		],
	].map(([chapter, title, lead, details, takeaway], index) => ({
		id: index + 1,
		chapter: chapter as string,
		title: title as string,
		lead: lead as string,
		details: details as string[],
		takeaway: takeaway as string,
	}));

	readonly environments = [
		{
			label: 'ng serve',
			config: `// environment.development.ts\nexport const environment = {\n  production: false,\n  apiUrl: 'http://localhost:3000/api',\n};`,
		},
		{
			label: 'ng build --configuration staging',
			config: `// environment.staging.ts\nexport const environment = {\n  production: true,\n  apiUrl: 'https://staging.example.com/api',\n};`,
		},
		{
			label: 'ng build',
			config: `// environment.ts\nexport const environment = {\n  production: true,\n  apiUrl: 'https://api.example.com/api',\n};`,
		},
	];
	readonly selectedEnvironment = signal(0);
	readonly environmentConfig = computed(
		() => this.environments[this.selectedEnvironment()].config,
	);

	readonly reviewCases = [
		{
			label: 'Застосунок лише відкриває сайт',
			verdict:
				'Відхилено: Apple 4.2 Minimum Functionality.\nДодайте те, чого немає в браузері: offline, push, камеру, native-навігацію.',
		},
		{
			label: 'Потрібен логін, demo-акаунта немає',
			verdict:
				'Відхилено: Apple 2.1 App Completeness.\nВкажіть demo-акаунт в App Review Information (Play Console: App access).',
		},
		{
			label: 'Реєстрація є, видалення акаунта немає',
			verdict:
				'Відхилено: Apple 5.1.1(v); Google Play теж вимагає видалення акаунта.\nДодайте видалення в застосунку та посилання на web-форму.',
		},
		{
			label: 'Camera без NSCameraUsageDescription',
			verdict:
				'iOS аварійно завершить застосунок під час запиту камери → відхилено.\nДодайте пояснення в ios/App/App/Info.plist.',
		},
		{
			label: 'Native-функції, demo-акаунт, privacy policy',
			verdict:
				'Готово до відправки.\nReview зазвичай триває від кількох годин до кількох днів.',
		},
	];
	readonly selectedReviewCase = signal(0);
	readonly reviewVerdict = computed(() => this.reviewCases[this.selectedReviewCase()].verdict);
}
