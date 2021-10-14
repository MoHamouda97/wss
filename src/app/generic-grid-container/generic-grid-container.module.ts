import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/modules/shared.module";
import { BranchesResolver } from "src/resolvers/branches.resolver";
import { GenericGridContainerComponent } from "./generic-grid-container.component";
import { GenericGridRoutes } from "./generic-grid-container.route";

@NgModule({
    declarations: [
        GenericGridContainerComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        RouterModule.forChild(GenericGridRoutes),
        SharedModule
    ],
    providers: [
        BranchesResolver
    ]
})

export class GenericGridContainerModule {}