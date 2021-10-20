import { Routes } from "@angular/router";
import { GenericTblContainerComponent } from "./generic-tbl-container.component";

export const GenericTblContainerRoutes: Routes  = [
    {
        path: '',
        component: GenericTblContainerComponent,
        resolve: {
            //branches: BranchesSearchResolver
        }
    }
]