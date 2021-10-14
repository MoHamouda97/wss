import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/modules/shared.module";
import { GMapComponent } from "./g-map.component";
import { GMapRoutes } from "./g-map.route";
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDrawingModule } from '@agm/drawing'

@NgModule({
    declarations: [
        GMapComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        RouterModule.forChild(GMapRoutes),
        SharedModule,
        AgmCoreModule.forRoot({
            // please get your own API key here:
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
            apiKey: 'AIzaSyCjzzd4nbOiZJx3B53u9ZZAq0tcOsVUBdg',
            libraries: ['drawing']
        }),
        AgmDrawingModule       
    ],
    providers: [
        GoogleMapsAPIWrapper
    ]
})

export class GMapModule {}