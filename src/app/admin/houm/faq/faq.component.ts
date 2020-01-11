import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [HomeComponent]
})
export class FaqComponent implements OnInit {
  step = 0;
  constructor(readonly router: Router, readonly homeAcivate: HomeComponent) { }
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closefaqs();
  }
  closefaqs() { this.router.navigateByUrl('/houm'); }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  ngOnInit() {
    this.step = 0;
    this.homeAcivate.onActivate();
  }
}
