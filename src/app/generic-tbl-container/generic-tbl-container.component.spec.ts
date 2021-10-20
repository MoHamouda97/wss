import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTblContainerComponent } from './generic-tbl-container.component';

describe('GenericTblContainerComponent', () => {
  let component: GenericTblContainerComponent;
  let fixture: ComponentFixture<GenericTblContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericTblContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTblContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
