import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAgent } from './contact-agent';

describe('ContactAgent', () => {
  let component: ContactAgent;
  let fixture: ComponentFixture<ContactAgent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAgent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactAgent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
