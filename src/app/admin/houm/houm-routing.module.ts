import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HoumregistrationComponent} from './houmregistration/houmregistration.component';
import {PaymentComponent} from './payment/payment.component';
import {CongratulationsComponent} from './congratulations/congratulations.component';
import {StatusComponent} from './status/status.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {FaqComponent} from './faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'registration',
    component: HoumregistrationComponent
  },
  {
    path: 'payment/:domain',
    component: PaymentComponent
  },
  {
    path: 'congo/:domain/:domain_pin',
    component: CongratulationsComponent
  },
  {
    path: 'status/:domain',
    component: StatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoumRoutingModule {
}
