import { Component, NgModule, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { MaterialModule } from 'src/app/material';
import { AppState } from 'src/app/app-store';
import { EventActions, LayoutActions, ToastActions, FileUploadActions } from 'src/app/actions';
import { StateManagementConstants } from 'src/app/constants/state-management.constants';
// TODO: Have to alias our event to support file upload. Check with Dan to see if we have a better name.
import { Event as StateEvent, EventMap } from 'src/app/models';
import { getShowSidenav, getEventMap, getSelectedEvent, getSelectedCollectionId } from 'src/app/selectors';
import { EventSidenavModule, EventTableModule } from 'src/app/components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'events',
  styleUrls: [ 'events.component.css' ],
  templateUrl: 'events.component.html'
})
export class EventsComponent implements OnDestroy {
  public event: StateEvent;
  public eventMap: EventMap;
  public selectedCollectionId: number;
  public showSidenav: boolean;

  private subscriptions: SubSink;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
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
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onModifyEvent(event?: StateEvent): void {
    this.store.dispatch(EventActions.setSelectedEvent({
      event
    }));

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onFileUpload(fileEvent: Event): void {
    const file = (fileEvent.target as HTMLInputElement).files[0];
    const fileType = file.name.split('.').pop().toLowerCase();

    if (file && (fileType === 'csv' || fileType === 'json')) {
      this.store.dispatch(FileUploadActions.uploadEvents({
        file,
        fileType
      }));
    } else {
      this.store.dispatch(ToastActions.showToast({
        message: StateManagementConstants.wrongFiletypeUploadMessage,
        toastType: 'error'
      }));
    }
  }

  public onSidenavOutput(event: StateEvent): void {
    if (event === undefined) {
      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: false
      }));
    } else {
      if (event.id === null) {
        this.store.dispatch(EventActions.createEvent({
          event
        }));
      } else {
        this.store.dispatch(EventActions.editEvent({
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
