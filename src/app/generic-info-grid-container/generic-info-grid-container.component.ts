import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generic-info-grid-container',
  templateUrl: './generic-info-grid-container.component.html',
  styleUrls: ['./generic-info-grid-container.component.css']
})
export class GenericInfoGridContainerComponent implements OnInit {
  header: any = [
    '#',
    'h 1',
    'h 2',
    'h 3',
    'h 4',
  ]
  data: any[] = [];
  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    //this.router.data.subscribe(res => this.data = res["branches"]["data"])
  }

  testPage(page: any) {
    console.log(page)
  }

  testLoadMore() {
    
  }

}
