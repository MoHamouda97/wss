import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generic-grid-container',
  templateUrl: './generic-grid-container.component.html',
  styleUrls: ['./generic-grid-container.component.css']
})
export class GenericGridContainerComponent implements OnInit {
  // data taht each dynamic table will need
  tblInfo: any = {
    tbltHeader: [
      'Test 1',
      'Test 2',
      'Test 3',
      'خيارات',
    ],
    tblControls: [      
      {control1: 'select', control2: 'email', control3: 'select', remove: 'remove'},
    ],
    controlsName: {control1: ['', Validators.required], control2: '', control3: ''},
    dataBinding: [
      {control1: [], control2: '', control3: [{id: 1, name: 'Ali'}]},
    ],
    isCascading: [
      {control1: true, control2: false, control3: false}
    ],
    isHide: [
      {control1: false, control2: false, control3: false},
      [false, false, false]
    ]
  } 
  
  cascadData: any[] = []; // use this for cascad select data

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe(res => this.tblInfo["dataBinding"][0]["control1"] = res["branches"]["data"]);    
  }

  //#region 

  getCascadData(val: any[]) { // this should call backend to get data according to val
    setTimeout(() => { // simulat calling backend
      this.cascadData = [
        val[0],
        'control3',
        this.retrunData(val[2])
      ]
    }, 1000)
  }

  retrunData(id: any) {
    if (id === '78420075-07A4-451E-99D5-2C544883D554') {
      return [
        {id: 1, name: 'Ali'},
        {id: 2, name: 'Mohammed'},
        {id: 3, name: 'Khaled'},
        {id: 4, name: 'Tareq'},
      ]
    }

    return []
  }

  //#endregion

}
