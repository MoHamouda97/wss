import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/modules/shared.module";
import { CustomMapComponent } from "./custom-map.component";
import { CustomMapRoutes } from "./custom-map.route";

@NgModule({
    declarations: [
        CustomMapComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        RouterModule.forChild(CustomMapRoutes),
        SharedModule,  
    ],
    providers: [
    ]
})

export class CustomMapModule {}