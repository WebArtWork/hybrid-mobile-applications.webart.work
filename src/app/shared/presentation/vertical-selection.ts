import { Directive, ElementRef, inject } from '@angular/core';

/** Arrow navigation for a selection list in the currently rendered slide. */
@Directive({
  selector: '[presentationVerticalSelection]',
  host: { '(document:keydown)': 'onKeydown($event)' },
})
export class VerticalSelection {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  protected onKeydown(event: KeyboardEvent): void {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')
    )
      return;
    if (
      event.target instanceof HTMLElement &&
      event.target.closest(
        'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="slider"], [role="textbox"]',
      )
    )
      return;

    const buttons = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLButtonElement>(
        'button[aria-pressed]:not(:disabled)',
      ),
    );
    if (!buttons.length) return;
    event.preventDefault();
    const current = buttons.findIndex((button) => button.getAttribute('aria-pressed') === 'true');
    const next = Math.max(
      0,
      Math.min(buttons.length - 1, current + (event.key === 'ArrowDown' ? 1 : -1)),
    );
    buttons[next].click();
    buttons[next].focus({ preventScroll: true });
  }
}
