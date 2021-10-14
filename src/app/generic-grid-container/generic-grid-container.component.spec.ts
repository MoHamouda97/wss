import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericGridContainerComponent } from './generic-grid-container.component';

describe('GenericGridContainerComponent', () => {
  let component: GenericGridContainerComponent;
  let fixture: ComponentFixture<GenericGridContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericGridContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericGridContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
