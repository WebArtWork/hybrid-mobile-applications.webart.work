import { Routes } from '@angular/router';
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
    title: 'Гібридні мобільні додатки — Курс',
  },
  {
    path: 'hybrid-mobile-apps',
    component: HybridMobileApps,
    title: 'Гібридні мобільні додатки — Архітектура та екосистема',
  },
  {
    path: 'frontend-architecture',
    component: FrontendArchitecture,
    title: 'Архітектура frontend мобільного застосунку',
  },
  {
    path: 'data-api-offline',
    component: DataApiOffline,
    title: 'Дані, API, авторизація та Offline',
  },
  {
    path: 'native-api',
    component: NativeApi,
    title: 'Мобільна платформа, Capacitor та Native API',
  },
  {
    path: 'hybrid-project-setup',
    component: HybridProjectSetup,
    title: 'Створення та налаштування Hybrid-проєкту на Angular',
  },
  {
    path: 'build-deployment',
    component: BuildDeployment,
    title: 'Build, Deployment та публікація застосунку',
  },
  { path: '**', redirectTo: '' },
];
