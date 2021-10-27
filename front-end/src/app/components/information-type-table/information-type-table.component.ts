import { Component, NgModule, ChangeDetectionStrategy, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { InformationType } from 'src/app/models';
import { TableComponent } from '../table/table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-information-type-table',
  styleUrls: [ 'information-type-table.component.css' ],
  templateUrl: 'information-type-table.component.html'
})
export class InformationTypeTableComponent extends TableComponent<InformationType> implements OnInit, OnChanges {
  @Input() public informationTypes: InformationType[];

  public showTable: boolean;

  constructor() {
    super();
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

      super.ngOnChanges();
    }

    this.showTable = this.informationTypes && this.informationTypes.length > 0;
  }

  public filter(informationType: InformationType, filterValue: string): boolean {
    return informationType.description?.toLowerCase().includes(filterValue)
      || informationType.displayName?.toLowerCase().includes(filterValue)
      || informationType.externalLink?.toLowerCase().includes(filterValue)
      || informationType.identifier?.toLowerCase().includes(filterValue)
      || informationType.type?.toLowerCase().includes(filterValue);
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
