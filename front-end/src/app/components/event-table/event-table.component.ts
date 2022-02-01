import { Component, ChangeDetectionStrategy, NgModule, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventMap, Event } from 'src/app/models';
import { StellarTableComponent } from '../stellar-table/stellar-table.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event-table',
  styleUrls: [ './../stellar-table/stellar-table.component.css' ],
  templateUrl: './../stellar-table/stellar-table.component.html'
})
export class EventTableComponent extends StellarTableComponent<Event> implements OnChanges, OnInit {
  @Input() public eventMap: EventMap;
  @Input() public history: boolean;

  @Output() public eventSelected: EventEmitter<Event>;

  public eventMapSize: number;

  constructor() {
    super();

    this.eventSelected = new EventEmitter<Event>();
  }

  public ngOnInit(): void {
    this.columns.push(
      'identifier',
      'displayName',
      'description',
      'externalLink',
      'type'
    );

    if (this.history) {
      this.columns.push(
        'eventId',
        'updated'
      );
    }
  }

  public ngOnChanges(): void {
    if (this.eventMap) {
      const keys = Object.keys(this.eventMap);
      const events: Event[] = [];
      this.eventMapSize = keys.length;

      for (const key of keys) {
        events.push(this.eventMap[key]);
      }

      this.rows = events;

      super.ngOnChanges();
    }

    super.ngOnChanges();
  }

  public onRowClick(event: Event): void {
    this.eventSelected.emit(event);
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
    CommonModule
  ]
})
export class EventTableModule {}
