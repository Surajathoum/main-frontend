import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-payment-info-dialogue',
  templateUrl: './payment-info-dialogue.component.html',
  styleUrls: ['./payment-info-dialogue.component.scss']
})
export class PaymentInfoDialogueComponent {
  constructor(
    public dialogRef: MatDialogRef<PaymentInfoDialogueComponent>
  ) {
   }

  onclose(): void {
    this.dialogRef.close();
  }
}
