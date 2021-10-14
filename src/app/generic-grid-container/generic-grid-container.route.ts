import { Routes } from "@angular/router";
import { BranchesResolver } from "src/resolvers/branches.resolver";
import { GenericGridContainerComponent } from "./generic-grid-container.component";

export const GenericGridRoutes: Routes  = [
    {
        path: '',
        component: GenericGridContainerComponent,
        resolve: {
            branches: BranchesResolver
        }
    }
]