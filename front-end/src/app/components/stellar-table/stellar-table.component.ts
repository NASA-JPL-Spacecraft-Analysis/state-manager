import { R } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnChanges } from '@angular/core';
import { startCase } from 'lodash';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ 'stellar-table.component.css' ],
  templateUrl: 'stellar-table.component.html'
})
export class StellarTableComponent<T> implements OnChanges {
  public readonly MAX_ENTRIES_PER_PAGE = 100;

  public columnFilters: Map<string, string>;
  // Column names that match the type's property names.
  public columns: string[] = [];
  public historyTable: boolean;
  public page = 1;
  // The paginated data.
  public paginatedRows: T[] = [];
  public maxPages: number;
  // The unedited list of data.
  public rows: T[] = [];

  public ngOnChanges(): void {
    this.columnFilters = new Map();

    if (this.rows.length > this.MAX_ENTRIES_PER_PAGE) {
      // If we have more entries than the max we need to paginate.
      this.pageChange(this.page);
    } else {
      // No need to paginate.
      this.paginatedRows = this.rows;
    }

    this.maxPages = Math.ceil(this.rows.length / this.MAX_ENTRIES_PER_PAGE);
  }

  public filterData(event: KeyboardEvent, column: string): void {
    const filterValue = (event.target as HTMLInputElement).value;

    // The user has deleted the filter, so remove it from the map.
    if (filterValue === '') {
      this.columnFilters.delete(column);
    } else {
      this.columnFilters.set(column, filterValue);
    }

    // Only try and filter if the user has defined them / hasn't deleted them all.
    if (this.columnFilters.size !== 0) {
      // Keep track of the current filter value for each column.
      const filteredItems = [];

      for (const item of this.rows) {
        if (this.matchFilters(item)) {
          filteredItems.push(item);
        }
      }

      this.paginatedRows = filteredItems;
    } else {
      this.pageChange(this.page);
    }
  }

  /**
   * Converts the column names to camel case.
   *
   * @param columnName The camel case column name.
   * @returns The formatted column name.
   */
  public formatColumnName(columnName: string): string {
    return startCase(columnName);
  }

  /**
   * Stub method so we can call the child's onRowClick.
   *
   * @param row The item that was clicked on.
   */
  public onRowClick(row: T) {}

  public pageChange(newPage: number): void {
    if (newPage > 0 && newPage <= this.maxPages) {
      this.page = newPage;

      this.paginatedRows = this.rows.slice(
        (this.page - 1) * this.MAX_ENTRIES_PER_PAGE, this.page * this.MAX_ENTRIES_PER_PAGE);
    }
  }

  public sortColumn(column: string, ascending: boolean): void {
    this.paginatedRows.sort((a, b) => {
      if (a[column] < b[column]) {
        return -1;
      } else if (a[column] > b[column]) {
        return 1;
      }

      return 0;
    });

    if (ascending) {
      this.paginatedRows.reverse();
    }
  }

  private matchFilters(item: T): boolean {
    for (const col of this.columnFilters.keys()) {
      if (typeof item[col] === 'number' && item[col] !== this.columnFilters.get(col)
          || item[col].indexOf(this.columnFilters.get(col)) === -1) {
        return false;
      }
    }

    return true;
  }
}

@NgModule({
  declarations: [
    StellarTableComponent
  ],
  exports: [
    StellarTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StellarTableModule {}
