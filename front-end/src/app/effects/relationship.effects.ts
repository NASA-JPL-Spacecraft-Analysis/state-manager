import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, withLatestFrom, map } from 'rxjs/operators';
import { Observable, merge, EMPTY } from 'rxjs';

import { StateManagementService } from '../services/state-management.service';
import { ToastActions, RelationshipActions, CollectionActions, EventActions, InformationTypesActions, StateActions } from '../actions';
import { ofRoute, mapToParam } from '../functions/router';
import { AppState } from '../app-store';
import { Relationship } from '../models';

@Injectable()
export class RelationshipEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private stateManagementService: StateManagementService,
    private store: Store<AppState>
  ) {}

  public createRelationship = createEffect(() => {
    return this.actions.pipe(
      ofType(RelationshipActions.createRelationship),
      switchMap(({ collectionId, relationship }) =>
        this.stateManagementService.createRelationship(
          collectionId,
          relationship
        ).pipe(
          switchMap(
            (createdRelationship: Relationship) => [
              RelationshipActions.createRelationshipSuccess({
                relationship: createdRelationship
              }),
              ToastActions.showToast({
                message: 'Relationship created',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: Error) => [
              RelationshipActions.createRelationshipFailure({ error }),
              ToastActions.showToast({
                message: 'Relationship creation failed',
                toastType: 'error'
              })
            ]
          )
        )
      )
    );
  });

  public editRelationship = createEffect(() => {
    return this.actions.pipe(
      ofType(RelationshipActions.editRelationship),
      switchMap(({ collectionId, relationship }) =>
        this.stateManagementService.editRelationship(
          collectionId,
          relationship
        ).pipe(
          switchMap(
            (editedRelationship: Relationship) => [
              RelationshipActions.editRelationshipSuccess({
                relationship: editedRelationship
              }),
              ToastActions.showToast({
                message: 'Relationship edited',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: Error) => [
              RelationshipActions.editRelationshipFailure({ error }),
              ToastActions.showToast({
                message: 'Relationship editing failed',
                toastType: 'error'
              })
            ]
          )
        )
      )
    );
  });

  public navRelationships = createEffect(() => {
    return this.actions.pipe(
      ofRoute([ 'collection/:collectionId/relationships', 'collection/:collectionId/relationship-history' ]),
      mapToParam<number>('collectionId'),
      switchMap(collectionId => {
        return this.getRelationships(Number(collectionId));
      })
    );
  });

  public navRelationshipsByCollectionId = createEffect(() => {
    return this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      switchMap(({ id }) => {
        if (id !== null) {
          return this.getRelationships(id);
        }

        return [];
      })
    );
  });

  private getRelationships(collectionId: number): Observable<Action> {
    const url = this.router.routerState.snapshot.url.split('/').pop();
    const sharedActions = merge(
      this.stateManagementService.getEvents(
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
      this.stateManagementService.getInformationTypes(
        collectionId
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
      this.stateManagementService.getStates(
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
    );

    if (url === 'relationships') {
      return merge(
        sharedActions,
        this.stateManagementService.getRelationships(
          collectionId
        ).pipe(
          map(relationships => RelationshipActions.setRelationships({
            relationships
          })),
          catchError(
            (error: Error) => [
              RelationshipActions.fetchRelationshipsFailure({
                error
              })
            ]
          )
        )
      );
    } else if (url === 'relationship-history') {
      return merge(
        sharedActions,
        this.stateManagementService.getRelationshipHistory(
          collectionId
        ).pipe(
          map(relationshipHistory => RelationshipActions.setRelationshipHistory({
            relationshipHistory
          })),
          catchError(
            (error: Error) => [
              RelationshipActions.fetchRelationshipHistoryFailure({
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
