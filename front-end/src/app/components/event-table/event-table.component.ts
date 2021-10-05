import { Component, ChangeDetectionStrategy, NgModule, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { EventMap, Event } from 'src/app/models';
import { TableComponent } from '../table/table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event-table',
  styleUrls: [ 'event-table.component.css' ],
  templateUrl: 'event-table.component.html'
})
export class EventTableComponent extends TableComponent<Event> implements OnChanges, OnInit {
  @Input() public eventMap: EventMap;
  @Input() public history: boolean;

  @Output() public eventSelected: EventEmitter<Event>;

  constructor() {
    super();

    this.eventSelected = new EventEmitter<Event>();
  }

  public ngOnChanges(): void {
    if (this.eventMap && this.displayedColumns) {
      this.dataSource = new MatTableDataSource([ ...Object.values(this.eventMap) ]);

      super.ngOnChanges();
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

  public onRowClick(event: Event): void {
    this.eventSelected.emit(event);
  }

  // Check each field for the filter value, this will eventually change to search by field.
  public filter(event: Event, filterValue: string): boolean {
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
