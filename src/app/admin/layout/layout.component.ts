import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { CustomIconService } from '../../_services/custom-icon.service';
import { LoaderService } from 'src/app/_services/loader.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('appDrawer', { static: true }) appDrawer: ElementRef;
  showLoader = false;
  constructor(media: MediaObserver, private loaderService: LoaderService, public customIconService: CustomIconService) {
    this.customIconService.init();
  }
  contentText: string;
  result: any;
  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean, text: string) => {
      this.result = val;
      this.showLoader = this.result.value;
      this.contentText = this.result.text;
    });
  }
}
