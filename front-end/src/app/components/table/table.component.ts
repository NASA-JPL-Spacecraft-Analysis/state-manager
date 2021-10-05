import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table',
  styleUrls: [ 'table.component.css' ],
  templateUrl: 'table.component.html'
})
export class TableComponent<T> implements OnChanges {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public dataSource: MatTableDataSource<T>;
  public displayedColumns: string[] = [];

  public ngOnChanges(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.filter;
  }

  /**
   * Called when the user inputs a character into our filter. We need to clean the filter up before actually
   * using it.
   *
   * @param filterValue The filter the user has entered.
   */
  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();

    this.dataSource.filter = filterValue;
  }

  public filter(item: T, filterValue: string): boolean {
    return true;
  }
}

@NgModule({
  declarations: [
    TableComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class TableModule {}
