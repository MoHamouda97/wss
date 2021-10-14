import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GenericGridComponent } from "src/app/generic-grid/generic-grid.component";
import { GenericInfoGridComponent } from "src/app/generic-info-grid/generic-info-grid.component";
import { RenderPipe } from "src/pipes/render.pipe";
import { AntModue } from "./ant.module";

@NgModule({
    declarations: [
        RenderPipe,
        GenericGridComponent,
        GenericInfoGridComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AntModue,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        AntModue,
        RenderPipe,
        GenericGridComponent,
        GenericInfoGridComponent,
    ]
})

export class SharedModule { }