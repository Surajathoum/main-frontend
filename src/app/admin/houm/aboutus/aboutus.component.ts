import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
  providers: [HomeComponent]
})
export class AboutusComponent implements OnInit {

  constructor(readonly router: Router, readonly homeAcivate: HomeComponent) { }
  showButtonText = 'Read more..'; showMoreText = false;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeaboutus();
  }
  closeaboutus() { this.router.navigateByUrl('/houm'); }
  openhelp() { window.open('mailto:help@houm.me'); }
  linkedinRedirect() { window.open('https://www.linkedin.com/in/nitingupta5/', '_blank'); }
  redirectToReg() { this.router.navigateByUrl('/houm/registration'); }
  linkedinRedirect1() {
    window.open('https://www.linkedin.com/in/bkj/', '_blank');
  }
  linkedinRedirect2() {
    window.open('https://www.linkedin.com/in/priyagoenka/', '_blank');
  }
  linkedinRedirect3() {
    window.open('https://maples.com/People/E/Elizabeth-Eng', '_blank');
  }

  loadText() {
    this.showMoreText = !this.showMoreText;
    if (this.showMoreText) {
      this.showButtonText = 'Read less..';
    } else {
      this.showButtonText = 'Read more..';
    }
  }
  ngOnInit() {
    this.homeAcivate.onActivate();
  }
}
