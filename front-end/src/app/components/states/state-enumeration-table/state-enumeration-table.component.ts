import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { StateEnumerationHistory } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-enumeration-table',
  styleUrls: [ 'state-enumeration-table.component.css' ],
  templateUrl: 'state-enumeration-table.component.html'
})
export class StateEnumerationTableComponent implements OnInit, OnChanges {
  @Input() public stateEnumerationHistory: StateEnumerationHistory[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public dataSource: MatTableDataSource<StateEnumerationHistory>;
  public displayedColumns: string[];
  public showTable: boolean;

  constructor() {
    this.displayedColumns = [];
  }

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

      this.dataSource.paginator = this.paginator;
    }

    this.showTable = this.stateEnumerationHistory && this.stateEnumerationHistory.length > 0;
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
