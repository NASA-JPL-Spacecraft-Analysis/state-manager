import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { startCase } from 'lodash';
import { Group, GroupMapping } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-table',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html'
})
export class TableComponent<T> implements OnChanges {
  public readonly MAX_ENTRIES_PER_PAGE = 100;

  public columnFilters: Map<string, string>;
  // Column names that match the type's property names.
  public columns: string[] = [];
  public historyTable: boolean;
  public filteredRows: T[] = [];
  public page = 1;
  // The paginated data.
  public paginatedRows: T[] = [];
  public maxPages: number;
  // The unedited list of data.
  public rows: T[];

  constructor() {
    this.rows = [];
  }

  public ngOnChanges(): void {
    this.filteredRows = this.rows;
    this.columnFilters = new Map();

    this.calculateMaxPages(this.rows);

    if (this.rows.length > this.MAX_ENTRIES_PER_PAGE) {
      // If we have more entries than the max we need to paginate.
      this.pageChange(this.page, this.rows);
    } else {
      // No need to paginate.
      this.paginatedRows = this.rows;
    }
  }

  /**
   * This function provides an alternate API for ingesting table data,
   * groups are a list so we need to support them here.
   *
   * @param dataList A plain list of objects.
   */
  public convertListData(dataList: T[]): void {
    if (dataList) {
      this.rows = dataList;
    }
  }

  /**
   * Takes the incoming map of data and converts it to a list so we can
   * use it in the table.
   *
   * @param dataMap The map of IDs -> data
   */
  public convertMappedData(dataMap: Record<string, T>): void {
    if (dataMap) {
      this.rows = Object.values(dataMap);
    }
  }

  public async filterData(event: KeyboardEvent, column: string): Promise<void> {
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
      this.filteredRows = [];

      for (const item of this.rows) {
        if (this.matchFilters(item)) {
          this.filteredRows.push(item);
        }
      }

      if (this.filteredRows.length === 0) {
        // If we filtered out all our results, display things accordingly.
        this.paginatedRows = [];
        this.maxPages = 0;
        this.page = 0;
      } else {
        this.calculateMaxPages(this.filteredRows);

        // When we filter, always move back to the first page.
        this.pageChange(1, this.filteredRows);
      }
    } else {
      this.calculateMaxPages(this.rows);

      this.pageChange(this.page, this.rows);
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
  public onRowClick(row: T) { }

  public pageChange(newPage: number, rows: T[]): void {
    if (newPage > 0 && newPage <= this.maxPages) {
      this.page = newPage;

      this.paginatedRows = rows.slice(
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

  private calculateMaxPages(rows: T[]): void {
    this.maxPages = Math.ceil(rows.length / this.MAX_ENTRIES_PER_PAGE);
  }

  /**
   * Looks at all of the current column filters and applies them to the passed item.
   *
   * @param item The row that is being filtered.
   * @returns A boolean if the row should show or hide.
   */
  private matchFilters(item: T): boolean {
    for (const col of this.columnFilters.keys()) {
      // If we're looking at a number, just do an equality check. On strings check for indexOf.
      if ((typeof item[col] === 'number' && item[col] !== this.columnFilters.get(col))
        || item[col].indexOf(this.columnFilters.get(col)) === -1) {
        return false;
      }
    }

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
    BrowserModule,
    CommonModule
  ]
})
export class TableModule { }
