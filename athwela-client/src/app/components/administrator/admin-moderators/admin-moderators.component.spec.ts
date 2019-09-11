import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModeratorsComponent } from './admin-moderators.component';

describe('AdminModeratorsComponent', () => {
  let component: AdminModeratorsComponent;
  let fixture: ComponentFixture<AdminModeratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminModeratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModeratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
