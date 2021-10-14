import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInfoGridComponent } from './generic-info-grid.component';

describe('GenericInfoGridComponent', () => {
  let component: GenericInfoGridComponent;
  let fixture: ComponentFixture<GenericInfoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericInfoGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericInfoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
