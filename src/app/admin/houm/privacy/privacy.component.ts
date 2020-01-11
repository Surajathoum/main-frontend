import { Component, OnInit, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import {Subscription, Observable} from 'rxjs';
import { HomeComponent } from '../home/home.component';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  providers: [HomeComponent]
})
export class PrivacyComponent implements OnInit {
  state = 0;
  constructor(readonly router: Router, readonly homeAcivate: HomeComponent) { }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.moveright();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.moveleft();
    }
  }
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeprivacy();
  }
  moveright() {
    if(this.state === 3) { this.state = 0; } else { this.state++; }
  }

  moveleft() {
    if(this.state === 0) { this.state = 3; } else { this.state--; }
  }
  closeprivacy() { this.router.navigateByUrl('/houm'); }
  ngOnInit() {
    this.homeAcivate.onActivate();
  }
}
