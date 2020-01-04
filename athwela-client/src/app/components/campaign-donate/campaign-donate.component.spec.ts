import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDonateComponent } from './campaign-donate.component';

describe('CampaignDonateComponent', () => {
  let component: CampaignDonateComponent;
  let fixture: ComponentFixture<CampaignDonateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignDonateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
