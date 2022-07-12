import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, OnChanges, OnInit } from '@angular/core';

import { StateEnumerationHistory } from 'src/app/models';
import { TableComponent} from '../../table/table.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-state-enumeration-table',
  styleUrls: [ '../../table/table.component.css' ],
  templateUrl: '../../table/table.component.html'
})
export class StateEnumerationTableComponent extends TableComponent<StateEnumerationHistory> implements OnInit, OnChanges {
  @Input() public stateEnumerationHistory: StateEnumerationHistory[];

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.columns.push(
      'id',
      'label',
      'stateId',
      'stateEnumerationId',
      'updated',
      'value'
    );

    this.historyTable = true;
  }

  public ngOnChanges(): void {
    this.rows = this.stateEnumerationHistory;

    super.ngOnChanges();
  }
}

@NgModule({
  declarations: [
    StateEnumerationTableComponent
  ],
  exports: [
    StateEnumerationTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StateEnumerationTableModule {}
