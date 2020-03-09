import { Component, ChangeDetectionStrategy, NgModule, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { StateVariable, StateVariableMap } from '../../models';
import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-variable-table',
  styleUrls: [ 'state-variable-table.component.css' ],
  templateUrl: 'state-variable-table.component.html'
})
export class StateVariableTableComponent implements OnChanges {
  @Input() public stateVariableMap: StateVariableMap;

  @Output() public stateVariableSelected: EventEmitter<StateVariable>;

  public dataSource: MatTableDataSource<StateVariable>;
  public stateVariableMapSize: number;
  public displayedColumns: string[] = [
    'identifier',
    'displayName',
    'type',
    'units',
    'source',
    'subsystem',
    'description'
  ];

  constructor() {
    this.stateVariableSelected = new EventEmitter<StateVariable>();
  }

  public ngOnChanges(): void {
    // Get all our state variables from our map so the table can display them.
    if (this.stateVariableMap) {
      const keys = Object.keys(this.stateVariableMap);
      const stateVariables: StateVariable[] = [];
      this.stateVariableMapSize = keys.length;

      for (const key of keys) {
        stateVariables.push(this.stateVariableMap[key]);
      }

      this.dataSource = new MatTableDataSource(stateVariables);

      this.dataSource.filterPredicate = this.filter;
    }
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
    MaterialModule
  ]
})
export class StateVariableTableModule {}
