import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '../material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterTabs } from './router-tab/router-tabs.directive';
import { RouterTab } from './router-tab/router-tab.directive';
import { AppFilterPipeModule } from '../_filters/app.filter-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppFilterPipeModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PageNotFoundComponent,
    RouterTabs,
    RouterTab,
    AppFilterPipeModule,
  ],
  declarations: [
    PageNotFoundComponent,
    RouterTabs,
    RouterTab
  ],
  entryComponents: []
})
export class SharedModule {}
