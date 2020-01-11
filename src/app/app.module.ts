/**
 * @author Swaminathan Mathivanan <swami@netalytics.com>
 */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GestureConfig } from '@angular/material/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CustomIconService } from './_services/custom-icon.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserIdleModule } from 'angular-user-idle';
import { CustomErrorHandlerService } from './_services/customErrorHandler.service';
import {WindowRef} from './_services/WindowRef';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    MaterialModule,
    DragDropModule,
    ToastrModule.forRoot({
      timeOut: 8000, progressBar: true, enableHtml: true,
      closeButton: true,
      preventDuplicates: true,
    }),
    SharedModule,
    UserIdleModule.forRoot({ idle: 300, timeout: 1, ping: 120 })
  ],
  providers: [
    CustomIconService, WindowRef, MatRippleModule,
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
    { provide: ErrorHandler, useClass: CustomErrorHandlerService },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
