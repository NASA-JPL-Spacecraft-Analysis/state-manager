import { Component, ChangeDetectionStrategy, NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from 'src/app/material';

interface ConfirmationDialogData {
  confirmButtonColor: string;
  confirmButtonText: string;
  delete: boolean;
  message: string;
  title: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-confirmation-dialog',
  styleUrls: [ 'confirmation-dialog.component.css' ],
  templateUrl: 'confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {
    console.log(data);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    this.dialogRef.close(true);
  }
}

@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
  exports: [
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ConfirmationDialogModule {}
