import { Directive, ElementRef, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Directive({
  selector: '[ngxMobilecheck]'
})
export class MobilecheckDirective {

  constructor(private el: ElementRef, private _toastr: ToastrService) { }
  private Lenregex: RegExp = new RegExp(/^[0]?[6789]\d{9}$/);

  @HostListener('focusout')
  onFocusOut() {

    let current: string = this.el.nativeElement.value;
    if (current != "") {
      if (current && !String(current).match(this.Lenregex)) {
        this._toastr.error("Invalid Mobile Number");
        this.el.nativeElement.focus();
      }
    }
  }
}


