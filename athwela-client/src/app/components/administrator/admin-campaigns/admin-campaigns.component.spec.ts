import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCampaignsComponent } from './admin-campaigns.component';

describe('AdminCampaignsComponent', () => {
  let component: AdminCampaignsComponent;
  let fixture: ComponentFixture<AdminCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
