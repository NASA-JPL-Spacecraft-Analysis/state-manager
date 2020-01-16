import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';

import { StateManagementService } from '../services/state-management.service';
import { StateVariableActions, ToastActions } from '../actions';
import { StateVariable } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StateVariableEffects {
  constructor(
    private actions: Actions,
    private stateManagementService: StateManagementService
  ) {}

  public createStateVariable = createEffect(() => {
    return this.actions.pipe(
      ofType(StateVariableActions.createStateVariable),
      switchMap(({ stateVariable }) =>
        this.stateManagementService.createStateVariable(
          stateVariable
        ).pipe(
          switchMap(
            (createdStateVariable: StateVariable) => [
              StateVariableActions.createStateVariableSuccess({
                stateVariable: createdStateVariable
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

  public fetchIdentifiers = createEffect(() => {
    return this.actions.pipe(
      ofType(StateVariableActions.fetchIdentifiers),
      switchMap(_ =>
        this.stateManagementService.getIdentifiers().pipe(
          switchMap((identifiers) => {
            return [
              StateVariableActions.setIdentifiers({ identifiers })
            ];
          }),
          catchError(
            (error: Error) => [
              StateVariableActions.fetchIdentifiersFailure({ error })
            ]
          )
        )
      )
    );
  });
  /*
    return this.actions.pipe(
      ofType(StateVariableActions.editStateVariable),
      switchMap(({ stateVariable }) =>
        this.stateManagementService.editStateVariable(
          */

  public parseUploadedStateVariables = createEffect(() => {
    return this.actions.pipe(
      ofType(StateVariableActions.parseStateVariablesFileSuccess),
      switchMap(({ parsedStateVariables }) => {
        return this.stateManagementService.createStateVariables(
          parsedStateVariables
        ).pipe(
          switchMap(
            (stateVariables: StateVariable[]) => [
              StateVariableActions.createStateVariablesSuccess({
                stateVariables
              }),
              ToastActions.showToast({
                message: 'State variable(s) uploaded',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: HttpErrorResponse) => [
              StateVariableActions.uploadStateVariablesFailure({ error }),
              ToastActions.showToast({
                message: error.error,
                toastType: 'error'
              })
            ]
          )
        );
      })
    );
  });
}
