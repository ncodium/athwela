import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDonationsRejectWithdrawalComponent } from './admin-donations-reject-withdrawal.component';

describe('AdminDonationsRejectWithdrawalComponent', () => {
  let component: AdminDonationsRejectWithdrawalComponent;
  let fixture: ComponentFixture<AdminDonationsRejectWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDonationsRejectWithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDonationsRejectWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
