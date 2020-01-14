import { Component, NgModule, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StateVariable } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-variable-sidenav',
  styleUrls: [ 'state-variable-sidenav.component.css' ],
  templateUrl: 'state-variable-sidenav.component.html'
})
export class StateVariableSidenavComponent {
  @Input() public stateVariable: StateVariable;
}

@NgModule({
  declarations: [
    StateVariableSidenavComponent
  ],
  exports: [
    StateVariableSidenavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StateVariableSidenavModule {}
