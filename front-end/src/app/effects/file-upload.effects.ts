import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat, forkJoin, Observable, of} from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { EventService, InformationTypesService, ParseService, RelationshipService, StateService} from '../services';
import { FileUploadActions, StateActions, ToastActions } from '../actions';
import { InformationTypesMap, StateEnumerationMap, RelationshipMap, EventMap, StateEnumeration } from '../models';
import { createStatesSuccess } from '../actions/state.actions';

@Injectable()
export class FileUploadEffects {
  constructor(
    private actions: Actions,
    private eventService: EventService,
    private informationTypesService: InformationTypesService,
    private parseService: ParseService,
    private stateService: StateService,
    private relationshipService: RelationshipService
  ) {}

  public uploadInformationTypes = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadInformationTypes),
      switchMap(({ file, fileType, collectionId }) => {
        let saveInformationTypes: Observable<InformationTypesMap>;

        if (fileType === 'csv') {
          saveInformationTypes = this.informationTypesService.saveInformationTypesCsv(file, collectionId);
        } else {
          saveInformationTypes = this.informationTypesService.saveInformationTypesJson(file, collectionId);
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
      switchMap(({ collectionId, file }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseStateEnumerations(file)
        ])
      ),
      map(([ collectionId, parsedEnumerations ]) => ({
        collectionId,
        parsedEnumerations
      })),
      switchMap(({ collectionId, parsedEnumerations }) => {
        if (parsedEnumerations && parsedEnumerations.length > 0) {
          // TODO: Once we rename the db fields, remove this.
          for (const stateEnumeration of parsedEnumerations) {
            stateEnumeration['state_identifier'] = stateEnumeration.stateIdentifier;
            delete stateEnumeration.stateIdentifier;
          }

          return concat(
            this.stateService.saveEnumerations(
              collectionId,
              parsedEnumerations
            ).pipe(
              switchMap((createStateEnumerations: StateEnumeration[]) => {
                let stateId = -1;

                if (createStateEnumerations.length > 0) {
                  stateId = createStateEnumerations[0].stateId;
                }

                return [
                  StateActions.saveEnumerationsSuccess({
                    enumerations: createStateEnumerations,
                    stateId
                  }),
                  ToastActions.showToast({
                    message: 'Enumerations uploaded',
                    toastType: 'success'
                  })
                ];
              }),
              catchError((error: HttpErrorResponse) => [
                FileUploadActions.uploadStateEnumerationsFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.toString(),
                  toastType: 'error'
                })
              ])
            )
          );
        }

        return [];
      })
    );
  });

  public uploadEvents = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadEvents),
      switchMap(({ file, fileType, collectionId }) => {
        let saveEvents: Observable<EventMap>;

        if (fileType === 'csv') {
          saveEvents = this.eventService.saveEventsCsv(file, collectionId);
        } else {
          saveEvents = this.eventService.saveEventsJson(file, collectionId);
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
          saveRelationships = this.relationshipService.saveRelationshipsCsv(collectionId, file);
        } else {
          saveRelationships = this.relationshipService.saveRelationshipsJson(collectionId, file);
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
      switchMap(({ collectionId, file }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseStates(file)
        ])
      ),
      map(([ collectionId, parsedStates ]) => ({
        collectionId,
        parsedStates
      })),
      switchMap(({ collectionId, parsedStates }) => {
        if (parsedStates && parsedStates.length > 0) {
          // TODO: Once we rename the db fields, remove this.
          for (const state of parsedStates) {
            state['display_name'] = state.displayName;
            delete state.displayName;
          }

          return concat(
            this.stateService.createStates(
              collectionId,
              parsedStates
            ).pipe(
              switchMap((createStates) => [
                StateActions.createStatesSuccess({
                  states: createStates
                }),
                ToastActions.showToast({
                  message: 'State(s) uploaded',
                  toastType: 'success'
                })
              ]),
              catchError((error: HttpErrorResponse) => [
                FileUploadActions.uploadStatesFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.toString(),
                  toastType: 'error'
                })
              ])
            )
          );
        }

        return [];
      })
    );
  });
}
