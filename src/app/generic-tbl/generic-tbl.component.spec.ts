import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTblComponent } from './generic-tbl.component';

describe('GenericTblComponent', () => {
  let component: GenericTblComponent;
  let fixture: ComponentFixture<GenericTblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericTblComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
