import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { CollectionActions, EventActions } from '../actions';
import { StateManagementService } from '../services/state-management.service';
import { AppState } from '../app-store';
import { ofRoute } from '../functions/router';

@Injectable()
export class EventEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store<AppState>,
    private stateManagementService: StateManagementService
  ) {}

  public getEventByStateCollectionId = createEffect(() => {
    return this.actions.pipe(
      ofRoute([ 'events', 'event-history' ]),
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
    const url = this.router.routerState.snapshot.url;

    if (url === '/events') {
      return this.stateManagementService.getEventMap(
        id
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
      );
    } else if (url === '/event-history') {
      return this.stateManagementService.getEventHistoryMap(
        id
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
      );
    }

    return EMPTY;
  }
}
