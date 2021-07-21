import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Observable, merge, EMPTY, of } from 'rxjs';

import { EventService, InformationTypeService, StateService, RelationshipService, CommandService, ConstraintService } from '../services';
import { ToastActions, RelationshipActions, CollectionActions, EventActions, InformationTypeActions, StateActions, CommandActions, ConstraintActions, LayoutActions } from '../actions';
import { ofRoute, mapToParam } from '../functions/router';
import { RelationshipResponse } from '../models';

@Injectable()
export class RelationshipEffects {

  public createRelationship = createEffect(() =>
    this.actions.pipe(
      ofType(RelationshipActions.createRelationship),
      switchMap(({ collectionId, relationship }) =>
        this.relationshipService.createRelationship(
          collectionId,
          relationship
        ).pipe(
          switchMap((createRelationship: RelationshipResponse) => [
            RelationshipActions.createRelationshipSuccess({
              relationship: createRelationship.relationship
            }),
            ToastActions.showToast({
              message: createRelationship.message,
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            RelationshipActions.createRelationshipFailure({
              error
            }),
            ToastActions.showToast({
              message: error.message,
              toastType: 'error'
            })
          ])
        )
      )
    )
  );

  public navRelationships = createEffect(() =>
    this.actions.pipe(
      ofRoute([ 'collection/:collectionId/relationships', 'collection/:collectionId/relationship-history' ]),
      mapToParam<string>('collectionId'),
      switchMap(collectionId =>
        this.getRelationships(collectionId)
      )
    )
  );

  public navRelationshipsByCollectionId = createEffect(() =>
    this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      switchMap(({ id }) => {
        if (id !== null) {
          return this.getRelationships(id);
        }

        return [];
      })
    )
  );

  public updateRelationship = createEffect(() =>
    this.actions.pipe(
      ofType(RelationshipActions.updateRelationship),
      switchMap(({ relationship }) =>
        this.relationshipService.updateRelationship(
          relationship
        ).pipe(
          switchMap((updateRelationship: RelationshipResponse) => [
            RelationshipActions.updateRelationshipSuccess({
              relationship: updateRelationship.relationship
            }),
            ToastActions.showToast({
              message: updateRelationship.message,
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            RelationshipActions.updateRelationshipFailure({
              error
            }),
            ToastActions.showToast({
              message: error.message,
              toastType: 'error'
            })
          ])
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private commandService: CommandService,
    private constraintService: ConstraintService,
    private eventService: EventService,
    private informationTypeService: InformationTypeService,
    private router: Router,
    private relationshipService: RelationshipService,
    private stateService: StateService
  ) {}

  private getRelationships(collectionId: string): Observable<Action> {
    const url = this.router.routerState.snapshot.url.split('/').pop();
    const sharedActions = merge(
      this.commandService.getCommands(
        collectionId
      ).pipe(
        map(commands => CommandActions.setCommands({
          commands
        })),
        catchError(
          (error: Error) => [
            CommandActions.fetchCommandsFailure({
              error
            })
          ]
        )
      ),
      this.constraintService.getConstraints(
        collectionId
      ).pipe(
        map(constraints => ConstraintActions.setConstraints({
          constraints
        })),
        catchError(
          (error: Error) => [
            ConstraintActions.fetchConstraintsFailure({
              error
            })
          ]
        )
      ),
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
      this.informationTypeService.getInformationTypes(
        collectionId
      ).pipe(
        map(informationTypes => InformationTypeActions.setInformationTypes({
          informationTypes
        })),
        catchError(
          (error: Error) => [
            InformationTypeActions.fetchInformationTypesFailure({
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
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
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
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
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
