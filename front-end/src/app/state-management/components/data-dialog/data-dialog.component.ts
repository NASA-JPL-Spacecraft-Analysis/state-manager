import { Component, NgModule, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { StateVariable } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'data-dialog',
  templateUrl: 'data-dialog.component.html',
  styleUrls: [ 'data-dialog.component.css' ]
})
export class DataDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stateVariable: StateVariable }
  ) {}

  public form: FormGroup;
  public title = '';
  public stateVariable: StateVariable;

  public ngOnInit(): void {
    if (Object.keys(this.data).length === 0) {
      this.title = 'Create State';
    } else {
      this.title = 'Edit State';

      this.stateVariable = {
        ...this.data.stateVariable
      };
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}

@NgModule({
  declarations: [
    DataDialogComponent
  ],
  exports: [
    DataDialogComponent
  ],
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class DataDialogModule {}
