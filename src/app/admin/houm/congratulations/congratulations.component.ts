import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseRequestService} from '../../../_services/base.service';
@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.scss']
})
export class CongratulationsComponent implements OnInit {
  domain: any;
  domainPin: any;
  innerWidth: any;
  congoImage = '/assets/images/congo_scren_2x.png';
  constructor(private routeParms: ActivatedRoute, readonly router: Router, public baseService: BaseRequestService) { }
  @HostListener('window:resize', ['$event'])

  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 1600 || this.innerWidth > 2560) {
      this.congoImage = '/assets/images/congo_scren_3x.png';
    } else if (this.innerWidth > 786 && this.innerWidth <= 1400) {
      this.congoImage = '/assets/images/congo_scren_2x.png';
    } else if (this.innerWidth <= 786) {
      this.congoImage = '/assets/images/congo_scren_1x.png';
    }
  }
  ngOnInit() {
    this.onResize();
    this.routeParms.params.subscribe(res => {
      if (res != null && res.domain) {
        this.domain = res.domain;
      }
      if (res != null && res.domain_pin) {
        this.domainPin = res.domain_pin;
      }
    });
    setTimeout(() => {
      this.goToHoum();
    }, 8000);
  }
  goToHoum() {
    window.location.href = `https://building-your-houm.me/houm/accesshoum/${this.domain}/${this.domainPin}`;
  }
}
