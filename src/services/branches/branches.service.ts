import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private http: HttpClient) { }

  get() : Observable<any> {
    return this.http.get(`${environment.api}Branches/GetAllLookup?OrganizationID=1&Lang=ar`)
      .pipe(
        shareReplay()
      )
  }

  search() : Observable<any> {
    const obj = {
      "name": null,
      "number": null,
      "startRow": 1,
      "pageSize": 10,
      "organizationID": "1"
    }
    return this.http.post(`${environment.api}Branches/Search`, obj)
      .pipe(
        shareReplay()
      )
  }
}
