import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/modules/shared.module";
import { GenericTblContainerComponent } from "./generic-tbl-container.component";
import { GenericTblContainerRoutes } from "./generic-tbl-container.route";

@NgModule({
    declarations: [
        GenericTblContainerComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        RouterModule.forChild(GenericTblContainerRoutes),
        SharedModule
    ],
    providers: [
        //BranchesSearchResolver
    ]
})

export class GenericTblContainerModule {}