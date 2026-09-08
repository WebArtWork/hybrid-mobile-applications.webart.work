import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Presentation } from '../../shared/presentation/presentation';
import { PresentationView } from '../../shared/presentation/presentation-view';
import { VerticalSelection } from '../../shared/presentation/vertical-selection';

@Component({
  selector: 'app-hybrid-mobile-apps',
  imports: [Presentation, PresentationView, NgTemplateOutlet, VerticalSelection],
  templateUrl: './1-hybrid-mobile-apps.html',
  styleUrl: './1-hybrid-mobile-apps.css',
})
export class HybridMobileApps {
  readonly slides = [
    {
      id: 1,
      chapter: 'Архітектура та екосистема',
      title: 'Гібридні мобільні додатки',
      lead: 'Як перетворити web-технології на справжній Android та iOS застосунок',
    },
    {
      id: 2,
      chapter: 'Чотири підходи',
      title: 'Один інтерфейс. Різна архітектура.',
      lead: 'Користувач бачить застосунок. Розробник — спосіб, у який він працює.',
    },
    {
      id: 3,
      chapter: 'Native',
      title: 'Мовою операційної системи.',
      lead: 'Native-застосунок створюють спеціально для конкретної платформи.',
    },
    {
      id: 4,
      chapter: 'Native',
      title: 'Більше контролю. Більше роботи.',
      lead: 'Глибока інтеграція з платформою має свою ціну.',
    },
    {
      id: 5,
      chapter: 'Web',
      title: 'Усе починається з URL.',
      lead: 'Браузер завантажує ресурси та виконує web-застосунок.',
    },
    {
      id: 6,
      chapter: 'Web',
      title: 'Адаптивність ≠ встановлення.',
      lead: 'Гарний інтерфейс на телефоні ще не змінює архітектуру сайту.',
    },
    {
      id: 7,
      chapter: 'PWA',
      title: 'Web із можливостями застосунку.',
      lead: 'Progressive Web App додає встановлення, кешування та інтеграцію з платформою.',
    },
    {
      id: 8,
      chapter: 'PWA · Інтерактивний приклад',
      title: 'Інтернет зник. Що залишилось?',
      lead: 'Service Worker може перехоплювати запити й повертати збережені ресурси.',
    },
    {
      id: 9,
      chapter: 'Hybrid',
      title: 'Web усередині native.',
      lead: 'Web-застосунок + native-контейнер + доступ до можливостей платформи.',
    },
    {
      id: 10,
      chapter: 'WebView',
      title: 'Браузерний рушій. Без браузера.',
      lead: 'WebView — компонент, що відображає web-контент усередині native-застосунку.',
    },
    {
      id: 11,
      chapter: 'Середовище виконання',
      title: 'Два різні шляхи запуску.',
      lead: 'У браузері ми відкриваємо URL. У hybrid — встановлений пакет застосунку.',
    },
    {
      id: 12,
      chapter: 'Native bridge · Інтерактивний приклад',
      title: 'Як JavaScript дістається до GPS?',
      lead: 'Запит проходить через плагін, native-код та API операційної системи.',
    },
    {
      id: 13,
      chapter: 'Можливості пристрою',
      title: 'За межами браузера.',
      lead: 'Плагіни з’єднують web-шар із функціями смартфона.',
    },
    {
      id: 14,
      chapter: 'Інструменти',
      title: 'Capacitor з’єднує два світи.',
      lead: 'Native runtime та міст між готовим web-застосунком і Android / iOS.',
    },
    {
      id: 15,
      chapter: 'Екосистема',
      title: 'Від PhoneGap до сучасного Hybrid.',
      lead: 'Apache Cordova популяризувала модель WebView + native-плагіни.',
    },
    {
      id: 16,
      chapter: 'Frontend',
      title: 'Фреймворк обираєте ви.',
      lead: 'Angular, React і Vue будують application layer. Capacitor — mobile layer.',
    },
    {
      id: 17,
      chapter: 'Спільний код',
      title: 'Одна основа. Декілька платформ.',
      lead: 'Спільна web-кодова база зменшує дублювання UI та бізнес-логіки.',
    },
    {
      id: 18,
      chapter: 'Порівняння',
      title: 'Не переможець. Правильний вибір.',
      lead: 'Архітектуру обирають під продукт, платформу та команду.',
    },
    {
      id: 19,
      chapter: 'Повний шлях',
      title: 'Від коду до телефона.',
      lead: 'Одна кодова база — два потоки доставки: web і mobile.',
    },
    {
      id: 20,
      chapter: 'Підсумок',
      title: 'Тепер ми бачимо, що всередині.',
      lead: 'Сім понять складаються в одну архітектуру.',
    },
  ];

  readonly approaches = [
    { name: 'Native', path: 'Native code → OS', text: 'Код для конкретної платформи.' },
    { name: 'Web', path: 'Browser → Website', text: 'Застосунок у браузері.' },
    { name: 'PWA', path: 'Browser + SW + Manifest', text: 'Web із додатковими можливостями.' },
    { name: 'Hybrid', path: 'Native container + WebView', text: 'Web у native-контейнері.' },
  ];
  readonly layers = [
    {
      name: 'Application UI',
      detail: 'Те, що бачить користувач: екрани, кнопки, форми та взаємодія.',
    },
    {
      name: 'Angular / React / Vue',
      detail: 'Компоненти, стан, маршрутизація й бізнес-логіка застосунку.',
    },
    {
      name: 'HTML + CSS + JavaScript',
      detail: 'Результат frontend build: розмітка, стилі, код і ресурси.',
    },
    {
      name: 'WebView',
      detail: 'Браузерний рушій відображає UI та виконує JavaScript усередині native-застосунку.',
    },
    {
      name: 'Native Container',
      detail:
        'Android / iOS застосунок, який містить WebView, керує життєвим циклом і підключає плагіни.',
    },
    {
      name: 'Native APIs',
      detail:
        'Інтерфейси платформи. Native-код плагіна звертається до них із потрібними дозволами.',
    },
    {
      name: 'Android / iOS',
      detail: 'Операційна система керує процесами, правами доступу та пристроями.',
    },
    { name: 'Hardware', detail: 'Камера, GPS, сховище й датчики. Доступ до них контролює ОС.' },
  ];
  readonly selectedLayer = signal(3);
  readonly online = signal(true);
  readonly cached = signal(false);
  readonly offlineMessage = signal('Натисніть «Завантажити» — спочатку онлайн.');
  loadOfflineDemo(): void {
    if (this.online()) {
      this.cached.set(true);
      this.offlineMessage.set('Дані отримано з мережі. Копію збережено в кеші.');
    } else {
      this.offlineMessage.set(
        this.cached()
          ? 'Збережений розклад завантажено з кешу. Нові дані очікують на мережу.'
          : 'Немає мережі й немає копії в кеші. Розклад недоступний.',
      );
    }
  }
  clearCache(): void {
    this.cached.set(false);
    this.offlineMessage.set('Кеш очищено. Для отримання даних знову потрібна мережа.');
  }
  readonly bridgeStep = signal(0);
  readonly permission = signal(true);
  readonly bridgeLabels = [
    'JavaScript',
    'Capacitor Plugin',
    'Native Android / iOS Code',
    'Operating System API',
    'GPS Hardware',
  ];
  readonly bridgeMessages = [
    'JavaScript викликає Geolocation.getCurrentPosition(). Це навчальна симуляція, без доступу до вашої геолокації.',
    'Плагін передає виклик із JavaScript через native bridge.',
    'Native-реалізація плагіна звертається до служби геолокації платформи.',
    'ОС перевіряє дозвіл користувача на геолокацію.',
    'Служба геолокації отримує позицію. Джерелом можуть бути GPS, Wi-Fi або мобільна мережа.',
    'Результат повертається: OS → native plugin → Promise у JavaScript. Приклад: 50.45, 30.52.',
  ];
  advanceBridge(): void {
    this.bridgeStep.update((step) =>
      step >= 5 || (step === 3 && !this.permission()) ? 0 : step + 1,
    );
  }
  readonly capabilities = [
    { icon: '◎', name: 'Camera', text: 'Фото й відео через API камери та відповідні дозволи.' },
    {
      icon: '⌖',
      name: 'Geolocation',
      text: 'Координати пристрою. Потрібні дозвіл і доступна служба геолокації.',
    },
    { icon: '▱', name: 'Files', text: 'Читання й запис у дозволених директоріях застосунку.' },
    {
      icon: '♧',
      name: 'Notifications',
      text: 'Локальні або push-сповіщення. Push потребує додаткового налаштування сервісів.',
    },
    { icon: '▤', name: 'Storage', text: 'Локальне збереження даних у сховищі ключ-значення на пристрої.' },
    {
      icon: '▣',
      name: 'Device',
      text: 'Інформація про пристрій та ОС у межах обмежень платформи.',
    },
    {
      icon: '↔',
      name: 'Network',
      text: 'Стан мережевого підключення; він не гарантує доступність сервера.',
    },
    {
      icon: '◉',
      name: 'Biometrics',
      text: 'Біометрична перевірка через відповідний сторонній або власний native-плагін.',
    },
    {
      icon: '⌁',
      name: 'Sensors',
      text: 'Дані датчиків руху та орієнтації. Підтримка залежить від пристрою й плагіна.',
    },
    {
      icon: '▤',
      name: 'Clipboard',
      text: 'Робота з буфером обміну з урахуванням правил приватності ОС.',
    },
  ];
  readonly capability = signal(0);
  readonly framework = signal('Angular');
  readonly comparison = [
    ['Встановлення', 'Так', 'Не потрібне', 'Можливе', 'Так'],
    ['Магазини застосунків', 'Так¹', 'Зазвичай ні', 'Залежить від пакування', 'Так¹'],
    ['Web-технології', 'Не обов’язкові', 'Так', 'Так', 'Так'],
    ['API пристрою', 'Native SDK²', 'Web API²', 'Web API²', 'Плагіни / native-код²'],
    ['Offline', 'За реалізацією', 'Можливий із кешем', 'SW + кеш³', 'Локальні ресурси³'],
    [
      'Спільний код',
      'Часто окремий UI',
      'Висока повторність',
      'Висока повторність',
      'Спільний web-шар',
    ],
    ['Запуск браузера', 'Не потрібен', 'Потрібен', 'Можливий standalone', 'Не потрібен'],
  ];
  readonly pipeline = [
    {
      name: 'Frontend-код',
      tag: '01 / Розробка',
      detail:
        'Розробник створює UI та логіку в Angular, React або Vue: HTML, CSS, TypeScript / JavaScript.',
    },
    {
      name: 'Production build',
      tag: '02 / Компіляція',
      detail:
        'Команда збірки компілює TypeScript, оптимізує JavaScript та готує статичні web assets.',
    },
    {
      name: 'Web assets',
      tag: '03 / Спільна точка',
      detail:
        'index.html, CSS, JavaScript і assets. Ці ресурси можна відправити на web-сервер або скопіювати в native-проєкти.',
    },
    {
      name: 'Capacitor sync',
      tag: '04 / Інтеграція',
      detail:
        'npx cap sync копіює готовий web build у Android / iOS проєкти та оновлює native-залежності плагінів.',
    },
    {
      name: 'Native projects',
      tag: '05 / Платформа',
      detail:
        'Android Studio / Gradle для Android; Xcode на macOS для iOS. Налаштовуємо дозволи, ідентифікатори й підпис.',
    },
    {
      name: 'Native build',
      tag: '06 / Пакування',
      detail:
        'Збираємо та тестуємо APK / AAB для Android або iOS archive / IPA для відповідного способу розповсюдження. AAB не встановлюють безпосередньо як APK.',
    },
    {
      name: 'Магазин → телефон',
      tag: '07 / Доставка',
      detail:
        'Підписана release-збірка проходить процедури Google Play / App Store. Після публікації користувач встановлює застосунок.',
    },
  ];
  readonly pipelineStep = signal(0);
  readonly recap = [
    ['Native', 'Код для конкретної платформи.'],
    ['Web', 'Застосунок працює через браузер.'],
    ['PWA', 'Web із додатковими app-like можливостями.'],
    ['Hybrid', 'Web + WebView + native-контейнер.'],
    ['WebView', 'Виконує web-застосунок усередині native.'],
    ['Capacitor', 'З’єднує web і native-платформу.'],
    ['Angular / React / Vue', 'Будують інтерфейс і логіку застосунку.'],
  ];
}
