import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lecture-list',
  imports: [RouterLink],
  templateUrl: './lecture-list.html',
  styleUrl: './lecture-list.css',
})
export class LectureList {
  readonly lectures = [
    {
      path: 'hybrid-mobile-apps',
      title: 'Гібридні мобільні додатки: архітектура та екосистема',
      description:
        'Native vs Web vs PWA vs Hybrid; WebView; переваги та недоліки; принцип роботи Hybrid; Capacitor/Cordova; роль Angular/React/Vue.',
    },
    {
      path: 'frontend-architecture',
      title: 'Архітектура frontend мобільного застосунку',
      description:
        'структура проєкту; components/pages; routing та navigation; layouts; services; state; forms; API layer; mobile-first та responsive UI; lifecycle; підходи Angular/React/Vue.',
    },
    {
      path: 'data-api-offline',
      title: 'Дані, API, авторизація та Offline',
      description:
        'REST/HTTP; JSON; взаємодія з backend API; authentication та tokens; local/secure storage; IndexedDB/SQLite; caching; offline-first; network state; synchronization; обробка помилок.',
    },
    {
      path: 'native-api',
      title: 'Мобільна платформа, Capacitor та Native API',
      description:
        'архітектура Capacitor; WebView ↔ Native bridge; plugins; permissions; Camera; Geolocation; Files; Haptics; Network; device information; native та web APIs; platform-specific можливості Android/iOS.',
    },
    {
      path: 'hybrid-project-setup',
      title: 'Створення та налаштування Hybrid-проєкту на Angular',
      description:
        'необхідні інструменти; Node.js/npm; Angular CLI; створення Angular-проєкту; запуск та build; встановлення і налаштування Capacitor; додавання Android/iOS; синхронізація web та native projects; Android Studio; Xcode; emulator/simulator; запуск на фізичному пристрої; Firebase setup.',
    },
    {
      path: 'build-deployment',
      title: 'Build, Deployment та публікація застосунку',
      description:
        'production build; environments; Firebase Hosting; Android APK/AAB та signing; Google Play Console; iOS Archive, certificates та provisioning; App Store Connect; testing releases; production releases та оновлення застосунку.',
    },
  ];
}
