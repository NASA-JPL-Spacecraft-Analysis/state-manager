import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SubSink } from 'subsink';

import { MaterialModule } from 'src/app/material';
import { EventTableModule } from 'src/app/components';
import { AppState } from 'src/app/app-store';
import { EventMap } from 'src/app/models';
import { getEventHistoryMap } from 'src/app/selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'event-history',
  styleUrls: [ 'event-history.component.css' ],
  templateUrl: 'event-history.component.html'
})
export class EventHistoryComponent implements OnDestroy {
  public eventHistoryMap: EventMap;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.store.pipe(select(getEventHistoryMap)).subscribe(eventHistoryMap => {
        this.eventHistoryMap = eventHistoryMap;
        this.changeDetectorRef.markForCheck();
      })
    )
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

@NgModule({
  declarations: [
    EventHistoryComponent
  ],
  exports: [
    EventHistoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EventTableModule
  ]
})
export class EventHistoryModule {}
