import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailCheckDirective } from './email-check.directive';
import { PasswordCheckDirective } from './password-check.directive';
import { MobilecheckDirective } from './mobilecheck.directive';
import { NumberOnlyDirective } from './number-only.directive';
import { AlphaNumericsDirective } from './alpha-numerics.directive';
import { CardnumberCheckDirective } from './cardnumber-check.directive';
import { NoNumericsDirective } from './NoNumericsDirective';

@NgModule({
  declarations: [EmailCheckDirective, PasswordCheckDirective, MobilecheckDirective, NumberOnlyDirective, AlphaNumericsDirective, CardnumberCheckDirective, NoNumericsDirective],
  imports: [
    CommonModule
  ],
  exports: [EmailCheckDirective, PasswordCheckDirective, MobilecheckDirective, NumberOnlyDirective, AlphaNumericsDirective, CardnumberCheckDirective, NoNumericsDirective]
})
export class DirectivesModule { }
