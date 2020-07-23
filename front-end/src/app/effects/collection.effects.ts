import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import { CollectionActions, ToastActions } from '../actions';
import { StateManagementService } from '../services/state-management.service';
import { Collection } from '../models';

@Injectable()
export class CollectionEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private stateManagementService: StateManagementService
  ) {}

  public createCollection = createEffect(() => {
    return this.actions.pipe(
      ofType(CollectionActions.createCollection),
      switchMap(({ name }) =>
        this.stateManagementService.createCollection(
          name
        ).pipe(
          switchMap(
            (collection: Collection) => [
              CollectionActions.createCollectionSuccess({
                collection
              }),
              ToastActions.showToast({
                message: 'Collection created',
                toastType: 'success'
              })
            ]
          )
        )
      )
    );
  });

  public editCollection = createEffect(() => {
    return this.actions.pipe(
      ofType(CollectionActions.editCollection),
      switchMap(({ collectionId, name }) =>
        this.stateManagementService.editCollection(
          collectionId,
          name
        ).pipe(
          switchMap(
            (collection: Collection) => [
              CollectionActions.editCollectionSuccess({
                collection
              }),
              ToastActions.showToast({
                message: 'Collection edited',
                toastType: 'success'
              })
            ]
          )
        )
      )
    );
  });

  public fetchCollectionsSuccess = createEffect(() => {
    return this.actions.pipe(
      ofType(CollectionActions.fetchCollectionsSuccess),
      switchMap(({ collectionMap }) => {
        const keys = Object.keys(collectionMap);
        const route = this.router.url.split('/').pop();
        let collectionId = null;

        // Search our URL for a valid collectionId.
        for (const splitUrl of this.router.url.split('/')) {
          if (keys.includes(splitUrl)) {
            collectionId = Number(splitUrl);
          }
        }

        if (keys.length > 0) {
          // If the user is going directly to a URL with a collectionId, go there.
          if (collectionId && keys.includes(String(collectionId))) {
            if (route) {
              this.router.navigate([ 'collection/' + collectionId + '/' + route ]);
            } else {
              this.router.navigate([ 'collection/' + collectionId ]);
            }

            return [
              CollectionActions.setSelectedCollection({
                id: collectionId
              })
            ];
          } else {
            // Navigate to the first collection we come across.
            this.router.navigate([ 'collection/' + keys[0] ]);

            return [
              CollectionActions.setSelectedCollection({
                id: Number(keys[0])
              })
            ];
          }
        }

        // TODO: We need to handle what happens if there aren't any collections.
        return [];
      })
    );
  });
}
