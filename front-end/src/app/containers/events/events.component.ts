import { Component, NgModule, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { MaterialModule } from 'src/app/material';
import { AppState } from 'src/app/app-store';
import { EventActions, LayoutActions, ToastActions } from 'src/app/actions';
// TODO: Have to alias our event to support file upload. Check with Dan to see if we have a better name.
import { Event as StateEvent, EventMap, IdentifierMap } from 'src/app/models';
import {
  getShowSidenav,
  getEventTypes,
  getEventMap,
  getSelectedEvent,
  getSelectedCollectionId,
  getEventIdentifierMap
} from 'src/app/selectors';
import { EventSidenavModule, EventTableModule } from 'src/app/components';
import { UploadConstants } from 'src/app/constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-events',
  styleUrls: [ 'events.component.css' ],
  templateUrl: 'events.component.html'
})
export class EventsComponent implements OnDestroy {
  public event: StateEvent;
  public eventIdentifierMap: IdentifierMap;
  public eventMap: EventMap;
  public eventTypes: string[];
  public selectedCollectionId: string;
  public showSidenav: boolean;

  private subscriptions: SubSink;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getEventIdentifierMap)).subscribe(eventIdentifierMap => {
        this.eventIdentifierMap = eventIdentifierMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getEventMap)).subscribe(eventMap => {
        this.eventMap = eventMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getShowSidenav)).subscribe(showSidenav => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCollectionId)).subscribe(selectedCollectionId => {
        this.selectedCollectionId = selectedCollectionId;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedEvent)).subscribe(event => {
        this.event = event;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getEventTypes)).subscribe(eventTypes => {
        this.eventTypes = eventTypes;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onDuplicateIdentifier(duplicateIdentifier: boolean): void {
    if (duplicateIdentifier) {
      this.store.dispatch(
        ToastActions.showToast({
          message: 'Please provide a unique identifier',
          toastType: 'error'
        })
      );
    }
  }

  public onModifyEvent(event?: StateEvent): void {
    this.store.dispatch(EventActions.setSelectedEvent({
      event
    }));

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onEventFileUpload(): void {
    this.store.dispatch(LayoutActions.openFileUploadDialog({
      collectionId: this.selectedCollectionId,
      csvFormat: [ UploadConstants.eventCsvUploadFormat ],
      dialogType: 'Event',
      jsonFormat: UploadConstants.eventJsonUploadFormat,
      types: this.eventTypes
    }));
  }

  public onSidenavOutput(event: StateEvent): void {
    if (event === undefined) {
      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: false
      }));
    } else {
      if (event.id === null) {
        this.store.dispatch(EventActions.createEvent({
          collectionId: this.selectedCollectionId,
          event
        }));
      } else {
        this.store.dispatch(EventActions.updateEvent({
          event
        }));
      }
    }
  }
}

@NgModule({
  declarations: [
    EventsComponent
  ],
  exports: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    EventSidenavModule,
    EventTableModule,
    MaterialModule,
    RouterModule
  ]
})
export class EventsModule {}
