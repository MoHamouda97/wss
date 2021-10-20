import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-tbl-container',
  templateUrl: './generic-tbl-container.component.html',
  styleUrls: ['./generic-tbl-container.component.css']
})
export class GenericTblContainerComponent implements OnInit {
  tblHeader: any = [
    'الاسم بالعربي',
    'الاسم بالانجليزي',
    'الاجراءات'
  ];

  placeholders: any = [
    '',
    'اكتب نوع العقار بالعربي',
    'اكتب نوع العقار بالانجليزي',
  ]

  data: any = [
    {id: 1, nameAr: 'فيلا', nameEn: 'Villa'},
    {id: 2, nameAr: 'فيلا', nameEn: 'Villa'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
