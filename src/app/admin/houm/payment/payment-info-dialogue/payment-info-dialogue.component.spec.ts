import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInfoDialogueComponent } from './payment-info-dialogue.component';

describe('PaymentInfoDialogueComponent', () => {
  let component: PaymentInfoDialogueComponent;
  let fixture: ComponentFixture<PaymentInfoDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentInfoDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInfoDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
