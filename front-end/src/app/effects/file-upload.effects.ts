import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat, forkJoin, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { EventService, GroupService, InformationTypesService, ParseService, RelationshipService, StateService, ValidationService} from '../services';
import { FileUploadActions, StateActions, ToastActions } from '../actions';
import { Event, StateEnumeration, InformationTypes, Relationship, Group, ParseTypes, StateEnumerationUpload, RelationshipUpload, State, GroupUpload } from '../models';

@Injectable()
export class FileUploadEffects {
  constructor(
    private actions: Actions,
    private eventService: EventService,
    private groupService: GroupService,
    private informationTypesService: InformationTypesService,
    private parseService: ParseService,
    private stateService: StateService,
    private relationshipService: RelationshipService,
    private validationService: ValidationService
  ) {}

  public uploadInformationTypes = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadInformationTypes),
      switchMap(({ file, collectionId }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, parsedInformationTypes ]) => ({
        collectionId,
        parsedInformationTypes
      })),
      switchMap(({ collectionId, parsedInformationTypes }) => {
        const informationTypes = parsedInformationTypes as InformationTypes[];

        if (Array.isArray(informationTypes) && informationTypes.length > 0) {
          for (const informationType of informationTypes) {
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
          this.throwFileParseError(informationTypes)
        ];
      })
    );
  });

  public uploadEnumerations = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadStateEnumerations),
      switchMap(({ collectionId, file }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, parsedStateEnumerations ]) => ({
        collectionId,
        parsedStateEnumerations
      })),
      switchMap(({ collectionId, parsedStateEnumerations }) => {
        const stateEnumerations = parsedStateEnumerations as StateEnumerationUpload[];

        if (Array.isArray(stateEnumerations) && stateEnumerations.length > 0) {
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
          this.throwFileParseError(stateEnumerations)
        ];
      })
    );
  });

  public uploadEvents = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadEvents),
      switchMap(({ file, collectionId }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, parsedEvents ]) => ({
        collectionId,
        parsedEvents
      })),
      switchMap(({ collectionId, parsedEvents }) => {
        const events = parsedEvents as Event[];

        if (Array.isArray(events) && events.length > 0) {
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
        }

        return [
          this.throwFileParseError(events)
        ];
      })
    );
  });

  public uploadGroups = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadGroups),
      switchMap(({ file, collectionId }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, parsedGroups ]) => ({
        collectionId,
        parsedGroups
      })),
      switchMap(({ collectionId, parsedGroups }) => {
        if (Array.isArray(parsedGroups) && parsedGroups.length > 0) {
          const groups = parsedGroups as GroupUpload[];

          for (const group of groups) {
            if (!this.validationService.isGroupUpload(group)) {
              return [
                ToastActions.showToast({
                  message: 'File parsing failed',
                  toastType: 'error'
                })
              ];
            }
          }

          console.log(groups);

          return concat(
            this.groupService.createGroups(
              collectionId,
              groups
            ).pipe(
              switchMap((createGroups: Group[]) => [
                FileUploadActions.uploadGroupsSuccess({
                  groups: createGroups
                }),
                ToastActions.showToast({
                  message: 'Groups uploaded',
                  toastType: 'success'
                })
              ])
            ),
            catchError((error: HttpErrorResponse) => [
              FileUploadActions.uploadGroupsFailure({
                error
              }),
              ToastActions.showToast({
                message: error.error,
                toastType: 'error'
              })
            ])
          );
        }

        return [
          this.throwFileParseError(parsedGroups)
        ];
      })
    );
  });

  public uploadRelationship = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadRelationships),
      switchMap(({ file, collectionId }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, parsedRelationships ]) => ({
        collectionId,
        parsedRelationships
      })),
      switchMap(({ collectionId, parsedRelationships }) => {
        const relationships = parsedRelationships as RelationshipUpload[];

        if (Array.isArray(relationships) && relationships.length > 0) {
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
          this.throwFileParseError(relationships)
        ];
      })
    );
  });

  public uploadStates = createEffect(() => {
    return this.actions.pipe(
      ofType(FileUploadActions.uploadStates),
      switchMap(({ collectionId, file }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, parsedStates  ]) => ({
        collectionId,
        parsedStates
      })),
      switchMap(({ collectionId, parsedStates }) => {
        const states = parsedStates as State[];

        if (Array.isArray(states) && states.length > 0) {
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
          this.throwFileParseError(states)
        ];
      })
    );
  });

  // The error will be a string, but we need to check for other types as well.
  private throwFileParseError(error: string | ParseTypes): Action {
    return ToastActions.showToast({
      message: typeof error === 'string' ? error : 'File parsing failed',
      toastType: 'error'
    });
  }
}
