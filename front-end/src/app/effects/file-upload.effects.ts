import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat, forkJoin, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { EventService, InformationTypesService, ParseService, RelationshipService, StateService, ValidationService} from '../services';
import { FileUploadActions, StateActions, ToastActions } from '../actions';
import { Event, StateEnumeration, InformationTypes, Relationship } from '../models';

@Injectable()
export class FileUploadEffects {
  public uploadInformationTypes = createEffect(() =>
    this.actions.pipe(
      ofType(FileUploadActions.uploadInformationTypes),
      switchMap(({ file, collectionId }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, informationTypes ]) => ({
        collectionId,
        informationTypes
      })),
      switchMap(({ collectionId, informationTypes }) => {
        if (informationTypes && informationTypes.length > 0) {
          for (const informationType of informationTypes) {
            informationType.type = informationType.informationType;
            delete informationType.informationType;

            if (!this.validationService.validateInformationType(informationType)) {
              return [
                ToastActions.showToast({
                  message: 'File parsing failed',
                  toastType: 'error'
                })
              ];
            }
          }

          return concat(
            this.informationTypesService.createInformationTypes(
              collectionId,
              informationTypes
            ).pipe(
              switchMap((createdInformationTypes: InformationTypes[]) => [
                FileUploadActions.uploadInformationTypesSuccess({
                  informationTypes: createdInformationTypes
                }),
                ToastActions.showToast({
                  message: 'Information types uploaded',
                  toastType: 'success'
                })
              ]),
              catchError((error: HttpErrorResponse) => [
                FileUploadActions.uploadInformationTypesFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.error,
                  toastType: 'error'
                })
              ])
            )
          );
        }

        return [
          ToastActions.showToast({
            message: 'Wrong filetype supplied, only csv and json is supported.',
            toastType: 'error'
          })
        ];
      })
    )
  );

  public uploadEnumerations = createEffect(() =>
    this.actions.pipe(
      ofType(FileUploadActions.uploadStateEnumerations),
      switchMap(({ collectionId, file }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, stateEnumerations ]) => ({
        collectionId,
        stateEnumerations
      })),
      switchMap(({ collectionId, stateEnumerations }) => {
        if (stateEnumerations && stateEnumerations.length > 0) {
          for (const stateEnumeration of stateEnumerations) {
            if (!this.validationService.validateStateEnumerationUpload(stateEnumeration)) {
              return [
                ToastActions.showToast({
                  message: 'File parsing failed',
                  toastType: 'error'
                })
              ];
            }
          }

          return concat(
            this.stateService.saveEnumerations(
              collectionId,
              stateEnumerations
            ).pipe(
              switchMap((createStateEnumerations: StateEnumeration[]) => {
                let stateId;

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

        return [
          ToastActions.showToast({
            message: 'Wrong filetype supplied, only csv and json is supported.',
            toastType: 'error'
          })
        ];
      })
    )
  );

  public uploadEvents = createEffect(() =>
    this.actions.pipe(
      ofType(FileUploadActions.uploadEvents),
      switchMap(({ file, collectionId }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, events ]) => ({
        collectionId,
        events
      })),
      switchMap(({ collectionId, events }) => {
        if (events && events.length > 0) {
          for (const event of events) {
            if (!this.validationService.validateEvent(event)) {
              return [
                ToastActions.showToast({
                  message: 'File parsing failed',
                  toastType: 'error'
                })
              ];
            }
          }
        }

        return concat(
          this.eventService.createEvents(
            collectionId,
            events
          ).pipe(
            switchMap((createEvents: Event[]) => [
              FileUploadActions.uploadEventsSuccess({
                events: createEvents
              }),
              ToastActions.showToast({
                message: 'Events uploaded',
                toastType: 'success'
              })
            ])
          ),
          catchError((error: HttpErrorResponse) => [
            FileUploadActions.uploadEventsFailure({
              error
            }),
            ToastActions.showToast({
              message: error.error,
              toastType: 'error'
            })
          ])
        );
      })
    )
  );

  public uploadRelationship = createEffect(() =>
    this.actions.pipe(
      ofType(FileUploadActions.uploadRelationships),
      switchMap(({ file, collectionId }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, relationships ]) => ({
        collectionId,
        relationships
      })),
      switchMap(({ collectionId, relationships }) => {
        if (relationships && relationships.length > 0) {
          for (const relationship of relationships) {
            if (!this.validationService.validateRelationship(relationship)) {
              return [
                ToastActions.showToast({
                  message: 'File parsing failed',
                  toastType: 'error'
                })
              ];
            }
          }

          return concat(
            this.relationshipService.createRelationships(
              collectionId,
              relationships
            ).pipe(
              switchMap((createdRelationships: Relationship[]) => [
                FileUploadActions.uploadRelationshipsSuccess({
                  relationships: createdRelationships
                }),
                ToastActions.showToast({
                  message: 'Relationship(s) uploaded',
                  toastType: 'success'
                })
              ]),
              catchError((error: HttpErrorResponse) => [
                FileUploadActions.uploadRelationshipsFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.error,
                  toastType: 'error'
                })
              ])
            )
          );
        }

        return [
          ToastActions.showToast({
            message: 'Wrong filetype supplied, only csv and json is supported.',
            toastType: 'error'
          })
        ];
      })
    )
  );

  public uploadStates = createEffect(() =>
    this.actions.pipe(
      ofType(FileUploadActions.uploadStates),
      switchMap(({ collectionId, file }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, states ]) => ({
        collectionId,
        states
      })),
      switchMap(({ collectionId, states }) => {
        if (states && states.length > 0) {
          for (const state of states) {
            // Validate each parsed state, if we come across anything invalid return null so we can error.
            if (!this.validationService.validateState(state)) {
              return [
                ToastActions.showToast({
                  message: 'File parsing failed',
                  toastType: 'error'
                })
              ];
            }
          }

          return concat(
            this.stateService.createStates(
              collectionId,
              states
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

        return [
          ToastActions.showToast({
            message: 'Wrong filetype supplied, only csv and json is supported.',
            toastType: 'error'
          })
        ];
      })
    )
  );

  constructor(
    private actions: Actions,
    private eventService: EventService,
    private informationTypesService: InformationTypesService,
    private parseService: ParseService,
    private stateService: StateService,
    private relationshipService: RelationshipService,
    private validationService: ValidationService
  ) {}
}
