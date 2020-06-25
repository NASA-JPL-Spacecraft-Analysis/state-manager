import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { StateManagementService } from '../services/state-management.service';
import { FileUploadActions, ToastActions } from '../actions';
import { InformationTypesMap, StateEnumerationMap, StateMap, RelationshipMap, EventMap } from '../models';

@Injectable()
export class FileUploadEffects {
  constructor(
    private actions: Actions,
    private stateManagementService: StateManagementService
  ) {}

  public uploadInformationTypes = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadInformationTypes),
      switchMap(({ file, fileType, collectionId }) => {
        let saveInformationTypes: Observable<InformationTypesMap>;

        if (fileType === 'csv') {
          saveInformationTypes = this.stateManagementService.saveInformationTypesCsv(file, collectionId);
        } else {
          saveInformationTypes = this.stateManagementService.saveInformationTypesJson(file, collectionId);
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
      ofType(FileUploadActions.uploadStateEnumerations),
      switchMap(({ collectionId, file, fileType }) => {
        let saveEnumerations: Observable<StateEnumerationMap>;

        if (fileType === 'csv') {
          saveEnumerations = this.stateManagementService.saveEnumerationsCsv(
            collectionId,
            file
          );
        } else {
          saveEnumerations = this.stateManagementService.saveEnumerationsJson(
            collectionId,
            file
          );
        }

        return saveEnumerations.pipe(
          switchMap(
            (stateEnumerationMap: StateEnumerationMap) => [
              FileUploadActions.uploadStateEnumerationsSuccess({
                stateEnumerationMap
              }),
              ToastActions.showToast({
                message: 'Enumerations uploaded',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: HttpErrorResponse) => [
              FileUploadActions.uploadStateEnumerationsFailure({ error }),
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

  public uploadEvents = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadEvents),
      switchMap(({ file, fileType, collectionId }) => {
        let saveEvents: Observable<EventMap>;

        if (fileType === 'csv') {
          saveEvents = this.stateManagementService.saveEventsCsv(file, collectionId);
        } else {
          saveEvents = this.stateManagementService.saveEventsJson(file, collectionId);
        }

        return saveEvents.pipe(
          switchMap(
            (eventMap: EventMap) => [
              FileUploadActions.uploadEventsSuccess({
                eventMap
              }),
              ToastActions.showToast({
                message: 'Events uploaded',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: HttpErrorResponse) => [
              FileUploadActions.uploadEventsFailure({ error }),
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
      switchMap(({ file, fileType, collectionId }) => {
        let saveRelationships: Observable<RelationshipMap>;

        if (fileType === 'csv') {
          saveRelationships = this.stateManagementService.saveRelationshipsCsv(collectionId, file);
        } else {
          saveRelationships = this.stateManagementService.saveRelationshipsJson(collectionId, file);
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

  public uploadStates = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadStates),
      switchMap(({ collectionId, file, fileType }) => {
        let saveStates: Observable<StateMap>;

        if (fileType === 'csv') {
          saveStates = this.stateManagementService.saveStatesCsv(
            collectionId,
            file
          );
        } else {
          saveStates = this.stateManagementService.saveStatesJson(
            collectionId,
            file
          );
        }

        return saveStates.pipe(
          switchMap(
            (stateMap: StateMap) => [
              FileUploadActions.uploadStatesSuccess({
                stateMap
              }),
              ToastActions.showToast({
                message: 'State(s) uploaded',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: HttpErrorResponse) => [
              FileUploadActions.uploadStatesFailure({ error }),
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
