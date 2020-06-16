import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ROOT_EFFECTS_INIT, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { concat } from 'rxjs';

import { StateManagementService } from '../services/state-management.service';
import { ofRoute } from '../functions/router';
import { InformationTypesActions, EventActions, CollectionActions, StateActions } from '../actions';
import { AppState } from '../app-store';

@Injectable()
export class NavEffects {
  constructor(
    private actions: Actions,
    private store: Store<AppState>,
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

  public navRelationships = createEffect(() =>
    this.actions.pipe(
      ofRoute('relationships'),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state =>
        concat(
          this.stateManagementService.getEventMap(
            state.collection.selectedCollectionId
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
          ),
          this.stateManagementService.getInformationTypes(
            state.collection.selectedCollectionId
          ).pipe(
            map(informationTypes => InformationTypesActions.setInformationTypes({
              informationTypes
            })),
            catchError(
              (error: Error) => [
                InformationTypesActions.fetchInformationTypesFailure({
                  error
                })
              ]
            )
          ),
          this.stateManagementService.getRelationships().pipe(
            map(relationships => StateActions.setRelationships({
              relationships
            })),
            catchError(
              (error: Error) => [
                StateActions.fetchRelationshipsFailure({
                  error
                })
              ]
            )
          ),
          this.stateManagementService.getStates(1).pipe(
            map(stateMap => StateActions.setStates({
              stateMap
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
      )
    )
  );

  public navRelationshipHistory = createEffect(() =>
    this.actions.pipe(
      ofRoute('relationship-history'),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state =>
        concat(
          this.stateManagementService.getEventMap(
            state.collection.selectedCollectionId
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
          ),
          this.stateManagementService.getInformationTypes(
            state.collection.selectedCollectionId
          ).pipe(
            map(informationTypes => InformationTypesActions.setInformationTypes({
              informationTypes
            })),
            catchError(
              (error: Error) => [
                InformationTypesActions.fetchInformationTypesFailure({
                  error
                })
              ]
            )
          ),
          this.stateManagementService.getRelationshipHistory().pipe(
            map(relationshipHistory => StateActions.setRelationshipHistory({
              relationshipHistory
            })),
            catchError(
              (error: Error) => [
                StateActions.fetchRelationshipHistoryFailure({
                  error
                })
              ]
            )
          ),
          this.stateManagementService.getStates(1).pipe(
            map(stateMap => StateActions.setStates({
              stateMap
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
      )
    )
  );
}
