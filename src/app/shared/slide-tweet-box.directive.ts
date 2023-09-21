import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSlideTweetBox]'
})
export class SlideTweetBoxDirective {

  private isHidden = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollPosition = window.scrollY || window.scrollY;

    // Add or remove the 'hidden' class based on the scroll position
    if (scrollPosition > 100 && !this.isHidden) {
      this.renderer.addClass(this.el.nativeElement, 'hidden');
      this.isHidden = true;
    } else if (scrollPosition <= 100 && this.isHidden) {
      this.renderer.removeClass(this.el.nativeElement, 'hidden');
      this.isHidden = false;
    }
  }
}
