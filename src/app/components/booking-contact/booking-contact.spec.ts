import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingContact } from './booking-contact';

describe('BookingContact', () => {
  let component: BookingContact;
  let fixture: ComponentFixture<BookingContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
