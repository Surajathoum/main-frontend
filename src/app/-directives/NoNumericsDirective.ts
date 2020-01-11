import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[ngxNoNumerics]'
})
export class NoNumericsDirective {
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
  constructor(private el: ElementRef) {
  }
  private regex: RegExp = new RegExp(/^[a-zA-Z ]+$/);
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next.length > 0 && String(next) == " ") {
      event.preventDefault();
    }
    else if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
