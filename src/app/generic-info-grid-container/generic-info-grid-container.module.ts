import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/modules/shared.module";
import { BranchesSearchResolver } from "src/resolvers/branches.search.resolver";
import { GenericInfoGridContainerComponent } from "./generic-info-grid-container.component";
import { GenericInfoGridRoutes } from "./generic-info-grid-container.route";

@NgModule({
    declarations: [
        GenericInfoGridContainerComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        RouterModule.forChild(GenericInfoGridRoutes),
        SharedModule
    ],
    providers: [
        //BranchesSearchResolver
    ]
})

export class GenericInfoGridContainerModule {}