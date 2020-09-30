import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Observable, merge, EMPTY } from 'rxjs';

import { EventService, InformationTypesService, StateService, RelationshipService } from '../services';
import { ToastActions, RelationshipActions, CollectionActions, EventActions, InformationTypesActions, StateActions } from '../actions';
import { ofRoute, mapToParam } from '../functions/router';
import { Relationship } from '../models';

@Injectable()
export class RelationshipEffects {
  constructor(
    private actions: Actions,
    private eventService: EventService,
    private informationTypesService: InformationTypesService,
    private router: Router,
    private relationshipService: RelationshipService,
    private stateService: StateService
  ) {}

  public createRelationship = createEffect(() => {
    return this.actions.pipe(
      ofType(RelationshipActions.createRelationship),
      switchMap(({ collectionId, relationship }) =>
        this.relationshipService.createRelationship(
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
        this.relationshipService.editRelationship(
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
      this.informationTypesService.getInformationTypes(
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
    );

    if (url === 'relationships') {
      return merge(
        sharedActions,
        this.relationshipService.getRelationships(
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
        this.relationshipService.getRelationshipHistory(
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
