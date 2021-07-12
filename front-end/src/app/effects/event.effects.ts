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
import { Event } from '../models';

@Injectable()
export class EventEffects {
  public createEvent = createEffect(() =>
    this.actions.pipe(
      ofType(EventActions.createEvent),
      withLatestFrom(this.store),
      map(([action, state]) => ({ action, state })),
      switchMap(({ action, state }) => {
        if (this.validationService.isDuplicateIdentifier(
          action.event.identifier,
          action.event.id,
          state.events.eventIdentifierMap
        )) {
          return [
            ToastActions.showToast({
              message: '',
              toastType: 'error'
            })
          ];
        }

        return this.eventService.createEvent(
          action.collectionId,
          action.event
        ).pipe(
          switchMap((event: Event) => [
            EventActions.createEventSuccess({
              event: {
                ...action.event,
                id: event.id
              }
            }),
            LayoutActions.toggleSidenav({
              showSidenav: false
            }),
            ToastActions.showToast({
              message: 'Event created',
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            EventActions.createEventFailure({
              error
            }),
            ToastActions.showToast({
              message: 'Event creation failed',
              toastType: 'error'
            })
          ])
        );
      })
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
      withLatestFrom(this.store),
      map(([action, state]) => ({ action, state })),
      switchMap(({ action, state }) => {
        if (this.validationService.isDuplicateIdentifier(
          action.event.identifier,
          action.event.id,
          state.events.eventIdentifierMap
        )) {
          return [
            ToastActions.showToast({
              message: 'Duplicate identifier provided',
              toastType: 'error'
            })
          ];
        }

        return this.eventService.updateEvent(
          action.event
        ).pipe(
          switchMap((event: Event) => [
            EventActions.updateEventSuccess({
              event: {
                ...action.event,
                id: event.id
              }
            }),
            ToastActions.showToast({
              message: 'Event edited',
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            EventActions.updateEventFailure({
              error
            }),
            ToastActions.showToast({
              message: 'Event editing failed',
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
