import { Directive, HostListener, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Directive({
  selector: '[appEmailCheck]'
})
export class EmailCheckDirective {

  constructor(private el: ElementRef, private _toastr: ToastrService) {
  }

  EmailID_REGX = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  @HostListener('focusout')
  onFocusOut() {
    let current: string = this.el.nativeElement.value;
    if (current != "") {
      if (current && !String(current).match(this.EmailID_REGX)) {
        this._toastr.error("Invalid Email ID");
        this.el.nativeElement.focus();
        // this.el.nativeElement.style.border = '1px solid #f3120e';
        //  border: 1px solid #f3120e !important;
      }
    }
  }
}
