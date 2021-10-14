import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ItemsService } from 'src/services/items/items.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  // form props
  gridForm!: FormGroup;
  listOfControl: Array<{ 
    id: number; 
    nameWithAttribute: string;
    unitName: string;
    retailPrice: string;
    numberOfSmallUint: string;
    price: string; }> = [];

  // tbl props
  tblLoading: boolean = false;
  header: any = [
    'تفاصيل السلع و الخدمات',
    'الوحدة',
    'سعر الوحدة',
    'الكمية',
    'المبلغ الخاضع للضريبة',
    'خيارات',
  ]

  // controls props
  isLoading: boolean = false;
  itemsList: any[] = [];
  unitList: any[] = [];

  constructor(private fb: FormBuilder, private itemService: ItemsService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.gridForm = this.fb.group({});
    this.addRow();
  }

  //#region // create dynamic reactive form to add and delete rows

  addRow(e?: MouseEvent) {
    (e) && e.preventDefault();
    
    // create new id of object control
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = { // create object control
      id,
      nameWithAttribute: `nameWithAttribute-${id}`,
      unitName: `unitName-${id}`,
      retailPrice: `retailPrice-${id}`,
      numberOfSmallUint: `numberOfSmallUint-${id}`,
      price: `price-${id}`,
    };

    const index = this.listOfControl.push(control); // get index of added controls

    Object.values(this.listOfControl[index - 1]) // add controls to the form
      .forEach((val, index) => (index > 0) && this.gridForm.addControl(val.toString(), new FormControl('')));

    setTimeout(() => document.getElementById(`nameWithAttribute-${index - 1}`)?.focus(), 100) // add focus to new dropdown
    
  }

  removeField(i: {     
    id: number; 
    nameWithAttribute: string;
    unitName: string;
    retailPrice: string;
    numberOfSmallUint: string;
    price: string; }, e: MouseEvent) {
    e.stopPropagation();
    
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);

      this.listOfControl.splice(index, 1);

      // remove controls
      this.gridForm.removeControl(i.nameWithAttribute);
      this.gridForm.removeControl(i.unitName);
      this.gridForm.removeControl(i.retailPrice);
      this.gridForm.removeControl(i.numberOfSmallUint);
      this.gridForm.removeControl(i.price);

      // clear items
      this.itemsList[index] = [];
      this.unitList[index] = [];
    }
  }

  restControlls(index: number) {   
    this.gridForm.get(`retailPrice-${index}`)?.setValue('');
    this.gridForm.get(`numberOfSmallUint-${index}`)?.setValue('');
    this.gridForm.get(`price-${index}`)?.setValue('');
    this.gridForm.get(`unitName-${index}`)?.setValue('');
  }  

  //#endregion

  //#region // dropdown events

  searchGoods(val: string, index: number) { // use RxJs to get search result
    if (val != '') {
      of(val)
        .pipe(
          tap(() => this.isLoading = !this.isLoading),
          map(val => val),
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(val => this.itemService.searchItems(val)),
          tap((result: any) => {
            this.isLoading = !this.isLoading;
            (Boolean(result["data"])) ? this.itemsList[index] = result["data"] : this.itemsList[index] = [];
            (this.itemsList[index].length === 1) && this.ifItsOneItem(this.itemsList[index][0], index)
          })
        )
        .subscribe()
    } else this.itemsList[index] = []
  }

  getItemUnit(item: any, index: number) { // get units when user select a product
    if (Boolean(item)) { // if the selected item is valid 
      const itemList: any[] = this.itemsList[index];
      const unitsList: any = itemList.filter(i => i.itemName === item);
      this.unitList[index] = unitsList[0]["uintsList"];
      this.ifItsOneItem(unitsList[0], index, false)
      return
    } // if the selected item is not valid 
    this.itemsList[index] = [];
    this.unitList[index] = [];
    this.restControlls(index)
  }

  getUnit(unit: any, index: number) { // when user select unit do calculations
    if (Boolean(unit)) {
      const unitList: any[] = this.unitList[index]
      const u: any = unitList.filter(u => u.unitName === unit);
      this.gridForm.get(`retailPrice-${index}`)?.setValue(u[0]["retailPrice"]);
      this.gridForm.get(`numberOfSmallUint-${index}`)?.setValue(u[0]["numberOfSmallUint"]);
      this.calcPrice(index);      
    }
  }

  //#endregion

  //#region // calculate price when user change quantity or unit price

  calcPrice(index: number) { // calc price
    const retailPrice = parseFloat(this.gridForm.get(`retailPrice-${index}`)?.value);
    const numberOfSmallUint = parseFloat(this.gridForm.get(`numberOfSmallUint-${index}`)?.value);
    this.gridForm.get(`price-${index}`)?.setValue(retailPrice * numberOfSmallUint)
  }

  //#endregion

  //#region // add item to the row directly if the search result is one item

  ifItsOneItem(item: any, index: number, setName: boolean = true) { // if th search result is one item
    (setName) && this.gridForm.get(`nameWithAttribute-${index}`)?.setValue(item["nameWithAttribute"]);
    this.gridForm.get(`unitName-${index}`)?.setValue(item["uintsList"][0]["unitName"]);
    document.getElementById(`quantity-${index}`)?.focus();
  }

  //#endregion

}
