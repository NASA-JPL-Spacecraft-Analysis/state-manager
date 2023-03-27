import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Observable, merge, of, concat } from 'rxjs';

import { RelationshipService } from '../services';
import { ToastActions, RelationshipActions, LayoutActions } from '../actions';
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

        return merge(
          of(
            LayoutActions.toggleSidenav({
              showSidenav: false
            })
          ),
          of(
            LayoutActions.isLoading({
              isLoading: true
            })
          ),
          this.constraintEffects.getConstraints(collectionId, history),
          this.commandEffects.getCommands(collectionId, history),
          this.commandEffects.getCommandArgumentHistory(collectionId),
          this.eventEffects.getEvents(collectionId, history),
          this.informationTypeEffects.getInformationTypes(collectionId),
          this.stateEffects.getStates(collectionId, history),
          this.stateEffects.getStateEnumerationHistory(collectionId),
          this.getRelationships(collectionId, history)
        );
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
    private commandEffects: CommandEffects,
    private constraintEffects: ConstraintEffects,
    private eventEffects: EventEffects,
    private informationTypeEffects: InformationTypeEffects,
    private stateEffects: StateEffects,
    private relationshipService: RelationshipService,
    private router: Router
  ) {}

  private getRelationships(collectionId: string, history: boolean): Observable<Action> {
    if (!history) {
      return concat(
        this.relationshipService.getRelationships(collectionId).pipe(
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
        ),
        of(LayoutActions.isLoading({ isLoading: false }))
      );
    } else {
      return concat(
        this.relationshipService.getRelationshipHistory(collectionId).pipe(
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
        ),
        of(LayoutActions.isLoading({ isLoading: false }))
      );
    }
  }
}
