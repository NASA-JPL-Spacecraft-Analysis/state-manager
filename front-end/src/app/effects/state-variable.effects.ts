import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError } from 'rxjs/operators';

import { StateManagementService } from '../services/state-management.service';
import { StateVariableActions, ToastActions, FileUploadActions } from '../actions';
import { StateVariable, StateVariableMap, Relationship, StateEnumerationMap, InformationTypesMap } from '../models';
import { Observable } from 'rxjs';

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

  public uploadInformationTypes = createEffect(() => {
    return this.actions.pipe(
      ofType(StateVariableActions.uploadInformationTypes),
      switchMap(({ file }) => {
        return this.stateManagementService.saveInformationTypesFile(
          file
        ).pipe(
          switchMap(
            (informationTypes: InformationTypesMap) => [
              StateVariableActions.uploadInformationTypesSuccess({
                informationTypes
              }),
              ToastActions.showToast({
                message: 'Information types uploaded',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: HttpErrorResponse) => [
              StateVariableActions.uploadInformationTypesFailure({ error }),
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

  public uploadEnumerations = createEffect(() => {
    return this.actions.pipe(
      ofType(StateVariableActions.uploadEnumerations),
      switchMap(({ file }) => {
        return this.stateManagementService.saveEnumerationsFile(
          file
        ).pipe(
          switchMap(
            (enumerations: StateEnumerationMap) => [
              StateVariableActions.uploadEnumerationsSuccess({
                enumerations
              }),
              ToastActions.showToast({
                message: 'Enumerations uploaded',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: HttpErrorResponse) => [
              StateVariableActions.uploadEnumerationsFailure({ error }),
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

  public uploadStateVariables = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadStateVariables),
      switchMap(({ file, fileType }) => {
        let saveStateVariables: Observable<StateVariableMap>;

        if (fileType === 'csv') {
          saveStateVariables = this.stateManagementService.saveStateVariablesCsv(file);
        } else {
          saveStateVariables = this.stateManagementService.saveStateVariablesJson(file);
        }

        return saveStateVariables.pipe(
          switchMap(
            (stateVariableMap: StateVariableMap) => [
              FileUploadActions.uploadStateVariablesSuccess({
                stateVariableMap
              }),
              ToastActions.showToast({
                message: 'State variable(s) uploaded',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: HttpErrorResponse) => [
              FileUploadActions.uploadStateVariablesFailure({ error }),
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
