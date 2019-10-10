import { Component, ChangeDetectionStrategy, NgModule, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'add-data-form',
  styleUrls: [ 'add-data-form.component.css' ],
  templateUrl: 'add-data-form.component.html'
})
export class AddDataFormComponent {
  @Output() public addData: EventEmitter<string>;

  public newData: string;

  constructor() {
    this.addData = new EventEmitter<string>();
  }

  public onDataAdd(data: string): void {
    this.addData.emit(data);

    // Clear out the field after emitting.
    this.newData = undefined;
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
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AddDataFormModule {}
