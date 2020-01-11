import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {LoaderService} from './loader.service';

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector,  private ngZone: NgZone,
              private loaderService: LoaderService) { }
  handleError(error) {
    if (error instanceof HttpErrorResponse) {
      this.loaderService.display(false);
      if (error.status === 401) {
          error = null;
          const path = window.location.pathname;
      }
    } else {
      console.error(error);
    }
  }
}
