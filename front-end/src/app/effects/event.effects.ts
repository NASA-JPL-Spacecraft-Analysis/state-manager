import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, EMPTY, merge, of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { CollectionActions, EventActions, LayoutActions, ToastActions } from '../actions';
import { EventService } from '../services';
import { AppState } from '../app-store';
import { ofRoute } from '../functions/router';
import { ValidationService } from '../services/validation.service';
import { Event, EventResponse } from '../models';
import { updateEvent } from '../actions/event.actions';

@Injectable()
export class EventEffects {
  public createEvent = createEffect(() =>
    this.actions.pipe(
      ofType(EventActions.createEvent),
      switchMap(({ collectionId, event }) =>
        this.eventService.createEvent(
          collectionId,
          event
        ).pipe(
          switchMap((createEvent: EventResponse) => [
            EventActions.createEventSuccess({
              event: createEvent.event
            }),
            LayoutActions.toggleSidenav({
              showSidenav: false
            }),
            ToastActions.showToast({
              message: createEvent.message,
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            EventActions.createEventFailure({
              error
            }),
            ToastActions.showToast({
              message: error.message,
              toastType: 'error'
            })
          ])
        )
      )
    )
  );

  public getEventByStateCollectionId = createEffect(() =>
    this.actions.pipe(
      ofRoute([ 'collection/:collectionId/events', 'collection/:collectionId/event-history' ]),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state => {
        if (state.collection.selectedCollectionId) {
          return this.getEventInformation(state.collection.selectedCollectionId);
        }

        return [];
      })
    )
  );

  public getEventByCollectionId = createEffect(() =>
    this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      switchMap(({ id }) => {
        if (id !== null) {
          return this.getEventInformation(id);
        }

        return [];
      })
    )
  );

  public updateEvent = createEffect(() =>
    this.actions.pipe(
      ofType(EventActions.updateEvent),
      switchMap(({ event }) => {
        return this.eventService.updateEvent(
          event
        ).pipe(
          switchMap((updateEvent: EventResponse) => [
            EventActions.updateEventSuccess({
              event: updateEvent.event
            }),
            ToastActions.showToast({
              message: updateEvent.message,
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            EventActions.updateEventFailure({
              error
            }),
            ToastActions.showToast({
              message: error.message,
              toastType: 'error'
            })
          ])
        );
      })
    )
  );

  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store<AppState>,
    private eventService: EventService,
    private validationService: ValidationService
  ) {}

  private getEventInformation(collectionId: string): Observable<Action> {
    const url = this.router.routerState.snapshot.url.split('/').pop();

    if (url === 'events') {
      return merge(
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
        this.eventService.getEvents(
          collectionId
        ).pipe(
          map(events => EventActions.setEvents({
            events
          })),
          catchError(
            (error: Error) => [
              EventActions.fetchEventMapFailure({
                error
              })
            ]
          )
        )
      );
    } else if (url === 'event-history') {
      return merge(
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
        this.eventService.getEventHistory(
          collectionId
        ).pipe(
          map(eventHistory => EventActions.setEventHistory({
            eventHistory
          })),
          catchError(
            (error: Error) => [
              EventActions.fetchEventHistoryMapFailure({
                error
              })
            ]
          )
        )
      );
    }

    return EMPTY;
  }
}
