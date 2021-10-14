import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AntModue } from "src/modules/ant.module";
import { SharedModule } from "src/modules/shared.module";
import { GridComponent } from "./grid.component";
import { GridRoutes } from "./grid.route";

@NgModule({
    declarations: [
        GridComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        RouterModule.forChild(GridRoutes),
        SharedModule
    ]
})

export class GridModule {}