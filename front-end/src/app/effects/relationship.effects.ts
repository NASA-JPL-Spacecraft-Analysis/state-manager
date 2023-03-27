import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Observable, merge, of, concat } from 'rxjs';

import {
  CommandService,
  ConstraintService,
  EventService,
  InformationTypeService,
  MockInformationTypesService,
  RelationshipService,
  StateService
} from '../services';
import {
  ToastActions,
  RelationshipActions,
  LayoutActions,
  StateActions,
  InformationTypeActions,
  EventActions,
  CommandActions,
  ConstraintActions
} from '../actions';
import { ofRoute, mapToParam } from '../functions/router';
import { RelationshipResponse } from '../models';
import { InformationTypeEffects } from './information-types.effects';
import { EventEffects } from './event.effects';
import { StateEffects } from './state.effects';
import { CommandEffects } from './command.effects';
import { ConstraintEffects } from './constraint.effects';

@Injectable()
export class RelationshipEffects {
  public createRelationship = createEffect(() =>
    this.actions.pipe(
      ofType(RelationshipActions.createRelationship),
      switchMap(({ collectionId, relationship }) =>
        concat(
          this.relationshipService.createRelationship(collectionId, relationship).pipe(
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
          ),
          of(LayoutActions.isSaving({ isSaving: false }))
        )
      )
    )
  );

  public navRelationships = createEffect(() =>
    this.actions.pipe(
      ofRoute([
        'collection/:collectionId/relationships',
        'collection/:collectionId/relationships/',
        'collection/:collectionId/relationships/:id',
        'collection/:collectionId/relationship-history'
      ]),
      mapToParam<string>('collectionId'),
      switchMap((collectionId) => {
        const url = this.router.routerState.snapshot.url.split('/').pop();
        const history = url === 'relationship-history';

        const data = merge(
          of(
            LayoutActions.isLoading({
              isLoading: true
            })
          ),
          of(
            LayoutActions.toggleSidenav({
              showSidenav: false
            })
          ),
          this.constraintService.getConstraints(collectionId).pipe(
            map((constraints) =>
              ConstraintActions.setConstraints({
                constraints
              })
            ),
            catchError((error: Error) => [
              ConstraintActions.fetchConstraintsFailure({
                error
              })
            ])
          ),
          this.commandService.getCommands(collectionId).pipe(
            map((commands) =>
              CommandActions.setCommands({
                commands
              })
            ),
            catchError((error: Error) => [
              CommandActions.fetchCommandsFailure({
                error
              })
            ])
          ),
          this.eventService.getEvents(collectionId).pipe(
            map((events) =>
              EventActions.setEvents({
                events
              })
            ),
            catchError((error: Error) => [
              EventActions.fetchEventsFailure({
                error
              })
            ])
          ),
          this.informationTypesService.getInformationTypes(collectionId).pipe(
            map((informationTypes) =>
              InformationTypeActions.setInformationTypes({
                informationTypes
              })
            ),
            catchError((error: Error) => [
              InformationTypeActions.fetchInformationTypesFailure({
                error
              })
            ])
          ),
          this.stateService.getStates(collectionId).pipe(
            map((states) =>
              StateActions.setStates({
                states
              })
            ),
            catchError((error: Error) => [
              StateActions.fetchStatesFailure({
                error
              })
            ])
          ),
          this.getRelationships(collectionId, history)
        );

        return concat(data, of(LayoutActions.isLoading({ isLoading: false })));
      })
    )
  );

  public updateRelationship = createEffect(() =>
    this.actions.pipe(
      ofType(RelationshipActions.updateRelationship),
      switchMap(({ relationship }) =>
        concat(
          this.relationshipService.updateRelationship(relationship).pipe(
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
          ),
          of(LayoutActions.isSaving({ isSaving: false }))
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private commandService: CommandService,
    private constraintService: ConstraintService,
    private eventService: EventService,
    private informationTypesService: InformationTypeService,
    private stateService: StateService,
    private relationshipService: RelationshipService,
    private router: Router
  ) {}

  private getRelationships(collectionId: string, history: boolean): Observable<Action> {
    if (!history) {
      return this.relationshipService.getRelationships(collectionId).pipe(
        map((relationships) =>
          RelationshipActions.setRelationships({
            relationships
          })
        ),
        catchError((error: Error) => [
          RelationshipActions.fetchRelationshipsFailure({
            error
          })
        ])
      );
    } else {
      return this.relationshipService.getRelationshipHistory(collectionId).pipe(
        map((relationshipHistory) =>
          RelationshipActions.setRelationshipHistory({
            relationshipHistory
          })
        ),
        catchError((error: Error) => [
          RelationshipActions.fetchRelationshipHistoryFailure({
            error
          })
        ])
      );
    }
  }
}
