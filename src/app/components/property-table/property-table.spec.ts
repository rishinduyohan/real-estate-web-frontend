import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTable } from './property-table';

describe('PropertyTable', () => {
  let component: PropertyTable;
  let fixture: ComponentFixture<PropertyTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
