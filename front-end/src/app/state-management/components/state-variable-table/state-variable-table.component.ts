import { Component, ChangeDetectionStrategy, NgModule, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { StateVariable } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-variable-table',
  styleUrls: [ 'state-variable-table.component.css' ],
  templateUrl: 'state-variable-table.component.html'
})
export class StateVariableTableComponent implements OnChanges {
  @Input() public stateVariables: StateVariable[];

  @Output() public stateVariableSelected: EventEmitter<StateVariable>;

  public dataSource: MatTableDataSource<StateVariable>;
  public displayedColumns: string[] = [
    'identifier',
    'displayName',
    'type',
    'units',
    'source',
    'description'
  ];

  constructor() {
    this.stateVariableSelected = new EventEmitter<StateVariable>();
  }

  public ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.stateVariables);

    this.dataSource.filterPredicate = this.filter;
  }

  /**
   * Called when the user inputs a character into our filter. We need to clean the filter up before actually
   * using it.
   *
   * @param filterValue The filter the user has entered.
   */
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();

    this.dataSource.filter = filterValue;
  }

  public onRowClick(stateVariable: StateVariable): void {
    this.stateVariableSelected.emit(stateVariable);
  }

  // Filter by our state variable's type to start with.
  private filter(stateVariable: StateVariable, filterValue: string): boolean {
    return stateVariable.type.toLowerCase().includes(filterValue);
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
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule
  ]
})
export class StateVariableTableModule {}
