import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { StateManagementService } from '../services/state-management.service';
import { FileUploadActions, ToastActions } from '../actions';
import { InformationTypesMap, StateEnumerationMap, StateVariableMap, RelationshipMap } from '../models';

@Injectable()
export class FileUploadEffects {
  constructor(
    private actions: Actions,
    private stateManagementService: StateManagementService
  ) {}

  public uploadInformationTypes = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadInformationTypes),
      switchMap(({ file, fileType }) => {
        let saveInformationTypes: Observable<InformationTypesMap>;

        if (fileType === 'csv') {
          saveInformationTypes = this.stateManagementService.saveInformationTypesCsv(file);
        } else {
          saveInformationTypes = this.stateManagementService.saveInformationTypesJson(file);
        }

        return saveInformationTypes.pipe(
          switchMap(
            (informationTypes: InformationTypesMap) => [
              FileUploadActions.uploadInformationTypesSuccess({
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
              FileUploadActions.uploadInformationTypesFailure({ error }),
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
      ofType(FileUploadActions.uploadEnumerations),
      switchMap(({ file, fileType }) => {
        let saveEnumerations: Observable<StateEnumerationMap>;

        if (fileType === 'csv') {
          saveEnumerations = this.stateManagementService.saveEnumerationsCsv(file);
        } else {
          saveEnumerations = this.stateManagementService.saveEnumerationsJson(file);
        }

        return saveEnumerations.pipe(
          switchMap(
            (enumerations: StateEnumerationMap) => [
              FileUploadActions.uploadEnumerationsSuccess({
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
              FileUploadActions.uploadEnumerationsFailure({ error }),
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

  public uploadRelationship = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadRelationships),
      switchMap(({ file, fileType }) => {
        let saveRelationships: Observable<RelationshipMap>;

        if (fileType === 'csv') {
        } else {
          saveRelationships = this.stateManagementService.saveRelationshipsJson(file);
        }

        return saveRelationships.pipe(
          switchMap(
            (relationshipMap: RelationshipMap) => [
              FileUploadActions.uploadRelationshipsSuccess({
                relationshipMap
              }),
              ToastActions.showToast({
                message: 'Relationship(s) uploaded',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: HttpErrorResponse) => [
              FileUploadActions.uploadRelationshipsFailure({ error }),
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
