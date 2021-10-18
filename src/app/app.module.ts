import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// services
import { ItemsService } from 'src/services/items/items.service';
import { BranchesService } from 'src/services/branches/branches.service';

// public components
import { NavComponent } from './nav/nav.component';
import { FullPageComponent } from './full-page/full-page.component';

// lazy load routes
import { RouterModule } from '@angular/router';
import { NgxCaptchaModule } from '@binssoft/ngx-captcha';
import { CaptchModuel } from 'src/modules/captcha.module';
import { LeafletService } from 'src/services/leaflet/leaflet.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FullPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    CaptchModuel,
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },    
    ItemsService,
    BranchesService,
    LeafletService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
