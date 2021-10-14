import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInfoGridContainerComponent } from './generic-info-grid-container.component';

describe('GenericInfoGridContainerComponent', () => {
  let component: GenericInfoGridContainerComponent;
  let fixture: ComponentFixture<GenericInfoGridContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericInfoGridContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericInfoGridContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
