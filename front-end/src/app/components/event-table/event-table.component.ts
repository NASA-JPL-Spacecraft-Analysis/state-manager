import { Component, ChangeDetectionStrategy, NgModule, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { EventMap, Event } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event-table',
  styleUrls: [ 'event-table.component.css' ],
  templateUrl: 'event-table.component.html'
})
export class EventTableComponent implements OnChanges, OnInit {
  @Input() public eventMap: EventMap;
  @Input() public history: boolean;

  @Output() public eventSelected: EventEmitter<Event>;

  public dataSource: MatTableDataSource<Event>;
  public displayedColumns: string[];
  public eventList: Event[];

  constructor() {
    this.displayedColumns = [];
    this.eventSelected = new EventEmitter<Event>();
  }

  public ngOnChanges(): void {
    this.eventList = [];

    if (this.eventMap && this.displayedColumns) {
      for (const key of Object.keys(this.eventMap)) {
        this.eventList.push(this.eventMap[key]);
      }

      this.dataSource = new MatTableDataSource(this.eventList);

      this.dataSource.filterPredicate = this.filter;
    }
  }

  public ngOnInit(): void {
    this.displayedColumns.push(
      'identifier',
      'displayName',
      'description',
      'externalLink',
      'type'
    );

    if (this.history) {
      this.displayedColumns.push(
        'eventId',
        'updated'
      );
    }
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();

    this.dataSource.filter = filterValue;
  }

  public onRowClick(event: Event): void {
    this.eventSelected.emit(event);
  }

  // Check each field for the filter value, this will eventually change to search by field.
  private filter(event: Event, filterValue: string): boolean {
    return event.description?.toLowerCase().includes(filterValue)
      || event.displayName?.toLowerCase().includes(filterValue)
      || event.externalLink?.toLowerCase().includes(filterValue)
      || event.identifier?.toLowerCase().includes(filterValue);
  }
}

@NgModule({
  declarations: [
    EventTableComponent
  ],
  exports: [
    EventTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EventTableModule {}
