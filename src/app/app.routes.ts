import { Routes } from '@angular/router';
import { SEO_IMAGES } from './shared/seo/seo-images';
import { LectureList } from './pages/lecture-list/lecture-list';
import { HybridMobileApps } from './pages/1-hybrid-mobile-apps/1-hybrid-mobile-apps';
import { FrontendArchitecture } from './pages/2-frontend-architecture/2-frontend-architecture';
import { DataApiOffline } from './pages/3-data-api-offline/3-data-api-offline';
import { NativeApi } from './pages/4-native-api/4-native-api';
import { HybridProjectSetup } from './pages/5-hybrid-project-setup/5-hybrid-project-setup';
import { BuildDeployment } from './pages/6-build-deployment/6-build-deployment';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: LectureList,
		title: 'Курс «Гібридні мобільні додатки» — програма лекцій',
		data: {
			image: SEO_IMAGES.index,
			description:
				'Курс із розробки гібридних мобільних застосунків на Angular та Capacitor: архітектура, native API, offline-режим, збірка та публікація в Google Play й App Store.',
		},
	},
	{
		path: 'hybrid-mobile-apps',
		component: HybridMobileApps,
		title: 'Гібридні мобільні додатки: архітектура та екосистема — Лекція 1',
		data: {
			image: SEO_IMAGES.hybrid,
			description:
				'Native vs Web vs PWA vs Hybrid, принцип роботи WebView, переваги й недоліки гібридного підходу, Capacitor/Cordova та роль Angular, React і Vue.',
		},
	},
	{
		path: 'frontend-architecture',
		component: FrontendArchitecture,
		title: 'Архітектура frontend мобільного застосунку — Лекція 2',
		data: {
			image: SEO_IMAGES.frontend,
			description:
				'Структура проєкту, components/pages, routing та navigation, layouts, services, state, forms, API layer, mobile-first UI та підходи Angular, React і Vue.',
		},
	},
	{
		path: 'data-api-offline',
		component: DataApiOffline,
		title: 'Дані, API, авторизація та Offline — Лекція 3',
		data: {
			image: SEO_IMAGES.data,
			description:
				'REST/HTTP, JSON, взаємодія з backend API, автентифікація й токени, local/secure storage, IndexedDB/SQLite, кешування, offline-first та синхронізація.',
		},
	},
	{
		path: 'native-api',
		component: NativeApi,
		title: 'Мобільна платформа, Capacitor та Native API — Лекція 4',
		data: {
			image: SEO_IMAGES.native,
			description:
				'Архітектура Capacitor, WebView ↔ Native bridge, плагіни й дозволи, Camera, Geolocation, Files, Network та platform-specific можливості Android/iOS.',
		},
	},
	{
		path: 'hybrid-project-setup',
		component: HybridProjectSetup,
		title: 'Створення Hybrid-проєкту на Angular — Лекція 5',
		data: {
			image: SEO_IMAGES.setup,
			description:
				'Налаштування Angular CLI та Capacitor, додавання Android/iOS, синхронізація web і native projects, Android Studio, Xcode, emulator/simulator та запуск на пристрої.',
		},
	},
	{
		path: 'build-deployment',
		component: BuildDeployment,
		title: 'Build, Deployment та публікація застосунку — Лекція 6',
		data: {
			image: SEO_IMAGES.deployment,
			description:
				'Production build, environments, Firebase Hosting, Android APK/AAB та signing, Google Play Console, iOS Archive, App Store Connect і оновлення застосунку.',
		},
	},
	{ path: '**', redirectTo: '' },
];
