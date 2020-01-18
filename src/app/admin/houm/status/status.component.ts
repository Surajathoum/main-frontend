/**
 * @author Swaminathan Mathivanan <swami@netalytics.com>
 */
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { MatStepper, MatHorizontalStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseRequestService } from '../../../_services/base.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, AfterViewInit, OnDestroy {
  apigw = environment.apigw;
  constructor(private routeParms: ActivatedRoute, private renderer: Renderer2,
              readonly router: Router, public baseService: BaseRequestService) { }
  houmInfo: any;
  intervalId: any;
  domain_pin: any;
  @ViewChild('stepper', { static: true }) stepper: MatHorizontalStepper;
  @ViewChild('steppermbl', { static: true }) steppermbl: MatHorizontalStepper;
  @ViewChild('circle', {static: true}) circle: ElementRef;
  isLonger = false;
  timerSec = 180;
  initialOffset = 440;
  timerInterval = 0;
  stepperCount = 0;
  stepperInterval: any;
  checkDomain: any;
  ngOnInit() {
    this.houmInfo = {
      name: '',
      storage: { value: '100', notation: 'GB', type: 'Default Storage' }
    };
    this.routeParms.params.subscribe(res => {
      if (res != null && res.domain) {
        this.houmInfo.name = res.domain;
        this.domain_pin = this.baseService.houmObj.domain_pin;
      }
    });
    if (!this.domain_pin && localStorage.getItem('domainData') && localStorage.getItem('domainData') !== null) {
        this.baseService.houmObj = JSON.parse(localStorage.getItem('domainData'));
        this.houmInfo.name = this.baseService.houmObj.domainName;
        this.domain_pin = this.baseService.houmObj.domain_pin;
    }
    if (localStorage.getItem('timerSec') && localStorage.getItem('timerSec') !== null) {
      this.timerSec = +localStorage.getItem('timerSec');
    }
    this.timerTick();
    setTimeout(() => { this.imagestep(); }, 3000);
    this.checkDomain = setInterval(() => { this.domainStatus(); }, 30000);
    this.nginx_config();
  }
  ngAfterViewInit() {
    /*this.renderer.setStyle(this.circle.nativeElement,
      'stroke-dashoffset', this.initialOffset - ( 1 * ( this.initialOffset / this.timerSec)));*/
  }
  nginx_config() {
    this.baseService.doRequest(`${this.apigw}/nginx_config`, 'post', {domain: this.houmInfo.name}).subscribe(result => {
      console.log('webserver config called' + result);
    });
  }
  imagestep() {
    if (this.stepperCount === 3) {
      this.stepperInterval = undefined;
      return false;
    } else {
      this.stepper.next();
      this.steppermbl.next();
      this.stepperCount++;
    }
    /*this.stepperInterval = setTimeout(() => {
      if (this.stepperCount < 4) {
        if (this.stepperCount === 3) {
          this.stepperInterval = undefined;
          clearTimeout(this.stepperInterval);
          return false;
        }
        this.imagestep();
      } else {
        this.stepperInterval = undefined;
        clearTimeout(this.stepperInterval);
        return false;
      }
    }, 50000);*/
  }

  timerTick() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.intervalId = setTimeout(() => {
      this.timerSec--;
      localStorage.setItem('timer', this.timerSec + '');
      if (this.timerSec === 0) {
        this.domainStatus();
      } else {
        this.timerTick();
      }
      /*this.renderer.setStyle(this.circle.nativeElement, 'stroke-dashoffset',
        this.initialOffset - (( this.timerInterval + 1 ) * ( this.initialOffset / this.timerSec)));*/
      this.timerInterval++;
    }, 1000);
  }

  domainStatus() {
    this.baseService.doRequest(`${this.apigw}/get_domain_status`, 'post', {domain: this.baseService.houmObj.domainName.toLowerCase()})
      .subscribe(resp => {
      if (resp.status) {
        this.stepper.selectedIndex = 3;
        this.steppermbl.selectedIndex = 3;
        this.ngOnDestroy();
        setTimeout(() => {
         this.router.navigateByUrl('/houm/congo/' + this.baseService.houmObj.domainName.toLowerCase() + '/' + this.domain_pin);
        }, 3000);
        return false;
      } else {
        if (resp.msg.userCreated) {
          this.stepper.selectedIndex = 1;
          this.steppermbl.selectedIndex = 1;
          this.stepper.selectedIndex = 2;
          this.steppermbl.selectedIndex = 2;
        }
        if (this.timerSec === 0) {
          this.isLonger = true;
          this.timerSec = 30;
          this.timerTick();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.timerSec = 180;
    this.timerInterval = 0;
    clearTimeout(this.intervalId);
    clearInterval(this.checkDomain);
  }
  domainCheck_depricated() {
    this.baseService.doRequest(`/zapi`, 'post', {domain: this.baseService.houmObj.domainName})
      .subscribe(resp => {
      if (resp.status) {
        this.ngOnDestroy();
        this.router.navigateByUrl('/houm/congo/' + this.baseService.houmObj.domainName + '/' + this.domain_pin);
        return false;
      } else {
        if (this.timerSec === 0) {
          this.isLonger = true;
          this.timerSec = 30;
          this.timerTick();
        }
      }
    });
  }
}
