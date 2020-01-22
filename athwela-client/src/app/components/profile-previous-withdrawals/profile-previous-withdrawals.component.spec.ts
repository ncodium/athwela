import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePreviousWithdrawalsComponent } from './profile-previous-withdrawals.component';

describe('ProfilePreviousWithdrawalsComponent', () => {
  let component: ProfilePreviousWithdrawalsComponent;
  let fixture: ComponentFixture<ProfilePreviousWithdrawalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePreviousWithdrawalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePreviousWithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
