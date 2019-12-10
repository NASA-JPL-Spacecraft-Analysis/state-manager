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

  constructor() {
    this.createStateVariable = new EventEmitter<StateVariable>();
  }

  public createState(): void {
    this.createStateVariable.emit();
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
