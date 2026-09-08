import { Component } from '@angular/core';
import { ComingSoon } from '../../shared/coming-soon/coming-soon';

@Component({
  selector: 'app-hybrid-project-setup',
  imports: [ComingSoon],
  template: `
    <app-coming-soon
      eyebrow="Лекція 5"
      title="Створення та налаштування Hybrid-проєкту на Angular"
    />
  `,
})
export class HybridProjectSetup {}
