import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoumregistrationComponent } from './houmregistration.component';

describe('HoumregistrationComponent', () => {
  let component: HoumregistrationComponent;
  let fixture: ComponentFixture<HoumregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoumregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoumregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
