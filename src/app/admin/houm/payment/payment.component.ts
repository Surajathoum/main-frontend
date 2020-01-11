/**
 * @author Swaminathan Mathivanan <swami@netalytics.com>
 */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PaymentInfoDialogueComponent } from './payment-info-dialogue/payment-info-dialogue.component';
import { Router, ActivatedRoute } from '@angular/router';
import { WindowRef } from '../../../_services/WindowRef';
import { BaseRequestService } from '../../../_services/base.service';
import { LoaderService } from '../../../_services/loader.service';
import { PlatformLocation } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  razorpay_client_key = environment.razorpay_live_key;
  stripe_client_key = environment.stripe_live_key;
  constructor(public dialog: MatDialog, private winRef: WindowRef,
              private routeParms: ActivatedRoute, readonly router: Router, public baseService: BaseRequestService,
              private loaderService: LoaderService, location: PlatformLocation) {
    location.onPopState(() => {
      this.loaderService.setOption(3);
      this.router.navigateByUrl('/houm');
    });
  }
  loaderenable = false;
  paymentDone = false;
  houmInfo: any;
  paymentVals: any = [];
  monthList: any = [];
  yearList: any = [];
  isTransactionFailed = false;
  isTransactionSuccess = false;
  isTransactionLoading = false;
  processingMsg = 'Processing your payment. Please wait...';
  redirectMsg = false;
  cardInfoObj = new CardInfo();
  ngOnInit() {
    this.houmInfo = {
      name: '',
      storage: { value: '100', notation: 'GB', type: 'Default Storage' }
    };
    this.routeParms.params.subscribe(res => {
      if (res != null && res.domain) {
        this.houmInfo.name = res.domain;
        // this.baseService.houmObj = {"contact":{"firstName":"swami","lastName":"","country":"India","emailId":"swami@asdasdf.com"},"indicator":"US $","price":"1.29","totalAmount":"4.10","freeDomain":true,"basehoumprice":"2.99","taxAmount":"1.2","domainName":"pinaka.trade"} ;
        if (!this.baseService.houmObj || !this.baseService.houmObj.price) {
          this.router.navigateByUrl('/houm/registration');
          return false;
        }
        if (!this.baseService.houmObj.freeDomain) {
          this.paymentVals = [
            { type: 'Domain & Base Houm', indicator: this.baseService.houmObj.indicator,
              val: (this.baseService.houmObj.price + this.baseService.houmObj.basehoumprice).toFixed(2)},
            { type: 'Early Bird Waiver', indicator: this.baseService.houmObj.indicator,
              val: -this.baseService.houmObj.basehoumprice },
            { type: 'Taxes', indicator: this.baseService.houmObj.indicator,
              val: this.baseService.houmObj.taxAmount },
            { type: 'Total', indicator: this.baseService.houmObj.indicator,
              val: this.baseService.houmObj.totalAmount }
          ];
        } else {
          this.paymentVals = [
            { type: 'Domain & Base Houm', indicator: this.baseService.houmObj.indicator,
              val: this.baseService.houmObj.basehoumprice},
            { type: 'Early Bird Waiver', indicator: this.baseService.houmObj.indicator,
              val: -this.baseService.houmObj.basehoumprice },
            { type: 'Taxes',  indicator: this.baseService.houmObj.indicator, val: '0.00' },
            { type: 'Total',  indicator: this.baseService.houmObj.indicator, val: '0.00' }
          ];
        }
      } else {
        this.router.navigateByUrl('/houm/registration');
        return false;
      }
    });
    this.monthList = [{ name: 'January', value: 0 },
    { name: 'February', value: 0 },
    { name: 'March', value: 0 }, { name: 'April', value: 0 },
    { name: 'May', value: 0 }, { name: 'June', value: 0 },
    { name: 'July', value: 0 }, { name: 'August', value: 0 },
    { name: 'September', value: 0 }, { name: 'October', value: 0 },
    { name: 'November', value: 0 }, { name: 'December', value: 0 }];

    this.yearList = ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'];
  }
  proceedToBuild() {
    if (this.baseService.houmObj.freeDomain) {
      this.buildFreeHoum(this.baseService.houmObj.freeDomain);
    } else {
      this.loaderenable = true;
      this.baseService.houmObj.contact.lastName = (this.baseService.houmObj.contact.lastName) ?
        this.baseService.houmObj.contact.lastName : '';
      if (this.baseService.houmObj.contact.country === 'India') {
        this.payWithRazor();
      } else {
        this.payWithStripe();
      }
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PaymentInfoDialogueComponent, {
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  payWithStripe() {
    const stripe = new this.winRef.nativeWindow.StripeCheckout.configure({
      key: this.stripe_client_key,
      locale: 'auto',
      token: (token => {
        this.paymentDone = true;
        this.baseService.houmObj.chargeType = 'stripe';
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.chargeStripeCustomer(token);
      })
    });
    this.loaderenable = false;
    stripe.open({
      name: 'Houm Technology Singapore Pte. Ltd.',
      description: '~ Feel At Houm ~',
      amount: +(this.baseService.houmObj.total * 100).toFixed(0),
      currency: this.baseService.houmObj.currency.toLowerCase(),
      closed: ((status) => {
        console.log(status);
      })
    });
  }

  payWithRazor() {
    this.baseService.houmObj.cardDetail = {};
    this.baseService.houmObj.addressDetail = {};
    const options: any = {
      key: this.razorpay_client_key,
      amount: +(this.baseService.houmObj.totalAmount * 100).toFixed(0),
      order_id: this.baseService.houmObj.order_id,
      name: 'Houm Technology Singapore Pte. Ltd.',
      description: '~ Feel At Houm ~',
      image: '/assets/images/houm_pg_logo.png',
      modal: {
        escape: false
      },
      prefill: {
        name: this.baseService.houmObj.contact.firstName + ' ' + this.baseService.houmObj.contact.lastName,
        contact: '',
        email: this.baseService.houmObj.contact.emailId,
        method: 'card',
        'card[number]': this.baseService.houmObj.cardDetail.cardNumber,
        'card[expiry]': this.baseService.houmObj.cardDetail.cardExpDate,
        'card[cvv]': this.baseService.houmObj.cardDetail.cardCvv
      },
      notes: {
        address: this.baseService.houmObj.addressDetail.address + ', ' + this.baseService.houmObj.addressDetail.landmark + ', ' +
          this.baseService.houmObj.addressDetail.city + ', ' + this.baseService.houmObj.addressDetail.state + '-' +
          this.baseService.houmObj.addressDetail.pincode
      },
      theme: {
        color: '#580196'
      }
    };
    options.handler = ((response) => {
      console.log(response);
      options.payment_response_id = response.razorpay_payment_id;
      this.baseService.houmObj.chargeType = 'razorpay';
      this.chargeRazorCustomer(response);
    });
    options.modal.ondismiss = (() => {
      // this.baseService.houmObj.paymentPage = true;
      // this.router.navigateByUrl('/houm/registration');
      return false;
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
    this.loaderenable = false;
  }
  chargeRazorCustomer(resp) {
    this.isTransactionLoading = true;
    this.baseService.doRequest(`/dev/charge`, 'post', resp)
      .subscribe(result => {
        if (result.status) {
          console.log('buy_domain');
          console.log(result.msg);
          if (result.msg.status === 'captured') {
            // TODO:
            this.baseService.houmObj.paymentData = { amount: this.baseService.houmObj.total, id: result.msg.id };
            this.buildHoum();
          }
        } else {
          this.isTransactionLoading = false;
          alert('Payment Error');
        }
      });
  }

  chargeStripeCustomer(resp) {
    this.isTransactionLoading = true;
    this.baseService.doRequest(`/dev/charge_stripe`, 'post',
      { domain: this.baseService.houmObj.domainName, token: resp.id, totalAmount: this.baseService.houmObj.totalAmount,
        country: this.baseService.houmObj.contact.country })
      .subscribe(result => {
        if (result.status) {
          // this.buy_domain;
          console.log('buy_domain');
          console.log(result.msg);
          if (result.msg.status === 'succeeded') {
            this.baseService.houmObj.paymentData = { amount: this.baseService.houmObj.total, id: result.msg.id };
            // TODO:
            this.buildHoum();
            // this.sendInvoice();
          }
        } else {
          this.isTransactionLoading = false;
          alert('Payment Error');
        }
      });
  }

  saveDetails(data: any) {
    // this.redirectMsg = true;
    // TODO: Payment Gateway Integration
    this.payWithRazor();
    //
  }
  sendInvoice() {
    const contact = this.baseService.houmObj.contact;
    const tax = this.baseService.countryWiseTax[contact.country];
    const data = {
      domain: this.baseService.houmObj.domainName,
      email: this.baseService.houmObj.contact.emailId,
      paymentData: this.baseService.houmObj.paymentData,
      chargeType: this.baseService.houmObj.chargeType, indicator: tax.indicator, address: contact.country, firstName: contact.firstName,
      totalAmount: this.baseService.houmObj.totalAmount, taxAmount: this.baseService.houmObj.taxAmount
    };
    this.baseService.doRequest(`/dev/send_invoicemail`, 'post', data).subscribe(result => {
      console.log(result);
      /*// TODO: Need to remove the below section.
      this.isTransactionSuccess = true;
      this.baseService.houmObj.domain_pin = 1234;
      setTimeout(() => {
        this.router.navigateByUrl('/status/' + this.houmInfo.name);
      }, 3000);
      return false;
      // TODO: Need to remove the above section.*/
    });
  }
  buildFreeHoum(data) {
    this.processingMsg = 'Building ' + this.baseService.houmObj.domainName + '. Please wait...';
    this.loaderenable = true; this.isTransactionLoading = true;
    this.baseService.doRequest(`/dev/buy_domain`, 'post', {
      domain: this.baseService.houmObj.domainName,
      email: this.baseService.houmObj.contact.emailId,
      firstName: this.baseService.houmObj.contact.firstName,
      lastName: this.baseService.houmObj.contact.lastName,
      country: this.baseService.houmObj.contact.country
    }).subscribe(resp => {
      if (resp) {
        this.isTransactionLoading = false;
        this.loaderenable = false;
        if (resp.status) {
          /*this.showfreeloader = false;*/
          this.baseService.houmObj.domain_pin = resp.msg.domain_pin;
          localStorage.setItem('domainData', JSON.stringify(this.baseService.houmObj));
          this.router.navigateByUrl('/status/' + data.domainName);
          return false;
        } else {
          alert('Domain Already Exist');
          return false;
        }
      } else {
        alert('Error occured');
      }
    });
  }
  buildHoum() {
    this.isTransactionLoading = true;
    this.baseService.doRequest(`/dev/buy_domain`, 'post', {
      domain: this.baseService.houmObj.domainName,
      email: this.baseService.houmObj.contact.emailId,
      firstName: this.baseService.houmObj.contact.firstName,
      lastName: this.baseService.houmObj.contact.lastName,
      country: this.baseService.houmObj.contact.country
    }).subscribe(resp => {
      if (resp) {
        this.isTransactionLoading = false;
        if (resp.status) {
          // Sending Invoice Email
          this.sendInvoice();
          this.isTransactionSuccess = true;
          this.baseService.houmObj.domain_pin = resp.msg.domain_pin;
          localStorage.setItem('domainData', JSON.stringify(this.baseService.houmObj));
          setTimeout(() => {
            this.router.navigateByUrl('/status/' + this.houmInfo.name);
          }, 5000);
          return false;
        } else {
          alert('Domain Already Exist');
          return false;
        }
      } else {
        alert('Error occured');
      }
    });
  }

  tryAgain() {
    this.isTransactionLoading = false;
    this.isTransactionFailed = false;
    this.isTransactionSuccess = false;
  }
  backtoMainpage() {
    this.loaderService.setOption(3);
    this.baseService.houmObj.paymentPage = true;
    this.router.navigateByUrl('/houm/registration');
  }
}

export class CardInfo {
  cardNo: number;
  ownerName: string;
  month: number;
  year: number;
  cvv: number;
}
