import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generic-tbl',
  templateUrl: './generic-tbl.component.html',
  styleUrls: ['./generic-tbl.component.css']
})
export class GenericTblComponent implements OnInit {
  gridForm!: FormGroup;
  visabilities: any[] = [];
  ItemObj: any = {};
  
  //#region // input props needed by the table
  @Input('tblHeader') tblHeader: any = [];
  @Input('placeholders') placeholders: any = [];
  @Input('data') data: any[] = [];
  //#endregion

  //#region // output props the parent will use
  @Output('action') action: EventEmitter<any> = new EventEmitter();
  //#endregion

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.gridForm = this.fb.group({
      controls: this.fb.array([])
    });   
    this.addControls();
    this.createItemObj();
  }

  //#region // create dynamic form

  public get getControls() : FormArray { // to return controls from main FormGroup
    return this.gridForm.get('controls') as FormArray
  }

  addControls() { // to push new controls to our FormArray
    this.data.forEach(val => {
      this.getControls.push(this.fb.group({...val}));
      this.visabilities.push(false)
    } )    
  }

  //#endregion  

  //#region // create object
  createItemObj() {
    this.ItemObj = Object.keys(this.data[1]).reduce((a, v) => ({ ...a, [v]: ''}), {});
  }
  //#endregion

  //#region // grid actions
  addItem() {
    this.getControls.push(this.fb.group({...this.ItemObj})); // add new object to form

    this.data.push(this.ItemObj); // add it to data

    this.visabilities.push(false); // add visability

    this.createItemObj(); // reset object

    this.action.emit(['add', this.ItemObj]); // send object to be added
  }

  removeItem(index: number, removeOnlyFront: boolean = false) { 
    this.getControls.removeAt(index); // remove item from form array

    this.data.splice(index, 1); // remove item for array of data
    this.visabilities.splice(index, 1); // remove visability for array of visabilities

    (!removeOnlyFront) && this.action.emit(['delete', this.data[index]?.id]); // send data to de deleted
  }   

  confirmUpdate(index: number) {
    // to save data that user confirmed
    const item = this.getControls.controls[index].value;
    this.data[index] = item;

    this.action.emit(['edit', item]); // send data to be edited
  }

  backToGrid(index: number) {
    // to show only data that user confirmed
    const item = this.data[index];
    this.getControls.controls[index].setValue(item);

    // to hide controls
    this.visabilities[index] = false;

    (!this.checkIfEmpty(index)) && this.removeItem(index, true)
  }

  checkIfEmpty(index: number) {
    const values: any[] = [];

    Object
      .values(this.data[index])
      .forEach(val => (Boolean(val)) ? values.push(1) : values.push(0) )

    return values.includes(1);
  }
  //#endregion
}
