import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { CollectionActions, ToastActions } from '../actions';
import { StateManagementService } from '../services/state-management.service';
import { Collection } from '../models';
import { of, forkJoin, concat, merge } from 'rxjs';
import { ConfirmationDialogComponent } from '../components';
import { AppState } from '../app-store';

@Injectable()
export class CollectionEffects {
  constructor(
    private actions: Actions,
    private dialog: MatDialog,
    private router: Router,
    private stateManagementService: StateManagementService,
    private store: Store<AppState>
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
              CollectionActions.setSelectedCollection({
                id: collection.id
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

  public deleteCollection = createEffect(() => {
    return this.actions.pipe(
      ofType(CollectionActions.deleteCollection),
      switchMap(({ id, name }) => {
        const dialog = this.dialog.open(
          ConfirmationDialogComponent,
          {
            data: {
              confirmButtonColor: '#dc4545',
              confirmButtonText: 'Delete',
              message: 'You can recover your data by contacting FSPA support.',
              title: 'Delete collection "' + name + '"?'
            }
          }
        );
        return forkJoin([
          of(id),
          dialog.afterClosed(),
        ]);
      }),
      map(([ id, result ]) => ({
        id,
        result
      })),
      switchMap(({ id, result }) => {
        if (result) {
          return concat(
            this.stateManagementService.deleteCollection(
              id
            ).pipe(
              switchMap(
                (deletedCollectionId: number) => [
                  CollectionActions.deleteCollectionSuccess({
                    id: deletedCollectionId
                  }),
                  CollectionActions.setSelectedCollection({
                    id: null
                  }),
                  ToastActions.showToast({
                    message: 'Collection deleted',
                    toastType: 'success'
                  })
                ]
              )
            )
          );
        }

        return [
          CollectionActions.setSelectedCollection({
            id: null
          }),
          CollectionActions.setSelectedCollection({
            id
          })
        ];
      })
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
        let collectionId = null;

        // Search our URL for a valid collectionId.
        for (const splitUrl of this.router.url.split('/')) {
          if (keys.includes(splitUrl)) {
            collectionId = Number(splitUrl);
          }
        }

        if (keys.length > 0) {
          if (collectionId && keys.includes(String(collectionId))) {
            return [
              CollectionActions.setSelectedCollection({
                id: collectionId
              })
            ];
          } else {
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

  public setSelectedCollection = createEffect(() => {
    return this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      withLatestFrom(this.store),
      map(([action, state]) => ({ action, state })),
      switchMap(({ action, state }) => {
        let id = action.id;

        if (!id) {
          id = Number(Object.keys(state.collection.collectionMap)[0]);
        }

        const route = this.router.url.split('/').pop();

        // If the user is going directly to a URL, take them there.  Otherwise take them to the default page (states).
        if (route) {
          this.router.navigate([ 'collection/' + id + '/' + route ]);
        } else {
          this.router.navigate([ 'collection/' + id ]);
        }

        return [];
      })
    );
  });
}
