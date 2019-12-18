import { Component, ChangeDetectionStrategy, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
  @Output() public editStateVariable: EventEmitter<StateVariable>;

  public displayedColumns: string[] = [
    'identifier',
    'displayName',
    'type',
    'units',
    'source',
    'description',
    'actions'
  ];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    this.iconRegistry.addSvgIcon('more_vert', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/more_vert.svg'));
    this.editStateVariable = new EventEmitter<StateVariable>();
  }

  public editState(stateVariable: StateVariable): void {
    this.editStateVariable.emit(stateVariable);
  }
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
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule
  ]
})
export class StateVariableTableModule {}
