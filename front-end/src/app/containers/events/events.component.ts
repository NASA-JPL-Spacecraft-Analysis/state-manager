import {
  Component,
  NgModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  getEventIdentifierMap,
  getIsLoading,
  getIsSaving
} from 'src/app/selectors';
import { EventSidenavModule, EventTableModule } from 'src/app/components';
import { UploadConstants } from 'src/app/constants';
import { NavigationService } from '../../services';
import { LoadingModule } from '../../components/loading/loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-events',
  styleUrls: ['events.component.css'],
  templateUrl: 'events.component.html'
})
export class EventsComponent implements OnDestroy {
  public event: StateEvent;
  public eventIdentifierMap: IdentifierMap;
  public eventMap: EventMap;
  public eventTypes: string[];
  public isLoading: boolean;
  public isSaving: boolean;
  public selectedCollectionId: string;
  public showSidenav: boolean;

  private eventId: string;
  private subscriptions: SubSink;

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location,
    private navigationService: NavigationService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getEventIdentifierMap)).subscribe((eventIdentifierMap) => {
        this.eventIdentifierMap = eventIdentifierMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getEventMap)).subscribe((eventMap) => {
        this.eventMap = eventMap;
        this.changeDetectorRef.markForCheck();

        this.eventId = this.activatedRoute.snapshot.paramMap.get('id');

        if (this.eventId && this.eventMap) {
          this.onModifyEvent(this.eventMap[this.eventId]);
        }
      }),
      this.store.pipe(select(getIsLoading)).subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getIsSaving)).subscribe((isSaving) => {
        this.isSaving = isSaving;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getShowSidenav)).subscribe((showSidenav) => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCollectionId)).subscribe((selectedCollectionId) => {
        this.selectedCollectionId = selectedCollectionId;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedEvent)).subscribe((event) => {
        this.event = event;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getEventTypes)).subscribe((eventTypes) => {
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
    this.store.dispatch(
      EventActions.setSelectedEvent({
        event
      })
    );

    const newEventId = event?.id ?? '';

    this.navigationService.addItemIDToURL(this.eventId, newEventId, this.location, this.router.url);
    this.eventId = newEventId;

    this.store.dispatch(
      LayoutActions.toggleSidenav({
        showSidenav: true
      })
    );
  }

  public onEventFileUpload(): void {
    this.store.dispatch(
      LayoutActions.openFileUploadDialog({
        collectionId: this.selectedCollectionId,
        csvFormat: [UploadConstants.eventCsvUploadFormat],
        dialogType: 'Event',
        jsonFormat: UploadConstants.eventJsonUploadFormat,
        types: this.eventTypes
      })
    );
  }

  public onSidenavOutput(event: StateEvent): void {
    if (event === undefined) {
      // If the user is closing the sidenav intentionally, remove the ID from the URL.
      this.navigationService.removeIDFromURL(this.location, this.router.url);
      this.eventId = '';

      this.store.dispatch(
        LayoutActions.toggleSidenav({
          showSidenav: false
        })
      );
    } else {
      this.store.dispatch(LayoutActions.isSaving({ isSaving: true }));

      if (event.id === null) {
        this.store.dispatch(
          EventActions.createEvent({
            collectionId: this.selectedCollectionId,
            event
          })
        );
      } else {
        this.store.dispatch(
          EventActions.updateEvent({
            event
          })
        );
      }
    }
  }
}

@NgModule({
  declarations: [EventsComponent],
  exports: [EventsComponent],
  imports: [
    CommonModule,
    EventSidenavModule,
    EventTableModule,
    LoadingModule,
    MaterialModule,
    RouterModule
  ]
})
export class EventsModule {}
