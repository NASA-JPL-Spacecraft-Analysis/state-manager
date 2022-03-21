import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, merge, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { EventActions, LayoutActions, ToastActions } from '../actions';
import { EventService } from '../services';
import { mapToParam, ofRoute } from '../functions/router';
import { EventResponse } from '../models';

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

  public navEvents = createEffect(() =>
    this.actions.pipe(
      ofRoute([
        'collection/:collectionId/events',
        'collection/:collectionId/event-history'
      ]),
      mapToParam<string>('collectionId'),
      switchMap(collectionId => {
        let history = true;

        if (this.router.routerState.snapshot.url.split('/').pop() === 'events') {
          history = false;
        }

        return merge(
          of(LayoutActions.toggleSidenav({
            showSidenav: false
          })),
          this.getEvents(collectionId, history)
        );
      })
    )
  );

  public updateEvent = createEffect(() =>
    this.actions.pipe(
      ofType(EventActions.updateEvent),
      switchMap(({ event }) =>
        this.eventService.updateEvent(
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
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private router: Router,
    private eventService: EventService
  ) {}

  public getEvents(collectionId: string, history: boolean): Observable<Action> {
    if (!history) {
      return merge(
        this.eventService.getEvents(
          collectionId
        ).pipe(
          map(events => EventActions.setEvents({
            events
          })),
          catchError(
            (error: Error) => [
              EventActions.fetchEventsFailure({
                error
              })
            ]
          )
        ),
        this.eventService.getEventTypes().pipe(
          map(eventTypes => EventActions.setEventTypes({
            eventTypes
          })),
          catchError(
            (error: Error) => [
              EventActions.fetchEventTypesFailure({
                error
              })
            ]
          )
        )
      );
    } else {
      return this.eventService.getEventHistory(
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
      );
    }
  }
}
