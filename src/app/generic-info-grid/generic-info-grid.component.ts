import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-generic-info-grid',
  templateUrl: './generic-info-grid.component.html',
  styleUrls: ['./generic-info-grid.component.css']
})
export class GenericInfoGridComponent implements OnInit, OnChanges {
  @Input('data') data: any[] = [] // data that will be displayed
  @Input('header') header: any[] = [] // header of the table
  @Input('PageSize') PageSize: any = '' // page size, for paging
  @Input('totalCount') totalCount: any = 0 // page size, for paging
  @Input('pageORload') pageORload: string = '' // how to get data => page or load more the value shoud be 'page' or 'load'
  
  @Output('paging') paging: EventEmitter<number> = new EventEmitter(); // send page num to the parent
  @Output('isLoadMore') isLoadMore: EventEmitter<boolean> = new EventEmitter(); // send load more order to the parent

  loading: boolean = false;
  page: number = 1;
  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
  }

  onPageChange(num: number) { // this is function for pagenation
    this.page = num;
    this.paging.emit(num);
  }

  loadMore() {
    this.isLoadMore.emit(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let prop in changes) {
      if (changes.hasOwnProperty(prop)) {
        switch (prop) {
          case 'data' :
            (this.pageORload == 'page') 
              ? this.data = changes.data.currentValue 
              : this.data = [...this.data, changes.data.currentValue];
            break;
          case 'PageSize' :
            this.PageSize = changes.PageSize.currentValue 
            break;
          case 'totalCount' :
            this.totalCount = changes.totalCount.currentValue 
            break;
        }
      }
    }
  }

}
