import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModCampaignsComponent } from './mod-campaigns.component';

describe('ModCampaignsComponent', () => {
  let component: ModCampaignsComponent;
  let fixture: ComponentFixture<ModCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
