import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThereportComponent } from './thereport.component';

describe('ThereportComponent', () => {
  let component: ThereportComponent;
  let fixture: ComponentFixture<ThereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
