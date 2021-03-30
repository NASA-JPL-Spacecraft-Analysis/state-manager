import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, EMPTY, merge, of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { CollectionActions, EventActions, GroupActions, InformationTypesActions, LayoutActions, StateActions } from '../actions';
import { AppState } from '../app-store';
import { mapToParam, ofRoute } from '../functions/router';
import { EventService, GroupService, InformationTypesService, StateService } from '../services';

@Injectable()
export class GroupEffects {
  constructor(
    private actions: Actions,
    private eventService: EventService,
    private groupService: GroupService,
    private informationTypesService: InformationTypesService,
    private router: Router,
    private stateService: StateService,
    private store: Store<AppState>
  ) {}

  public getGroupsAndMappingsByCollectionId = createEffect(() => {
    return this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      switchMap(({ id }) => {
        if (id) {
          return this.getGroupsAndMappings(id);
        }

        return [];
      })
    )
  });

  public getGroupsAndMappingsBySelectedCollectionId = createEffect(() => {
    return this.actions.pipe(
      ofRoute('collection/:collectionId/groups'),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state => {
        if (state.collection.selectedCollectionId) {
          return this.getGroupsAndMappings(state.collection.selectedCollectionId);
        }

        return [];
      })
    )
  });

  public navGroups = createEffect(() => {
    return this.actions.pipe(
      ofRoute('collection/:collectionId/groups'),
      mapToParam<string>('collectionId'),
      switchMap(collectionId =>
        this.getItems(collectionId)
      )
    )
  });

  private getItems(collectionId: string): Observable<Action> {
    const url = this.router.routerState.snapshot.url.split('/').pop();

    if (url === 'groups') {
      return merge(
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
        ),
        this.stateService.getStates(
          collectionId
        ).pipe(
          map(states => StateActions.setStates({
            states
          })),
          catchError(
            (error: Error) => [
              StateActions.fetchStatesFailure({
                error
              })
            ]
          )
        )
      )
    }
  }
  
  private getGroupsAndMappings(collectionId: string): Observable<Action> {
    const url = this.router.routerState.snapshot.url.split('/').pop();

    if (url === 'groups') {
      return merge(
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
        this.groupService.getGroupsAndMappings(
          collectionId
        ).pipe(
          map(groups => GroupActions.setGroups({
            groups
          })),
          catchError(
            (error: Error) => [
              GroupActions.fetchGroupsFailure({
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
