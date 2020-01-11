import { Directive, ElementRef, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Directive({
  selector: '[appCardnumberCheck]'
})
export class CardnumberCheckDirective {

  constructor(private el: ElementRef, private _toastr: ToastrService) { }
  private regex: RegExp = new RegExp(/^[0-9]+([0-9]*){0,1}$/g);

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
      }else{
         //return current.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
        return current.replace(/(.{4})/g, '$1 ');
      }
    }
  }
}
  // $('#credit-card').on('keypress change blur', function () {
  //   $(this).val(function (index, value) {
  //     return value.replace(/[^a-z0-9]+/gi, '').replace(/(.{4})/g, '$1 ');
  //   });
  // });

  // $('#credit-card').on('copy cut paste', function () {
  //   setTimeout(function () {
  //     $('#credit-card').trigger("change");
  //   });
  // });

