import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/modules/shared.module";
import { LeafletService } from "src/services/leaflet/leaflet.service";
import { LeafletComponent } from "./leaflet.component";
import { LeafletRoutes } from "./leaflet.route";

@NgModule({
    declarations: [
        LeafletComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        RouterModule.forChild(LeafletRoutes),
        SharedModule,  
    ],
    providers: [
        LeafletService
    ]
})

export class LeafletModule {}