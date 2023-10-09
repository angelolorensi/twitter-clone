import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAutoResizeTextarea]'
})
export class AutoResizeTextareaDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement): void {
    this.adjustTextareaHeight(textarea);
  }

  ngOnInit() {
    // Ensure the textarea is initially sized properly
    this.adjustTextareaHeight(this.el.nativeElement);
  }

  private adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.overflow = 'hidden'; // Hide any overflowing content
    textarea.style.height = 'auto'; // Reset the height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  }
}
