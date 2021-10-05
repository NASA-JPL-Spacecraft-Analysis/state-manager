import { Component, ChangeDetectionStrategy, NgModule, Input, Output, EventEmitter, OnChanges, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { State, StateMap } from '../../../models';
import { MaterialModule } from 'src/app/material';
import { TableComponent } from '../../table/table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-state-table',
  styleUrls: [ 'state-table.component.css' ],
  templateUrl: 'state-table.component.html'
})
export class StateTableComponent extends TableComponent<State> implements OnChanges, OnInit {
  @Input() public stateMap: StateMap;
  @Input() public history: boolean;

  @Output() public stateSelected: EventEmitter<State>;

  public stateMapSize: number;

  constructor() {
    super();

    this.stateSelected = new EventEmitter<State>();
  }

  public ngOnInit(): void {
    this.displayedColumns.push(
      'identifier',
      'displayName',
      'type',
      'dataType',
      'units',
      'source',
      'subsystem',
      'description',
      'externalLink'
    );

    if (this.history) {
      this.displayedColumns.push(
        'stateId',
        'updated'
      );
    }
  }

  public ngOnChanges(): void {
    // Get all our states from our map so the table can display them.
    if (this.stateMap) {
      const keys = Object.keys(this.stateMap);
      const state: State[] = [];
      this.stateMapSize = keys.length;

      for (const key of keys) {
        state.push(this.stateMap[key]);
      }

      this.dataSource = new MatTableDataSource(state);

      super.ngOnChanges();
    }
  }

  public onRowClick(state: State): void {
    this.stateSelected.emit(state);
  }

  // Check each field for the filter value, this will eventually change to search by field.
  public filter(state: State, filterValue: string): boolean {
    return state.description?.toLowerCase().includes(filterValue)
      || state.displayName?.toLowerCase().includes(filterValue)
      || state.identifier?.toLowerCase().includes(filterValue)
      || state.source?.toLowerCase().includes(filterValue)
      || state.subsystem?.toLowerCase().includes(filterValue)
      || state.type?.toLowerCase().includes(filterValue)
      || state.units?.toLowerCase().includes(filterValue);
  }
}

@NgModule({
  declarations: [
    StateTableComponent
  ],
  exports: [
    StateTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class StateTableModule {}
