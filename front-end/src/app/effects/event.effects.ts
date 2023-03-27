import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, merge, of, concat } from 'rxjs';
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
      ofRoute([
        'collection/:collectionId/events',
        'collection/:collectionId/events/',
        'collection/:collectionId/events/:id',
        'collection/:collectionId/event-history'
      ]),
      mapToParam<string>('collectionId'),
      switchMap((collectionId) => {
        const url = this.router.routerState.snapshot.url.split('/').pop();
        let history = false;

        if (url === 'event-history') {
          history = true;
        }

        return merge(
          of(
            LayoutActions.isLoading({
              isLoading: true
            })
          ),
          of(
            LayoutActions.toggleSidenav({
              showSidenav: false
            })
          ),
          this.getEvents(collectionId, history)
        );
      })
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
    private router: Router,
    private eventService: EventService
  ) {}

  public getEvents(collectionId: string, history: boolean): Observable<Action> {
    if (!history) {
      return concat(
        this.eventService.getEvents(collectionId).pipe(
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
        ),
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
      );
    } else {
      return concat(
        this.eventService.getEventHistory(collectionId).pipe(
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
        ),
        of(LayoutActions.isLoading({ isLoading: false }))
      );
    }
  }
}
