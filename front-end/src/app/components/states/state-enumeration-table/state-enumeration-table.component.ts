import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { StateEnumerationHistory } from 'src/app/models';
import { TableComponent } from '../../table/table.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-enumeration-table',
  styleUrls: [ 'state-enumeration-table.component.css' ],
  templateUrl: 'state-enumeration-table.component.html'
})
export class StateEnumerationTableComponent extends TableComponent<StateEnumerationHistory> implements OnInit, OnChanges {
  @Input() public stateEnumerationHistory: StateEnumerationHistory[];

  public showTable: boolean;

  public ngOnInit(): void {
    this.displayedColumns.push(
      'id',
      'label',
      'stateId',
      'stateEnumerationId',
      'updated',
      'value'
    );
  }

  public ngOnChanges(): void {
    if (this.stateEnumerationHistory && this.displayedColumns) {
      this.dataSource = new MatTableDataSource(this.stateEnumerationHistory);
    }

    this.showTable = this.stateEnumerationHistory && this.stateEnumerationHistory.length > 0;
  }

  public filter(stateEnumerationHistory: StateEnumerationHistory, filterValue: string): boolean {
    return stateEnumerationHistory.label?.toLowerCase().includes(filterValue)
      || stateEnumerationHistory.value?.toString().includes(filterValue);
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
    CommonModule,
    MaterialModule
  ]
})
export class StateEnumerationTableModule{}
