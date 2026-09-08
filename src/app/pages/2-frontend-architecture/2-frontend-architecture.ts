import { Component } from '@angular/core';
import { ComingSoon } from '../../shared/coming-soon/coming-soon';

@Component({
  selector: 'app-frontend-architecture',
  imports: [ComingSoon],
  template: `
    <app-coming-soon
      eyebrow="Лекція 2"
      title="Архітектура frontend мобільного застосунку"
    />
  `,
})
export class FrontendArchitecture {}
