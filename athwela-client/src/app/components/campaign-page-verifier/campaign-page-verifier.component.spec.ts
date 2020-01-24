import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignPageVerifierComponent } from './campaign-page-verifier.component';

describe('CampaignPageVerifierComponent', () => {
  let component: CampaignPageVerifierComponent;
  let fixture: ComponentFixture<CampaignPageVerifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignPageVerifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignPageVerifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
