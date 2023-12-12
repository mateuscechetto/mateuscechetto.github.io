import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Inject, Output } from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
    selector: '[clickOutside]',
    standalone: true
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  documentClickSubscription: Subscription | undefined;

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngAfterViewInit() {
    this.documentClickSubscription = fromEvent(this.document, 'click')
      .pipe(
        filter((event) => {
          return !this.isInside(event.target as HTMLElement);
        })
      )
      .subscribe(() => {
        this.clickOutside.emit();
      });
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement ||
      this.element.nativeElement.contains(elementToCheck)
    );
  }

  ngOnDestroy() {
    this.documentClickSubscription?.unsubscribe();
  }

}
