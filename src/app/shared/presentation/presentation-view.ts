import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({ selector: 'ng-template[presentationView]' })
export class PresentationView {
  readonly template = inject(TemplateRef<unknown>);
}
