import { Component, ChangeDetectionStrategy, NgModule, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { State, StateMap } from '../../../models';
import { StellarTableComponent } from '../../stellar-table/stellar-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-state-table',
  styleUrls: [ './../../stellar-table/stellar-table.component.css' ],
  templateUrl: './../../stellar-table/stellar-table.component.html'
})
export class StateTableComponent extends StellarTableComponent<State> implements OnChanges, OnInit {
  @Input() public stateMap: StateMap;
  @Input() public history: boolean;

  @Output() public stateSelected: EventEmitter<State>;

  public stateMapSize: number;

  constructor() {
    super();

    this.stateSelected = new EventEmitter<State>();
  }

  public ngOnInit(): void {
    this.columns.push(
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
      this.columns.push(
        'stateId',
        'updated'
      );

      this.historyTable = true;
    }
  }

  public ngOnChanges(): void {
    // Get all our states from our map so the table can display them.
    if (this.stateMap) {
      const keys = Object.keys(this.stateMap);
      const states: State[] = [];
      this.stateMapSize = keys.length;

      for (const key of keys) {
        states.push(this.stateMap[key]);
      }

      this.rows = states;
    }

    super.ngOnChanges();
  }

  public onRowClick(state: State): void {
    this.stateSelected.emit(state);
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
    CommonModule
  ]
})
export class StateTableModule {}
