import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxCaptchaModule } from "@binssoft/ngx-captcha";

@NgModule({
    imports: [
        NgxCaptchaModule,
    ],
    exports: [
        NgxCaptchaModule,       
    ],
})

export class CaptchModuel {}