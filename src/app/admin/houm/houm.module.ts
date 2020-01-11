import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import { AppFilterPipeModule } from '../../_filters/app.filter-pipe.module';
import { HoumRoutingModule } from './houm-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HoumregistrationComponent } from './houmregistration/houmregistration.component';
import { DirectivesModule } from 'src/app/-directives/-directives.module';
import { PaymentComponent } from './payment/payment.component';
import { PaymentInfoDialogueComponent } from './payment/payment-info-dialogue/payment-info-dialogue.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { StatusComponent } from './status/status.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyComponent } from './privacy/privacy.component';
@NgModule({
  imports: [
    CommonModule, FormModule, ReactiveFormsModule,
    HoumRoutingModule, FlexLayoutModule,
    MaterialModule, AppFilterPipeModule,
    SharedModule,
    DirectivesModule
  ],
  declarations: [HomeComponent, HoumregistrationComponent, PaymentComponent,
    PaymentInfoDialogueComponent, CongratulationsComponent, StatusComponent, AboutusComponent, FaqComponent, PrivacyComponent],
  // exports:[PaymentInfoDialogueComponent],
  entryComponents: [PaymentInfoDialogueComponent]
})
export class HoumModule { }
