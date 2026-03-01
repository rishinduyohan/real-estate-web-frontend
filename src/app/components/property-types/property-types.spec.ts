import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypes } from './property-types';

describe('PropertyTypes', () => {
  let component: PropertyTypes;
  let fixture: ComponentFixture<PropertyTypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyTypes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyTypes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
