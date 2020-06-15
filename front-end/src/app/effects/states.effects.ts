import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, withLatestFrom, map } from 'rxjs/operators';

import { StateManagementService } from '../services/state-management.service';
import { ToastActions, EventActions, StateActions } from '../actions';
import { Event, Relationship, State } from '../models';
import { Observable, merge } from 'rxjs';
import { ofRoute } from '../functions/router';
import { AppState } from '../app-store';

@Injectable()
export class StatesEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private stateManagementService: StateManagementService,
    private store: Store<AppState>
  ) {}

  public createEvent = createEffect(() => {
    return this.actions.pipe(
      ofType(EventActions.createEvent),
      switchMap(({ event }) =>
        this.stateManagementService.createEvent(
          event
        ).pipe(
          switchMap(
            (createdEvent: Event) => [
              EventActions.createEventSuccess({
                event: createdEvent
              }),
              ToastActions.showToast({
                message: 'Event created',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: Error) => [
              EventActions.createEventFailure({ error }),
              ToastActions.showToast({
                message: 'Event creation failed',
                toastType: 'error'
              })
            ]
          )
        )
      )
    );
  });

  public createRelationship = createEffect(() => {
    return this.actions.pipe(
      ofType(StateActions.createRelationship),
      switchMap(({ relationship }) =>
        this.stateManagementService.createRelationship(
          relationship
        ).pipe(
          switchMap(
            (createdRelationship: Relationship) => [
              StateActions.createRelationshipSuccess({
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
              StateActions.createRelationshipFailure({ error }),
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


  public createState = createEffect(() => {
    return this.actions.pipe(
      ofType(StateActions.createState),
      switchMap(({ state, stateEnumerations }) =>
        this.stateManagementService.createState(
          state
        ).pipe(
          switchMap(
            (createdState: State) => [
              StateActions.createStateSuccess({
                state: createdState
              }),
              StateActions.saveEnumerations({
                stateId: createdState.id,
                enumerations: stateEnumerations,
              }),
              ToastActions.showToast({
                message: 'State created',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: Error) => [
              StateActions.createStateFailure({
                error
              }),
              ToastActions.showToast({
                message: 'State creation failed',
                toastType: 'error'
              })
            ]
          )
        )
      )
    );
  });

  public editEvent = createEffect(() => {
    return this.actions.pipe(
      ofType(EventActions.editEvent),
      switchMap(({ event }) =>
        this.stateManagementService.editEvent(
          event
        ).pipe(
          switchMap(
            (editedEvent: Event) => [
              EventActions.editEventSuccess({
                event: editedEvent
              }),
              ToastActions.showToast({
                message: 'Event edited',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: Error) => [
              EventActions.createEventFailure({ error }),
              ToastActions.showToast({
                message: 'Event editing failed',
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
      ofType(StateActions.editRelationship),
      switchMap(({ relationship }) =>
        this.stateManagementService.editRelationship(
          relationship
        ).pipe(
          switchMap(
            (editedRelationship: Relationship) => [
              StateActions.editRelationshipSuccess({
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
              StateActions.editRelationshipFailure({ error }),
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

  public editState = createEffect(() => {
    return this.actions.pipe(
      ofType(StateActions.editState),
      switchMap(({ state }) =>
        this.stateManagementService.editState(
          state
        ).pipe(
          switchMap(
            (editedState: State) => [
              StateActions.editStateSuccess({
                state: editedState
              }),
              ToastActions.showToast({
                message: 'State edited',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: Error) => [
              StateActions.editStateFailure({ error }),
              ToastActions.showToast({
                message: 'State editing failed',
                toastType: 'error'
              })
            ]
          )
        )
      )
    );
  });

  public navStates = createEffect(() => {
    return this.actions.pipe(
      ofRoute('states'),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state => {
        const collectionId = state.collection.selectedCollectionId;

        if (collectionId) {
          return merge(
            this.getStates(collectionId),
            this.stateManagementService.getStateEnumerations(
              collectionId
            ).pipe(
              map(stateEnumerations => StateActions.setStateEnumerations({
                stateEnumerations
              })),
              catchError(
                (error: Error) => [
                  StateActions.fetchStateEnumerationsFailure({
                    error
                  })
                ]
              )
            ),
            this.stateManagementService.getStateIdentifiers(
              collectionId
            ).pipe(
              map(identifiers => StateActions.setIdentifiers({
                identifiers
              })),
              catchError(
                (error: Error) => [
                  StateActions.fetchIdentifiersFailure({
                    error
                  })
                ]
              )
            )
          );
        }

        return [];
      })
    );
  });

  public navStatesHistory = createEffect(() => {
    return this.actions.pipe(
      ofRoute('state-history'),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state => {
        const collectionId = state.collection.selectedCollectionId;

        if (collectionId) {
          return this.getStates(collectionId);
        }

        return [];
      })
    );
  });

  public saveEnumerations = createEffect(() => {
    return this.actions.pipe(
      ofType(StateActions.saveEnumerations),
      switchMap(({ stateId, enumerations }) =>
        this.stateManagementService.saveEnumerations(
          stateId,
          enumerations
        ).pipe(
          switchMap((savedEnumerations) => {
            return [
              StateActions.saveEnumerationsSuccess({
                enumerations: savedEnumerations
              })
            ];
          }),
          catchError(
            (error: Error) => [
              StateActions.saveEnumerationsFailure({ error })
            ]
          )
        )
      )
    );
  });

  private getStates(collectionId: number): Observable<Action> {
    const url = this.router.routerState.snapshot.url;

    if (url === '/states') {
      return this.stateManagementService.getStates(
        collectionId
      ).pipe(
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
      );
    } else if (url === '/state-history') {
      return merge(
        this.stateManagementService.getStateHistory(
          collectionId
        ).pipe(
          map(stateHistoryMap => StateActions.setStateHistory({
            stateHistoryMap
          })),
          catchError(
            (error: Error) => [
              StateActions.fetchStateHistoryFailure({
                error
              })
            ]
          )
        ),
        this.stateManagementService.getStates(
          collectionId
        ).pipe(
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
      );
    }
  }
}
