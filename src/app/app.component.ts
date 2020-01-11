/**
 * @author Swaminathan Mathivanan <swami@netalytics.com>
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'houm-main';
  loaded = false;
  onActivate(event) {
    this.loaded = true;
    const bar = document.getElementById('meter-bar');
    if (bar !== null) { bar.style.width = '100%'; }
    const element = document.getElementById('page-loading');
    if (element !== null) { element.parentNode.removeChild(element); }
    const scrollToTop = window.setInterval(() => {
      const position = window.pageYOffset;
      if (position > 0) {
        window.scrollTo(0, position - 20);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 1);
  }
}
