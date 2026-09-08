import { Component, input } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.html',
  styleUrl: './coming-soon.css',
})
export class ComingSoon {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
}
