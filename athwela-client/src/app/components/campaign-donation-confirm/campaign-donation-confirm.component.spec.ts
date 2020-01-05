import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDonationConfirmComponent } from './campaign-donation-confirm.component';

describe('CampaignDonationConfirmComponent', () => {
  let component: CampaignDonationConfirmComponent;
  let fixture: ComponentFixture<CampaignDonationConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignDonationConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDonationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
