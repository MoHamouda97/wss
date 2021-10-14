import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxCaptchaModule } from "@binssoft/ngx-captcha";
import { CaptchModuel } from "src/modules/captcha.module";
import { SharedModule } from "src/modules/shared.module";
import { CaptchaComponent } from "./captcha.component";
import { CaptchRoutes } from "./captcha.route";

@NgModule({
    declarations: [
        CaptchaComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(CaptchRoutes),
        SharedModule, 
        CaptchModuel 
    ],
    providers: [
    ],
})

export class CaptchaModule {}