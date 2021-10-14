import { Routes } from "@angular/router";
import { BranchesSearchResolver } from "src/resolvers/branches.search.resolver";
import { GenericInfoGridContainerComponent } from "./generic-info-grid-container.component";

export const GenericInfoGridRoutes: Routes  = [
    {
        path: '',
        component: GenericInfoGridContainerComponent,
        resolve: {
            //branches: BranchesSearchResolver
        }
    }
]