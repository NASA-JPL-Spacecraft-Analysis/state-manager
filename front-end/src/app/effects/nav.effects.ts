import { Injectable } from '@angular/core';
import { Actions, createEffect, ROOT_EFFECTS_INIT, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { StateManagementService } from '../services/state-management.service';
import { CollectionActions } from '../actions';

@Injectable()
export class NavEffects {
  constructor(
    private actions: Actions,
    private stateManagementService: StateManagementService
  ) {}

  public effectsInit = createEffect(() =>
    this.actions.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(_ =>
        this.stateManagementService.getCollections().pipe(
          map(collectionMap => CollectionActions.fetchCollectionsSuccess({
            collectionMap
          })),
          catchError(
            (error: Error) => [
              CollectionActions.fetchCollectionsFailure({
                error
              })
            ]
          )
        )
      )
    )
  );
}
