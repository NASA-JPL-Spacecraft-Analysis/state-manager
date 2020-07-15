import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, EMPTY, merge, of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, concat } from 'rxjs/operators';

import { CollectionActions, EventActions, LayoutActions, ToastActions } from '../actions';
import { StateManagementService } from '../services/state-management.service';
import { AppState } from '../app-store';
import { ofRoute } from '../functions/router';
import { ValidationService } from '../services/validation.service';
import { Event } from '../models';

@Injectable()
export class EventEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store<AppState>,
    private stateManagementService: StateManagementService,
    private validationService: ValidationService
  ) {}

  public createEvent = createEffect(() => {
    return this.actions.pipe(
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

        return merge(
          of(LayoutActions.toggleSidenav({
            showSidenav: false
          })),
          this.stateManagementService.createEvent(
            action.collectionId,
            action.event
          ).pipe(
            switchMap(
              (event: Event) => [
                EventActions.createEventSuccess({
                  event
                }),
                ToastActions.showToast({
                  message: 'Event created',
                  toastType: 'success'
                })
              ]
            ),
            catchError(
              (error: Error) => [
                EventActions.createEventFailure({
                  error
                }),
                ToastActions.showToast({
                  message: 'Event creation failed',
                  toastType: 'error'
                })
              ]
            )
          )
        );
      })
    );
  });

  public editEvent = createEffect(() => {
    return this.actions.pipe(
      ofType(EventActions.editEvent),
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

        return merge(
          this.stateManagementService.editEvent(
            action.collectionId,
            action.event
          ).pipe(
            switchMap(
              (editedEvent: Event) => [
                EventActions.editEventSuccess({
                  event: editedEvent
                }),
                ToastActions.showToast({
                  message: 'Event edited',
                  toastType: 'success'
                })
              ]
            ),
            catchError(
              (error: Error) => [
                EventActions.createEventFailure({ error }),
                ToastActions.showToast({
                  message: 'Event editing failed',
                  toastType: 'error'
                })
              ]
            )
          )
        );
      })
    );
  });

  public getEventByStateCollectionId = createEffect(() => {
    return this.actions.pipe(
      ofRoute([ 'collection/:collectionId/events', 'collection/:collectionId/event-history' ]),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state => {
        if (state.collection.selectedCollectionId) {
          return this.getEventInformation(state.collection.selectedCollectionId);
        }

        return [];
      })
    );
  });

  public getEventByCollectionId = createEffect(() => {
    return this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      switchMap(({ id }) => {
        if (id !== null) {
          return this.getEventInformation(id);
        }

        return [];
      })
    );
  });

  private getEventInformation(id: number): Observable<Action> {
    const url = this.router.routerState.snapshot.url.split('/').pop();

    if (url === 'events') {
      return merge(
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
        this.stateManagementService.getEventMap(
          collectionId
        ).pipe(
          map(eventMap => EventActions.setEventMap({
            eventMap
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
        this.stateManagementService.getEventHistoryMap(
          collectionId
        ).pipe(
          map(eventHistoryMap => EventActions.setEventHistoryMap({
            eventHistoryMap
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
