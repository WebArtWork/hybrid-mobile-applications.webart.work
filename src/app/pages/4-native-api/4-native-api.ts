import { Component, computed, signal } from '@angular/core';
import { Presentation } from '../../shared/presentation/presentation';
import { PresentationView } from '../../shared/presentation/presentation-view';

@Component({
	selector: 'app-native-api',
	imports: [Presentation, PresentationView],
	templateUrl: './4-native-api.html',
	styleUrls: ['../1-hybrid-mobile-apps/1-hybrid-mobile-apps.css', './4-native-api.css'],
})
export class NativeApi {
	readonly slides = [
		[
			'Лекція 04',
			'Мобільна платформа, Capacitor та Native API',
			'Як web-код застосунку отримує доступ до камери, геолокації, файлів і сенсорів пристрою.',
			['WebView ↔ Bridge ↔ Native plugin ↔ Android / iOS API'],
			'Приклад: додаток каталогу починає фотографувати товари й показувати їх на карті.',
		],
		[
			'Архітектура',
			'Capacitor: WebView + Native runtime',
			'Застосунок — це один WebView, обгорнутий у нативний проєкт.',
			[
				'Android/iOS app → WebView → ваш web build (dist)',
				'Native runtime реєструє plugins і обробляє їхні виклики',
				'Web-код лишається тим самим кодом, що й у браузері',
			],
			'WebView відображає UI. Усе, чого немає у web platform API, надає native plugin.',
		],
		[
			'Bridge',
			'Виклик з JS у Native і назад',
			'JS не має прямого доступу до Java/Kotlin чи Swift — потрібен місток.',
			[
				'await Camera.getPhoto(options) — виклик у web-коді',
				'Bridge серіалізує повідомлення → Native plugin метод',
				'Native виконує дію (System Camera) → серіалізує результат назад',
				'Proміс у web-коді resolve/reject із результатом',
			],
			'Виклик асинхронний завжди: очікуйте Promise, обробляйте помилку окремо від успіху.',
		],
		[
			'Plugins',
			'Core, community та власні plugins',
			'Кожен native API оформлений як окремий plugin із web- та native-частиною.',
			[
				'Core: @capacitor/camera, @capacitor/geolocation, @capacitor/filesystem …',
				'Community: підтримуються окремими авторами, різна якість і покриття',
				'Custom plugin: власний Android/iOS код, коли готового немає',
			],
			'Перевіряйте підтримку платформ і активність supportу перед вибором community plugin.',
		],
		[
			'Встановлення',
			'npm install → npx cap sync',
			'Web-залежність недостатня: native-проєкт має отримати нативний код plugin.',
			[
				'npm install @capacitor/camera',
				'npx cap sync — копіює web build і оновлює native-проєкти',
				'iOS: pod install відбувається як частина sync',
			],
			'Без cap sync новий plugin не з’явиться в Android Studio / Xcode проєкті.',
		],
		[
			'App',
			'@capacitor/app',
			'Життєвий цикл застосунку, апаратна кнопка «Назад» і deep links.',
			[
				'App.addListener("appStateChange", ({ isActive }) => …) — foreground / background',
				'App.addListener("backButton", () => …) — апаратна кнопка Android',
				'App.addListener("appUrlOpen", ({ url }) => …) — відкриття за deep link',
				'App.exitApp() — лише Android',
			],
			'Обробляйте backButton самі: інакше Android може закрити застосунок там, де очікувалась навігація назад.',
		],
		[
			'Сховище',
			'@capacitor/preferences + @capacitor-community/sqlite',
			'Формат даних визначає, яке сховище підходить.',
			[
				'await Preferences.set({ key: "theme", value: "dark" })',
				'const { value } = await Preferences.get({ key: "theme" })',
				'Preferences → налаштування, feature flags, дрібні рядки (без секретів)',
				'@capacitor-community/sqlite → таблиці, offline outbox, складні запити',
			],
			'Preferences не шифрує вміст — токени та секрети сюди не зберігайте. SQLite потребує власної схеми й міграцій.',
		],
		[
			'Keyboard',
			'@capacitor/keyboard',
			'Клавіатура змінює видиму висоту екрана — застосунок має реагувати.',
			[
				'Keyboard.addListener("keyboardWillShow", ({ keyboardHeight }) => …)',
				'Keyboard.addListener("keyboardWillHide", () => …)',
				'Keyboard.setResizeMode({ mode: KeyboardResize.Body })',
				'Keyboard.hide() — приховати клавіатуру програмно',
			],
			'Оберіть resize mode під layout: екрани з чатом чи формою внизу екрана найчастіше потребують Body/Ionic-режиму.',
		],
		[
			'Permissions',
			'Runtime дозволи Android та iOS',
			'Доступ до камери, геолокації чи файлів система видає лише за згодою користувача.',
			[
				'Маніфест / Info.plist оголошує дозвіл заздалегідь',
				'checkPermissions() → перевірити поточний стан',
				'requestPermissions() → показати системний діалог, якщо стан не визначений',
				'Відмова → системний діалог більше не з’являється автоматично',
			],
			'Пояснюйте навіщо потрібен дозвіл до виклику. Після стійкої відмови ведіть у Налаштування пристрою.',
		],
		[
			'Інтерактивна вправа',
			'Дозвіл на камеру',
			'Натисніть кнопку camera у застосунку каталогу і подивіться на системну реакцію.',
			[],
			'Симуляція runtime permission. Другу відмову система вважає остаточною.',
		],
		[
			'Camera',
			'@capacitor/camera',
			'Один виклик відкриває системну камеру або галерею.',
			[
				'const photo = await Camera.getPhoto({ resultType: CameraResultType.Uri, source: CameraSource.Camera })',
				'source: Camera / Photos / Prompt (вибір користувача)',
				'photo.webPath — можна одразу показати в <img>',
			],
			'CameraResultType.Base64 зручний для одразу відправки, але важчий за пам’яттю на великих фото.',
		],
		[
			'Geolocation',
			'@capacitor/geolocation',
			'Координати мають точність, вартість батареї та можуть бути недоступні.',
			[
				'const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })',
				'pos.coords.latitude / longitude / accuracy',
				'Geolocation.watchPosition(...) — стежити за рухом, не забути clearWatch',
			],
			'enableHighAccuracy збільшує точність і споживання батареї. Обробляйте POSITION_UNAVAILABLE і timeout.',
		],
		[
			'Інтерактивна вправа',
			'Отримати позицію пристрою',
			'Увімкніть GPS, оберіть точність і запитайте координати каталогу.',
			[],
			'Симуляція значень; реальний GPS модуль не використовується.',
		],
		[
			'Filesystem',
			'@capacitor/filesystem',
			'Native-сховище організоване директоріями, а не довільним шляхом диска.',
			[
				'await Filesystem.writeFile({ path: "draft.json", data, directory: Directory.Data })',
				'await Filesystem.readFile({ path: "draft.json", directory: Directory.Data })',
				'Directory.Cache — можна видалити системою; Directory.Data — для стабільних даних',
			],
			'Той самий offline outbox із третьої лекції може зберігати вкладення саме тут.',
		],
		[
			'Push Notifications',
			'@capacitor/push-notifications',
			'Remote push потребує реєстрації пристрою і backend, який надсилає повідомлення.',
			[
				'await PushNotifications.requestPermissions()',
				'await PushNotifications.register()',
				'PushNotifications.addListener("registration", ({ value }) => … → надіслати токен на backend)',
				'PushNotifications.addListener("pushNotificationReceived", (notification) => …)',
			],
			'Android використовує FCM, iOS — APNs. Зберігайте токен на backend і оновлюйте його при зміні.',
		],
		[
			'Device',
			'@capacitor/device',
			'Інформація про пристрій допомагає з діагностикою та адаптацією UI.',
			[
				'const info = await Device.getInfo() — platform, osVersion, model',
				'const id = await Device.getId() — стабільний ідентифікатор інсталяції',
				'const battery = await Device.getBatteryInfo() — batteryLevel, isCharging',
			],
			'platform повертає "web" у браузері — плагіни деградують, а не падають, де це можливо.',
		],
		[
			'Platform-specific',
			'Одна кодова база, різна поведінка',
			'Capacitor.getPlatform() дозволяє гілкувати логіку без дублювання проєкту.',
			[
				'if (Capacitor.getPlatform() === "ios") { /* iOS-виняток */ }',
				'Capacitor.isNativePlatform() — розрізнити native застосунок і звичайний браузер',
				'Web fallback: показати повідомлення замість недоступного native API',
			],
			'Перевіряйте платформу перед викликом plugin, якого немає у web-реалізації.',
		],
		[
			'Підсумок',
			'Від web-виклику до пристрою',
			'Кожен native API проходить один і той самий шлях через bridge.',
			[
				'Web виклик → Bridge → Native plugin → Android/iOS API',
				'Permission → дія (Camera / Geolocation / Filesystem) → результат назад у Promise',
				'Platform check захищає web-версію застосунку',
			],
			'Далі: створення та налаштування Hybrid-проєкту на Angular з нуля.',
		],
	].map(([chapter, title, lead, details, takeaway], index) => ({
		id: index + 1,
		chapter: chapter as string,
		title: title as string,
		lead: lead as string,
		details: details as string[],
		takeaway: takeaway as string,
	}));

	readonly permissionState = signal<'prompt' | 'granted' | 'denied' | 'blocked'>('prompt');
	readonly denialCount = signal(0);
	requestCameraPermission(): void {
		if (this.permissionState() === 'granted') return;
		if (this.permissionState() === 'blocked') return;
		const grant = Math.random() > 0.4;
		if (grant) {
			this.permissionState.set('granted');
		} else {
			const nextDenials = this.denialCount() + 1;
			this.denialCount.set(nextDenials);
			this.permissionState.set(nextDenials >= 2 ? 'blocked' : 'denied');
		}
	}
	resetPermission(): void {
		this.permissionState.set('prompt');
		this.denialCount.set(0);
	}
	readonly permissionMessage = computed(() => {
		switch (this.permissionState()) {
			case 'prompt':
				return 'checkPermissions() → "prompt". Натисніть кнопку, щоб показати системний діалог.';
			case 'granted':
				return 'requestPermissions() → "granted". Camera.getPhoto() тепер відкриє камеру.';
			case 'denied':
				return 'requestPermissions() → "denied". Можна пояснити користувачу і спробувати ще раз.';
			case 'blocked':
				return '"denied" вдруге → система більше не покаже діалог. Ведіть у Налаштування пристрою.';
		}
	});

	readonly gpsEnabled = signal(true);
	readonly highAccuracy = signal(true);
	readonly positionResult = signal(
		'Натисніть «Отримати позицію», щоб побачити результат виклику.',
	);
	getPosition(): void {
		if (!this.gpsEnabled()) {
			this.positionResult.set(
				'GeolocationPositionError: POSITION_UNAVAILABLE\nGPS вимкнено на пристрої.',
			);
			return;
		}
		const accuracy = this.highAccuracy() ? 8 : 65;
		const lat = (49.4229 + (Math.random() - 0.5) * 0.001).toFixed(6);
		const lng = (26.9871 + (Math.random() - 0.5) * 0.001).toFixed(6);
		this.positionResult.set(
			`coords.latitude: ${lat}\ncoords.longitude: ${lng}\ncoords.accuracy: ${accuracy} m`,
		);
	}

	readonly devicePlatform = signal<'web' | 'android' | 'ios'>('android');
	readonly deviceInfo = computed(() => {
		const platform = this.devicePlatform();
		if (platform === 'web') {
			return 'Device.getInfo()\nplatform: "web"\nCapacitor.isNativePlatform(): false\n→ Geolocation працює через browser API; Camera потребує <input type="file">.';
		}
		if (platform === 'android') {
			return 'Device.getInfo()\nplatform: "android"\nosVersion: "14"\nmodel: "Pixel 8"\nCapacitor.isNativePlatform(): true';
		}
		return 'Device.getInfo()\nplatform: "ios"\nosVersion: "17.4"\nmodel: "iPhone 15"\nCapacitor.isNativePlatform(): true';
	});
	selectPlatform(platform: 'web' | 'android' | 'ios'): void {
		this.devicePlatform.set(platform);
	}
}
