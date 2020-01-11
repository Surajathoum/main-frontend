import { Directive, HostListener, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Directive({
  selector: '[appPasswordCheck]'
})
export class PasswordCheckDirective {

  constructor(private el:ElementRef, private _toastr:ToastrService) { }

  PASSWORD_REGX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_-])[0-9a-zA-Z!@#$%_-](?=.{7,13})');

  @HostListener('focusout')

  onFocusOut(){
    let current: string = this.el.nativeElement.value;
    if (current != "") {
      if (current && !String(current).match(this.PASSWORD_REGX)) {
       this._toastr.error("Invalid Password. The password must contain atleast 8 to 13 characters without spaces at the beginning and end. It must contain one uppercase,lowercase,number and special characters(!@#$%_-)");
       this.el.nativeElement.focus();
       return false;
      }
    } 
  }
}
