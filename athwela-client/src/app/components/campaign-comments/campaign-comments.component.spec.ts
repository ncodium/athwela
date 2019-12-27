import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCommentsComponent } from './campaign-comments.component';

describe('CampaignCommentsComponent', () => {
  let component: CampaignCommentsComponent;
  let fixture: ComponentFixture<CampaignCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
