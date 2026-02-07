import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHero } from './user-hero';

describe('UserHero', () => {
  let component: UserHero;
  let fixture: ComponentFixture<UserHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
