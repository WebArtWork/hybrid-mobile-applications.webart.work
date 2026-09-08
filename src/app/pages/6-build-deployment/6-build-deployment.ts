import { Component } from '@angular/core';
import { ComingSoon } from '../../shared/coming-soon/coming-soon';

@Component({
  selector: 'app-build-deployment',
  imports: [ComingSoon],
  template: `
    <app-coming-soon
      eyebrow="Лекція 6"
      title="Build, Deployment та публікація застосунку"
    />
  `,
})
export class BuildDeployment {}
