import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect } from '@ngrx/effects';
import { Observable, EMPTY, merge, of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { GroupActions, LayoutActions } from '../actions';
import { AppState } from '../app-store';
import { ofRoute } from '../functions/router';
import { GroupService, ValidationService } from '../services';

@Injectable()
export class GroupEffects {
  constructor(
    private actions: Actions,
    private groupService: GroupService,
    private router: Router,
    private store: Store<AppState>,
    private validationService: ValidationService
  ) {}

  /*
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
  */

  public getGroupsAndMappingsBySelectedCollectionId = createEffect(() => {
    return this.actions.pipe(
      ofRoute('collection/:collectionId/groups'),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state => {
        const selectedCollectionId = state.collection.selectedCollectionId;

        if (selectedCollectionId) {
          return this.getGroupsAndMappings(selectedCollectionId);
        }

        return [];
      })
    )
  });
  
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