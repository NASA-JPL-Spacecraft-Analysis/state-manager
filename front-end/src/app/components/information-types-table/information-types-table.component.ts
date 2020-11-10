import { Component, NgModule, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { InformationTypesMap, InformationTypes } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'information-types-table',
  styleUrls: [ 'information-types-table.component.css' ],
  templateUrl: 'information-types-table.component.html'
})
export class InformationTypesTableComponent implements OnChanges {
  @Input() public informationTypesMap: InformationTypesMap;

  public dataSource: MatTableDataSource<InformationTypes>;
  public displayedColumns: string[] = [];
  public informationTypesList: InformationTypes[];
  public typeMap: Map<number, string>;

  constructor() {
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
    this.informationTypesList = [];
    this.typeMap = new Map();

    if (this.informationTypesMap) {
      for (const typeKey of Object.keys(this.informationTypesMap)) {
        for (const key of Object.keys(this.informationTypesMap[typeKey])) {
          const informationType = this.informationTypesMap[typeKey][key];

          this.informationTypesList.push(informationType);
          this.typeMap.set(informationType.id, typeKey);
        }
      }
    }

    // Sort by id
    this.informationTypesList.sort((a, b) => a.id - b.id);

    this.dataSource = new MatTableDataSource(this.informationTypesList);

    this.dataSource.filterPredicate = this.filter.bind(this);
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();

    this.dataSource.filter = filterValue;
  }

  // Check each field for the filter value, this will eventually change to search by field.
  private filter(informationType: InformationTypes, filterValue: string): boolean {
    return informationType.description?.toLowerCase().includes(filterValue)
      || informationType.displayName?.toLowerCase().includes(filterValue)
      || informationType.externalLink?.toLowerCase().includes(filterValue)
      || informationType.identifier?.toLowerCase().includes(filterValue)
      || this.typeMap.get(informationType.id).toString().toLowerCase().includes(filterValue);
  }
}

@NgModule({
  declarations: [
    InformationTypesTableComponent
  ],
  exports: [
    InformationTypesTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class InformationTypesTableModule {}
