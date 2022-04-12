import { Component, ChangeDetectionStrategy, NgModule, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { State, StateMap } from '../../../models';
import { TableComponent } from '../../table/table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-state-table',
  styleUrls: [ '../../table/table.component.css' ],
  templateUrl: '../../table/table.component.html'
})
export class StateTableComponent extends TableComponent<State> implements OnChanges, OnInit {
  @Input() public stateMap: StateMap;
  @Input() public history: boolean;

  @Output() public stateSelected: EventEmitter<State>;

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
      'externalLink',
      'channelId',
      'restricted'
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
    this.convertMappedData(this.stateMap);

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
