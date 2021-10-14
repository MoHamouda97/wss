import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generic-grid',
  templateUrl: './generic-grid.component.html',
  styleUrls: ['./generic-grid.component.css'],
})

export class GenericGridComponent implements OnInit, OnChanges {
  gridForm!: FormGroup;
  @Input('tblInfo') tblInfo: any; // this prop will give the table the info that will be used to render it dynamiclly
  @Input('cascadData') cascadData: any; // receive data from parent  

  @Output('loadCascadData') loadCascadData: EventEmitter<any> = new EventEmitter(); // use this event to tell parent which data to load
  @Output('formData') formData: EventEmitter<any> = new EventEmitter(); // use this event to send form data to parent

  tblLoading: boolean = false; // use this to show and hide tbl loading
  selectData: any[] = []; // use this to store select data for each row

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.gridForm = this.fb.group({
      controls: this.fb.array([])
    });
    this.addControls();
    this.getFormDataWhenChange();
  }

  //#region // create dynamic form using FormArray techniq

  public get getControls() : FormArray { // to return controls from main FormGroup
    return this.gridForm.get('controls') as FormArray
  }

  addControls() { // to push new controls to our FormArray
    // use ES6 spread operator to add control name that received from tblInfo prop 
    // to our FormArray at once time 
    this.getControls.push(this.fb.group({...this.tblInfo["controlsName"]})) 

    // add new array of select data for each new form array item
    // use object.assign to prevent pass by ref
    this.selectData = [...this.selectData, Object.assign({}, this.tblInfo['dataBinding'][0])];
  }

  removeControls(i: number) { // remove 
    if (this.getControls.length > 1) {
      this.getControls.removeAt(i); // remove controls from form array
      this.selectData.splice(i, 1); // remove data from select
    }
  }

  getFormDataWhenChange() { // get data from the form when value change
    this.gridForm.valueChanges.subscribe(() => console.log(this.gridForm));
  }

  //#endregion

  //#region 

  isCascading(value: any, control: string, index: number) { // if the dropdown is cascaded tell parent
    if (this.tblInfo["isCascading"][0][control]) {
      this.tblLoading = true;
      this.loadCascadData.emit([index, control, value])
    }
  }

  //#endregion

  ngOnChanges(changes: SimpleChanges) { // use this life cycle hook to get cascad data from parent
    for (const prop in changes) {
      if (changes.hasOwnProperty(prop)) {
        switch(prop) {
          case 'cascadData' :
            this.cascadData = changes.cascadData.currentValue;
            if (this.cascadData.length > 0)
              this.selectData[this.cascadData[0]][this.cascadData[1]] = this.cascadData[2];
            this.tblLoading = false
            break;
        }
      }
    }
  }

}
