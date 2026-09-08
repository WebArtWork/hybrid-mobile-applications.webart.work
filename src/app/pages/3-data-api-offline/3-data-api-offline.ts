import { Component } from '@angular/core';
import { ComingSoon } from '../../shared/coming-soon/coming-soon';

@Component({
  selector: 'app-data-api-offline',
  imports: [ComingSoon],
  template: `
    <app-coming-soon eyebrow="Лекція 3" title="Дані, API, авторизація та Offline" />
  `,
})
export class DataApiOffline {}
