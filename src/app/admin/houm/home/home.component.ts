import { Component, OnInit, Renderer2, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../_services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(readonly router: Router, private loaderService: LoaderService) {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }
  timeInterval: any;
  showMenu = false;
  isFour = false;
  step = 0;
  isFinished = false;
  hand_video = '/assets/bg.mp4';
  @ViewChild('first', { static: false }) first: ElementRef;
  @ViewChild('scrl', { static: false }) scrl: ElementRef;
  @ViewChild('hone', { static: false }) hone: ElementRef;
  @ViewChild('htwo', { static: false }) htwo: ElementRef;
  @ViewChild('hthree', { static: false }) hthree: ElementRef;
  @ViewChild('hfour', { static: false }) hfour: ElementRef;
  @ViewChild('hfive', { static: false }) hfive: ElementRef;
  @ViewChild('hsix', { static: false }) hsix: ElementRef;
  @ViewChild('currentSysBg', { static: false }) currentSysBg: ElementRef;
  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  handleOutsideClick(event) {
    const l2div = document.getElementById('l2');
    if (l2div !== null) {
      if (!document.getElementById('l2').contains(event.target) && (!document.getElementById('logo-menu').contains(event.target))) {
        this.closeloadmenu();
      }
    }
  }
  @HostListener('window:scroll', []) onWindowScroll(event: any) {
    const offset = window.pageYOffset || window.document.documentElement.scrollTop || window.document.body.scrollTop || 0;
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.showMenu) {
      this.closeloadmenu();
    }
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    const doc = document.documentElement;
    const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    if (top >= this.scrl.nativeElement.offsetTop - this.scrl.nativeElement.clientWidth + 200 &&
      top < this.currentSysBg.nativeElement.offsetTop) {
      if (!this.isFinished && !this.isFour) {
        setTimeout(() => { this.start(); }, 2000);
      }
    }

    if (top > this.currentSysBg.nativeElement.offsetTop || top < this.currentSysBg.nativeElement.offsetTop - 200) {
      this.isFinished = false;
    }

    if (top >= this.hone.nativeElement.offsetTop - this.hone.nativeElement.clientWidth + 100) {
      this.hone.nativeElement.classList.add('hoverme');
    } else {
      this.hone.nativeElement.classList.remove('hoverme');
    }
    if (top >= this.htwo.nativeElement.offsetTop - this.htwo.nativeElement.clientWidth + 100) {
      this.htwo.nativeElement.classList.add('hoverme');
    } else {
      this.htwo.nativeElement.classList.remove('hoverme');
    }

    if (top >= this.hthree.nativeElement.offsetTop - this.hthree.nativeElement.clientWidth + 200) {
      this.hthree.nativeElement.classList.add('hoverme');
    } else {
      this.hthree.nativeElement.classList.remove('hoverme');
    }
    if (top >= this.hfour.nativeElement.offsetTop - this.hfour.nativeElement.clientWidth + 300) {
      this.hfour.nativeElement.classList.add('hoverme');
    } else {
      this.hfour.nativeElement.classList.remove('hoverme');
    }

    if (top >= this.hfive.nativeElement.offsetTop - this.hfive.nativeElement.clientWidth + 200) {
      this.hfive.nativeElement.classList.add('hoverme');
    } else {
      this.hfive.nativeElement.classList.remove('hoverme');
    }
    if (top >= this.hsix.nativeElement.offsetTop - this.hsix.nativeElement.clientWidth + 200) {
      this.hsix.nativeElement.classList.add('hoverme');
    } else {
      this.hsix.nativeElement.classList.remove('hoverme');
    }
  }
  isEmptyImgDisplay: boolean = false;
  start() {
    this.isEmptyImgDisplay = false;
    this.isFour = false;
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
   //if (top > 657 && top <= 800) {
      this.isFour = false;
      //  this.isEmptyImgDisplay=false;
      clearInterval(this.timeInterval);
      this.moveSlide(1);
    //}

  }
  moveSlide(i) {
    this.isFour = true;
    const ele = document.getElementById('i' + i) as HTMLInputElement;
    if (ele != null) {
      ele.checked = true;
      if (i != 1) {
        // document.getElementById('text' + i).classList.remove('slide-up-top');
        document.getElementById('text' + i).classList.add('slide-up-top');
        //document.getElementById('img' + i).classList.remove('slide-in-fwd-right');
        document.getElementById('img' + i).classList.add('slide-in-fwd-right');
      }
      i++;
    }
    if (i === 4) {
      this.timeInterval = setTimeout(() => {
        this.isFinished = true;
        this.isFour = false;
        this.isEmptyImgDisplay = true;
        const ele1 = document.getElementById('i1') as HTMLInputElement;
        if (ele1 != null) {
          ele1.checked = true;
        }
      }, 3000);
    } else {
      this.isFinished = false;
      this.isFour = true;
      this.timeInterval = setTimeout(() => {
        this.moveSlide(i);
      }, 3000);
    }
  }
  downScroll() {
    const doc = document.documentElement;
    doc.scrollTop = document.body.scrollHeight;
    clearInterval(this.timeInterval);
    this.isEmptyImgDisplay = false;
    this.isFour = false;
    this.moveSlide(1);
  }
  doClick(i) {
    if (i !== 1) {
      document.getElementById('text' + i).classList.add('slide-up-top');
      document.getElementById('img' + i).classList.add('slide-in-fwd-right');
    }
  }
  onActivate() {
    const scrollToTop = window.setInterval(() => {
      const position = window.pageYOffset;
      if (position > 0) {
        window.scrollTo(0, position - 20);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 1);
  }
  ngOnInit() {
    const innerWidth = window.innerWidth;
    if (innerWidth <= 768) {
      this.hand_video = '/assets/mobile_bg.mp4';
    }
    this.loaderService.setOption(0);
    this.onActivate();
    const bar = document.getElementById('meter-bar');
    if (bar !== null) { bar.style.width = '100%'; }
    const element = document.getElementById('page-loading');
    if (element !== null) {
      element.parentNode.removeChild(element);
    }

    this.Onload();
  }
  loadmenu() { this.showMenu = true; }
  redirectToReg() {
    setTimeout(() => {
      this.router.navigateByUrl('/houm/registration');
    }, 1000);

  }
  openfaqs() { this.router.navigateByUrl('/houm/faq'); }
  openaboutus() { this.router.navigateByUrl('/houm/aboutus'); }
  openprivacy() { this.router.navigateByUrl('/houm/privacy'); }

  closeloadmenu() { this.showMenu = false; }
  TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  tick = function () {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    const that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => {
      that.tick();
    }, delta);
  };

  Onload() {
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
      const toRotate = elements[i].getAttribute('data-type');
      const period = elements[i].getAttribute('data-period');
      if (toRotate) {
        this.TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
    document.body.appendChild(css);
  }
  redirect() {
    window.open('https://blog.houm.me/', '_blank');
  }
  openhelp() {
    window.open('mailto:help@houm.me');
  }
}
