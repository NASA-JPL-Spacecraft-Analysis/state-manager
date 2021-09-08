import { Component, NgModule, ChangeDetectionStrategy, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MaterialModule } from 'src/app/material';
import { InformationType } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-information-type-table',
  styleUrls: [ 'information-type-table.component.css' ],
  templateUrl: 'information-type-table.component.html'
})
export class InformationTypeTableComponent implements OnInit, OnChanges {
  @Input() public informationTypes: InformationType[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public dataSource: MatTableDataSource<InformationType>;
  public displayedColumns: string[];
  public showTable: boolean;

  constructor() {
    this.displayedColumns = [];
  }

  public ngOnInit(): void {
    this.displayedColumns.push(
      'id',
      'type',
      'identifier',
      'displayName',
      'description',
      'externalLink'
    );
  }

  public ngOnChanges(): void {
    if (this.informationTypes && this.displayedColumns) {
      this.dataSource = new MatTableDataSource(this.informationTypes);

      this.dataSource.paginator = this.paginator;
    }

    this.showTable = this.informationTypes && this.informationTypes.length > 0;
  }
}

@NgModule({
  declarations: [
    InformationTypeTableComponent
  ],
  exports: [
    InformationTypeTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class InformationTypeTableModule {}
