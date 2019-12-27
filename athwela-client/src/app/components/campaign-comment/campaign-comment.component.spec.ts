import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCommentComponent } from './campaign-comment.component';

describe('CampaignCommentComponent', () => {
  let component: CampaignCommentComponent;
  let fixture: ComponentFixture<CampaignCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
