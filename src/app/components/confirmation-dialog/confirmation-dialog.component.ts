import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  confirmDelete() {
    this.dialogRef.close(true); // Signal that the user confirmed the delete action
  }

  cancel() {
    this.dialogRef.close(false); // Signal that the user canceled the delete action
  }
}
