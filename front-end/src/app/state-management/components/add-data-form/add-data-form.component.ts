import { Component, ChangeDetectionStrategy, NgModule, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DataDialogModule, DataDialogComponent } from '../data-dialog/data-dialog.component';
import { StateVariable } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'add-data-form',
  styleUrls: [ 'add-data-form.component.css' ],
  templateUrl: 'add-data-form.component.html'
})
export class AddDataFormComponent {
  @Output() public modifyData: EventEmitter<StateVariable> = new EventEmitter<StateVariable>();

  constructor(public dialog: MatDialog) {}

  public onCreate(): void {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(
      (result: StateVariable) => {
        this.modifyData.emit(result);
      }
    );
  }

  // TODO: Handle editing an item
  public onEdit(): void {

  }
}

@NgModule({
  declarations: [
    AddDataFormComponent
  ],
  exports: [
    AddDataFormComponent
  ],
  imports: [
    DataDialogModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AddDataFormModule {}
