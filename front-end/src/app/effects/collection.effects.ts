import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import { CollectionActions } from '../actions';

@Injectable()
export class CollectionEffects {
  constructor(
    private actions: Actions
  ) {}

  public fetchCollectionsSuccess = createEffect(() => {
    return this.actions.pipe(
      ofType(CollectionActions.fetchCollectionsSuccess),
      switchMap(({ collectionMap }) => {
        const keys = Object.keys(collectionMap);

        if (keys.length > 0) {
          return [ CollectionActions.setSelectedCollection({
            id: Number(keys[0])
          })];
        }

        return [];
      })
    );
  });
}
