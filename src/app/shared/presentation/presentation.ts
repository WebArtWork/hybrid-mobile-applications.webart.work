import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  afterRenderEffect,
  Component,
  computed,
  contentChildren,
  ElementRef,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { PresentationView } from './presentation-view';

@Component({
  selector: 'app-presentation',
  imports: [NgTemplateOutlet],
  host: {
    '(document:keydown)': 'onKeydown($event)',
    '(touchstart)': 'onTouchStart($event)',
    '(touchend)': 'onTouchEnd($event)',
    '(touchcancel)': 'cancelTouch()',
  },
  template: `
    <main #viewport aria-label="Лекція" aria-roledescription="презентація">
      @for (view of activeView() ? [activeView()!] : []; track view) {
        <section
          #slideContent
          role="group"
          aria-roledescription="слайд"
          [attr.aria-label]="index() + 1 + ' / ' + views().length"
        >
          <ng-container [ngTemplateOutlet]="view.template" />
        </section>
      }
    </main>
    <div
      class="presentation-controls"
      role="navigation"
      aria-label="Навігація лекцією"
      data-presentation-controls
    >
      <button
        type="button"
        (click)="previous()"
        [disabled]="index() === 0"
        aria-label="Попередній слайд"
        title="Попередній слайд (←)"
      >
        ←
      </button>
      <span aria-live="polite" aria-atomic="true"
        >{{ index() + 1 }} <span class="divider">/</span> {{ views().length }}</span
      >
      <button
        type="button"
        (click)="next()"
        [disabled]="index() >= views().length - 1"
        aria-label="Наступний слайд"
        title="Наступний слайд (→)"
      >
        →
      </button>
    </div>
    <div class="progress-track" aria-hidden="true">
      <div [style.width.%]="views().length ? ((index() + 1) / views().length) * 100 : 0"></div>
    </div>
  `,
  styleUrl: './presentation.css',
})
export class Presentation {
  private readonly document = inject(DOCUMENT);
  readonly storageKey = input(`presentation:view:${this.document.location?.pathname ?? '/'}`);
  readonly views = contentChildren(PresentationView);
  readonly index = signal(0);
  readonly activeView = computed(() => this.views()[this.index()]);
  private readonly viewport = viewChild<ElementRef<HTMLElement>>('viewport');
  private readonly slideContent = viewChild<ElementRef<HTMLElement>>('slideContent');
  private touch: { x: number; y: number } | null = null;

  constructor() {
    let restoredKey: string | undefined;
    effect(() => {
      const key = this.storageKey();
      const count = this.views().length;
      if (!count || restoredKey === key) return;
      restoredKey = key;
      let view = 1;
      try {
        const saved = this.document.defaultView?.localStorage.getItem(key);
        if (saved && /^[1-9]\d*$/.test(saved) && Number.isSafeInteger(Number(saved))) {
          view = Math.min(Number(saved), count);
        }
      } catch {
        // Presentations still work when browser storage is unavailable.
      }
      this.index.set(view - 1);
    });

    afterRenderEffect((onCleanup) => {
      const viewport = this.viewport()?.nativeElement;
      const content = this.slideContent()?.nativeElement;
      if (!viewport || !content || typeof ResizeObserver === 'undefined') return;

      // Measure the natural layout, then scale the complete slide into the stage.
      // Transforms do not change the observed layout size, avoiding resize loops.
      const fit = () => {
        const availableHeight = viewport.clientHeight;
        viewport.style.setProperty('--presentation-height', `${availableHeight}px`);
        const scale = Math.min(
          1,
          availableHeight / Math.max(1, content.offsetHeight),
          viewport.clientWidth / Math.max(1, content.scrollWidth),
        );
        content.style.setProperty('--slide-scale', String(scale));
      };
      const observer = new ResizeObserver(fit);
      observer.observe(viewport);
      observer.observe(content);
      fit();
      onCleanup(() => observer.disconnect());
    });
  }

  next(): void {
    this.goTo(Math.min(this.index() + 1, Math.max(0, this.views().length - 1)));
  }

  previous(): void {
    this.goTo(Math.max(0, this.index() - 1));
  }

  private goTo(index: number): void {
    if (index === this.index()) return;
    this.index.set(index);
    try {
      this.document.defaultView?.localStorage.setItem(this.storageKey(), String(index + 1));
    } catch {
      // Storage restrictions must not interrupt slide navigation.
    }
    const viewport = this.viewport()?.nativeElement;
    if (viewport) viewport.scrollTop = 0;
  }

  protected cancelTouch(): void {
    this.touch = null;
  }

  protected onTouchStart(event: TouchEvent): void {
    this.touch = null;
    const target = event.target;
    if (
      event.touches.length !== 1 ||
      (target instanceof HTMLElement &&
        target.closest('button, a, input, textarea, select, [contenteditable], [data-no-swipe]'))
    )
      return;
    this.touch = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }

  protected onTouchEnd(event: TouchEvent): void {
    if (!this.touch || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - this.touch.x;
    const dy = event.changedTouches[0].clientY - this.touch.y;
    this.touch = null;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) this.next();
    else this.previous();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      !target.closest('[data-presentation-controls]') &&
      target.closest(
        'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="slider"], [role="textbox"], [data-no-swipe]',
      )
    )
      return;
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    if (event.repeat) return;
    if (event.key === 'ArrowRight') this.next();
    else this.previous();
  }
}
