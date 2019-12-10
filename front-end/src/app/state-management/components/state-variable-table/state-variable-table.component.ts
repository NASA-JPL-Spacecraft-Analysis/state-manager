import { Component, ChangeDetectionStrategy, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { StateVariable } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-variable-table',
  styleUrls: [ 'state-variable-table.component.css' ],
  templateUrl: 'state-variable-table.component.html'
})
export class StateVariableTableComponent {
  @Input() public stateVariables: StateVariable[];

  public displayedColumns: string[] = [
    'identifier',
    'name',
    'type',
    'units',
    'source',
    'description'
  ];
}

@NgModule({
  declarations: [
    StateVariableTableComponent
  ],
  exports: [
    StateVariableTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class StateVariableTableModule {}
