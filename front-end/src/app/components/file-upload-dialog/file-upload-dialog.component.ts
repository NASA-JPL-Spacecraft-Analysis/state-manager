import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from 'src/app/material';

interface FileUploadDialogData {
  csvFormat: string;
  dialogType: string;
  jsonFormat: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'file-upload-dialog',
  styleUrls: [ 'file-upload-dialog.component.css' ],
  templateUrl: 'file-upload-dialog.component.html'
})
export class FileUploadDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileUploadDialogData
  ) {}

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onFileUpload(fileEvent: Event): void {
    const file = (fileEvent.target as HTMLInputElement).files[0];

    this.dialogRef.close(file);
  }
}

@NgModule({
  declarations: [
    FileUploadDialogComponent
  ],
  exports: [
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class FileUploadDialogModule {}
