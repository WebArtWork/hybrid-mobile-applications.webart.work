import { Component } from '@angular/core';
import { ComingSoon } from '../../shared/coming-soon/coming-soon';

@Component({
  selector: 'app-native-api',
  imports: [ComingSoon],
  template: `
    <app-coming-soon
      eyebrow="Лекція 4"
      title="Мобільна платформа, Capacitor та Native API"
    />
  `,
})
export class NativeApi {}
