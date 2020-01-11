import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[ngxNumberOnly]'
})
export class NumberOnlyDirective implements OnInit {

  private regex: RegExp = new RegExp(/^[0-9]+([0-9]*){0,1}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
      // Allow: Ctrl+V
      (event.ctrlKey == true && (event.which == 118 || event.which == 86)) ||
      // Allow: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)) {
      return;
    }
    else {
      let current: string = this.el.nativeElement.value;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
  }

  ngOnInit() {

  }
}
