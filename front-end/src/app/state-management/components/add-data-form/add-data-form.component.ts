import { Component, ChangeDetectionStrategy, NgModule, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { StateVariable } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'add-data-form',
  styleUrls: [ 'add-data-form.component.css' ],
  templateUrl: 'add-data-form.component.html'
})
export class AddDataFormComponent {
  @Output() public createStateVariable: EventEmitter<StateVariable>;
  @Output() public uploadStateVariables: EventEmitter<File>;

  constructor() {
    this.createStateVariable = new EventEmitter<StateVariable>();
    this.uploadStateVariables = new EventEmitter<File>();
  }

  public onCreateState(): void {
    this.createStateVariable.emit();
  }

  public onFileUpload(fileEvent: Event): void {
    const file = (fileEvent.target as HTMLInputElement).files[0];

    if (!file) {
      return;
    }

    this.uploadStateVariables.emit(file);
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
    MatButtonModule
  ]
})
export class AddDataFormModule {}
