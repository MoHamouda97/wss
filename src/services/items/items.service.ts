import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  searchItems(search: any) {
    const object = {
      "itemSearchMethod": 1,
      "searchValue": search,
      "organizationID": "1",
      "lang": "ar",
      "branchID": "",
      "warehouseID": "",
      "financialYearID": "4DB1C22F-0E7C-472F-8098-B08F73E49EDC"
      }
    return this.http.post(`${environment.api}ItemUintDetails/ItemsUnitsSearch`, object)
  }
}
