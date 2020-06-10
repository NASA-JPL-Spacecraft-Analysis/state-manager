import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ROOT_EFFECTS_INIT, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { concat, of } from 'rxjs';

import { StateManagementService } from '../services/state-management.service';
import { ofRoute } from '../functions/router';
import { InformationTypesActions, StateVariableActions, LayoutActions, EventActions, CollectionActions } from '../actions';
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

  public navAll = createEffect(() =>
    this.actions.pipe(
      ofRoute(/\*/),
      switchMap(_ =>
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        }))
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
          of(LayoutActions.toggleSidenav({
            showSidenav: false
          })),
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
            map(relationships => StateVariableActions.setRelationships({
              relationships
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchRelationshipsFailure({
                  error
                })
              ]
            )
          ),
          this.stateManagementService.getStateVariables().pipe(
            map(stateVariables => StateVariableActions.setStateVariables({
              stateVariables
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchStateVariablesFailure({
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
            map(relationshipHistory => StateVariableActions.setRelationshipHistory({
              relationshipHistory
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchRelationshipHistoryFailure({
                  error
                })
              ]
            )
          ),
          this.stateManagementService.getStateVariables().pipe(
            map(stateVariables => StateVariableActions.setStateVariables({
              stateVariables
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchStateVariablesFailure({
                  error
                })
              ]
            )
          )
        )
      )
    )
  );

  public navState = createEffect(() =>
    this.actions.pipe(
      ofRoute('states'),
      switchMap(_ =>
        concat(
          of(LayoutActions.toggleSidenav({
            showSidenav: false
          })),
          this.stateManagementService.getStateVariables().pipe(
            map(stateVariables => StateVariableActions.setStateVariables({
              stateVariables
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchStateVariablesFailure({
                  error
                })
              ]
            )
          ),
          this.stateManagementService.getStateEnumerations().pipe(
            map(stateEnumerations => StateVariableActions.setStateEnumerations({
              stateEnumerations
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchStateEnumerationsFailure({
                  error
                })
              ]
            )
          ),
          this.stateManagementService.getIdentifiers().pipe(
            map(identifiers => StateVariableActions.setIdentifiers({
              identifiers
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchIdentifiersFailure({
                  error
                })
              ]
            )
          )
        )
      )
    )
  );

  public navStateHistory = createEffect(() =>
    this.actions.pipe(
      ofRoute('state-history'),
      switchMap(_ =>
        concat(
          this.stateManagementService.getStateHistory().pipe(
            map(stateHistory => StateVariableActions.setStateHistory({
              stateHistory
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchStateHistoryFailure({
                  error
                })
              ]
            )
          ),
          this.stateManagementService.getStateVariables().pipe(
            map(stateVariables => StateVariableActions.setStateVariables({
              stateVariables
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchStateVariablesFailure({
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
