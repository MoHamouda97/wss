import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { BranchesService } from "src/services/branches/branches.service";

@Injectable()

export class BranchesResolver implements Resolve<any> {

    constructor(private service: BranchesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
        return this.service.get();
    }
}