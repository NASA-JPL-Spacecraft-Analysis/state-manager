import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { Observable, merge, of, concat, EMPTY } from 'rxjs';

import { RelationshipService } from '../services';
import { ToastActions, RelationshipActions, LayoutActions } from '../actions';
import { ofRoute, mapToParam } from '../functions/router';
import { RelationshipMap, RelationshipResponse } from '../models';
import { StateEffects } from './state.effects';
import { AppState } from '../app-store';
import { EventEffects } from './event.effects';
import { ConstraintEffects } from './constraint.effects';
import { CommandEffects } from './command.effects';
import { InformationTypeEffects } from './information-types.effects';

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
        'collection/:collectionId/relationships/:id'
      ]),
      mapToParam<string>('collectionId'),
      withLatestFrom(this.store),
      map(([collectionId, store]) => ({ collectionId, store })),
      switchMap(({ collectionId, store }) => {
        const url = this.router.routerState.snapshot.url.split('/').pop();

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
          this.constraintEffects.loadConstraints(collectionId, store.constraints.constraintMap),
          this.commandEffects.loadCommands(collectionId, store.commands.commandMap),
          this.eventEffects.loadEvents(collectionId, store.events.eventMap),
          this.informationTypeEffects.loadInformationTypes(
            collectionId,
            store.informationTypes.informationTypeMap
          ),
          this.stateEffects.loadStates(collectionId, store.states.stateMap),
          this.loadRelationships(collectionId, store.relationships.relationships)
        );

        return concat(data, of(LayoutActions.isLoading({ isLoading: false })));
      })
    )
  );

  public navRelationshipHistory = createEffect(() =>
    this.actions.pipe(
      ofRoute(['collection/:collectionId/relationship-history']),
      mapToParam<string>('collectionId'),
      withLatestFrom(this.store),
      map(([collectionId, store]) => ({ collectionId, store })),
      switchMap(({ collectionId, store }) => {
        const actions = merge(
          of(
            LayoutActions.toggleSidenav({
              showSidenav: false
            })
          ),
          of(
            LayoutActions.isLoading({
              isLoading: true
            })
          )
        );

        if (!store.relationships.relationshipHistory) {
          return merge(
            actions,
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
            )
          );
        }

        return merge(
          actions,
          of(
            LayoutActions.isLoading({
              isLoading: false
            })
          )
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
    private router: Router,
    private store: Store<AppState>
  ) {}

  private loadRelationships(
    collectionId: string,
    relationships: RelationshipMap
  ): Observable<Action> {
    if (!relationships) {
      return this.relationshipService.getRelationships(collectionId).pipe(
        map((loadedRelationships) =>
          RelationshipActions.setRelationships({
            relationships: loadedRelationships
          })
        ),
        catchError((error: Error) => [
          RelationshipActions.fetchRelationshipsFailure({
            error
          })
        ])
      );
    }

    return EMPTY;
  }
}
