import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, merge, of, concat, EMPTY } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { EventActions, LayoutActions, ToastActions } from '../actions';
import { EventService } from '../services';
import { mapToParam, ofRoute } from '../functions/router';
import { Event, EventMap, EventResponse } from '../models';
import { AppState } from '../app-store';

@Injectable()
export class EventEffects {
  public createEvent = createEffect(() =>
    this.actions.pipe(
      ofType(EventActions.createEvent),
      switchMap(({ collectionId, event }) =>
        concat(
          this.eventService.createEvent(collectionId, event).pipe(
            switchMap((createEvent: EventResponse) => [
              EventActions.createEventSuccess({
                event: createEvent.event
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
          ),
          of(LayoutActions.isSaving({ isSaving: false }))
        )
      )
    )
  );

  public navEvents = createEffect(() =>
    this.actions.pipe(
      ofRoute(['collection/:collectionId/events/', 'collection/:collectionId/events/:id']),
      mapToParam<string>('collectionId'),
      withLatestFrom(this.store),
      map(([collectionId, store]) => ({ collectionId, store })),
      switchMap(({ collectionId, store }) =>
        merge(
          of(
            LayoutActions.toggleSidenav({
              showSidenav: false
            })
          ),
          of(
            LayoutActions.isLoading({
              isLoading: true
            })
          ),
          concat(
            this.loadEvents(collectionId, store.events.eventMap),
            this.eventService.getEventTypes().pipe(
              map((eventTypes) =>
                EventActions.setEventTypes({
                  eventTypes
                })
              ),
              catchError((error: Error) => [
                EventActions.fetchEventTypesFailure({
                  error
                })
              ])
            ),
            of(LayoutActions.isLoading({ isLoading: false }))
          )
        )
      )
    )
  );

  public navEventHistory = createEffect(() =>
    this.actions.pipe(
      ofRoute(['collection/:collectionId/event-history']),
      mapToParam<string>('collectionId'),
      withLatestFrom(this.store),
      map(([collectionId, store]) => ({ collectionId, store })),
      switchMap(({ collectionId, store }) =>
        merge(
          of(
            LayoutActions.toggleSidenav({
              showSidenav: false
            })
          ),
          of(
            LayoutActions.isLoading({
              isLoading: true
            })
          ),
          store.events.eventHistoryMap
            ? this.eventService.getEventHistory(collectionId).pipe(
                map((eventHistory) =>
                  EventActions.setEventHistory({
                    eventHistory
                  })
                ),
                catchError((error: Error) => [
                  EventActions.fetchEventHistoryMapFailure({
                    error
                  })
                ])
              )
            : EMPTY,
          of(LayoutActions.isLoading({ isLoading: false }))
        )
      )
    )
  );

  public updateEvent = createEffect(() =>
    this.actions.pipe(
      ofType(EventActions.updateEvent),
      switchMap(({ event }) =>
        concat(
          this.eventService.updateEvent(event).pipe(
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
          ),
          of(LayoutActions.isSaving({ isSaving: false }))
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private eventService: EventService,
    private store: Store<AppState>
  ) {}

  public loadEvents(collectionId: string, eventMap: Record<string, Event>): Observable<Action> {
    if (!eventMap) {
      return this.eventService.getEvents(collectionId).pipe(
        map((events) =>
          EventActions.setEvents({
            events
          })
        ),
        catchError((error: Error) => [
          EventActions.fetchEventsFailure({
            error
          })
        ])
      );
    }

    return EMPTY;
  }
}
