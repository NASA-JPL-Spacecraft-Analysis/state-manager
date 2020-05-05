import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError } from 'rxjs/operators';

import { StateManagementService } from '../services/state-management.service';
import { StateVariableActions, ToastActions } from '../actions';
import { StateVariable, Relationship } from '../models';

@Injectable()
export class StateVariableEffects {
  constructor(
    private actions: Actions,
    private stateManagementService: StateManagementService
  ) {}

  public createRelationship = createEffect(() => {
    return this.actions.pipe(
      ofType(StateVariableActions.createRelationship),
      switchMap(({ relationship }) =>
        this.stateManagementService.createRelationship(
          relationship
        ).pipe(
          switchMap(
            (createdRelationship: Relationship) => [
              StateVariableActions.createRelationshipSuccess({
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
              StateVariableActions.createRelationshipFailure({ error }),
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


  public createStateVariable = createEffect(() => {
    return this.actions.pipe(
      ofType(StateVariableActions.createStateVariable),
      switchMap(({ stateVariable, stateEnumerations }) =>
        this.stateManagementService.createStateVariable(
          stateVariable
        ).pipe(
          switchMap(
            (createdStateVariable: StateVariable) => [
              StateVariableActions.createStateVariableSuccess({
                stateVariable: createdStateVariable
              }),
              StateVariableActions.saveEnumerations({
                stateVariableId: createdStateVariable.id,
                enumerations: stateEnumerations,
              }),
              ToastActions.showToast({
                message: 'State variable created',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: Error) => [
              StateVariableActions.createStateVariableFailure({ error }),
              ToastActions.showToast({
                message: 'State variable creation failed',
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
      ofType(StateVariableActions.editRelationship),
      switchMap(({ relationship }) =>
        this.stateManagementService.editRelationship(
          relationship
        ).pipe(
          switchMap(
            (editedRelationship: Relationship) => [
              StateVariableActions.editRelationshipSuccess({
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
              StateVariableActions.editRelationshipFailure({ error }),
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

  public editStateVariable = createEffect(() => {
    return this.actions.pipe(
      ofType(StateVariableActions.editStateVariable),
      switchMap(({ stateVariable }) =>
        this.stateManagementService.editStateVariable(
          stateVariable
        ).pipe(
          switchMap(
            (editedStateVariable: StateVariable) => [
              StateVariableActions.editStateVariableSuccess({
                stateVariable: editedStateVariable
              }),
              ToastActions.showToast({
                message: 'State variable edited',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: Error) => [
              StateVariableActions.editStateVariableFailure({ error }),
              ToastActions.showToast({
                message: 'State variable editing failed',
                toastType: 'error'
              })
            ]
          )
        )
      )
    );
  });

  public saveEnumerations = createEffect(() => {
    return this.actions.pipe(
      ofType(StateVariableActions.saveEnumerations),
      switchMap(({ stateVariableId, enumerations }) =>
        this.stateManagementService.saveEnumerations(
          stateVariableId,
          enumerations
        ).pipe(
          switchMap((savedEnumerations) => {
            return [
              StateVariableActions.saveEnumerationsSuccess({
                enumerations: savedEnumerations
              })
            ];
          }),
          catchError(
            (error: Error) => [
              StateVariableActions.saveEnumerationsFailure({ error })
            ]
          )
        )
      )
    );
  });
}
