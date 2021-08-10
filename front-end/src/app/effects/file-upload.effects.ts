import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat, forkJoin, Observable, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { CommandService, ConstraintService, EventService, GroupService, InformationTypeService, ParseService, RelationshipService, StateService, ValidationService } from '../services';
import { FileUploadActions, StateActions, ToastActions } from '../actions';
import {
  Event,
  ParseTypes,
  InformationType,
  StateEnumerationUpload,
  RelationshipUpload,
  State,
  GroupUpload,
  GroupsResponse,
  GroupUploadMappings,
  MappingsUpload,
  GroupMappingsResponse,
  StatesResponse,
  StateEnumerationsResponse,
  EventsResponse,
  CreateInformationTypesResponse,
  RelationshipsResponse,
  Command,
  CommandsResponse,
  Constraint,
  ConstraintsResponse
} from '../models';

@Injectable()
export class FileUploadEffects {
  public uploadCommands = createEffect(() =>
    this.actions.pipe(
      ofType(FileUploadActions.uploadCommands),
      switchMap(({ collectionId, file }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, parsedCommands ]) => ({
        collectionId,
        parsedCommands
      })),
      switchMap(({ collectionId, parsedCommands }) => {
        const commands = parsedCommands as Command[];

        if (Array.isArray(commands) && commands.length > 0) {
          for (const command of commands) {
            command.collectionId = collectionId;
            // TODO: This will change at some point.
            command.editable = true;

            if (!this.validationService.isCommand(command)) {
              return [
                this.throwFileParseError(commands)
              ];
            }
          }

          return concat(
            this.commandService.createCommands(
              collectionId,
              commands
            ).pipe(
              switchMap((createCommands: CommandsResponse) => [
                FileUploadActions.uploadCommandsSuccess({
                  commands: createCommands.commands
                }),
                ToastActions.showToast({
                  message: createCommands.message,
                  toastType: 'success'
                })
              ]),
              catchError((error: Error) => [
                FileUploadActions.uploadCommandsFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.message,
                  toastType: 'error'
                })
              ])
            )
          );
        }

        return [
          this.throwFileParseError(commands)
        ];
      })
    )
  );

  public uploadConstraints = createEffect(() =>
    this.actions.pipe(
      ofType(FileUploadActions.uploadConstraints),
      switchMap(({ collectionId, file }) =>
        forkJoin([
          of(collectionId),
          this.parseService.parseFile(file)
        ])
      ),
      map(([ collectionId, parsedConstraints ]) => ({
        collectionId,
        parsedConstraints
      })),
      switchMap(({ collectionId, parsedConstraints }) => {
        const constraints = parsedConstraints as Constraint[];

        if (Array.isArray(constraints) && constraints.length > 0) {
          for (const constraint of constraints) {
            constraint.collectionId = collectionId;
            // TODO: This will change at some point.
            constraint.editable = true;

            if (!this.validationService.isConstraint(constraint)) {
              return [
                this.throwFileParseError(constraints)
              ];
            }
          }

          return concat(
            this.constraintService.createConstraints(
              collectionId,
              constraints 
            ).pipe(
              switchMap((createConstraints: ConstraintsResponse) => [
                FileUploadActions.uploadConstraintsSuccess({
                  constraints: createConstraints.constraints
                }),
                ToastActions.showToast({
                  message: createConstraints.message,
                  toastType: 'success'
                })
              ]),
              catchError((error: Error) => [
                FileUploadActions.uploadConstraintsFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.message,
                  toastType: 'error'
                })
              ])
            )
          );
        }

        return [
          this.throwFileParseError(constraints)
        ];
      })
    )
  );

  public uploadInformationTypes = createEffect(() =>
    this.actions.pipe(
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
        const informationTypes = parsedInformationTypes as InformationType[];

        if (Array.isArray(informationTypes) && informationTypes.length > 0) {
          for (const informationType of informationTypes) {
            if (!this.validationService.isInformationType(informationType)) {
              return [
                this.throwFileParseError(informationTypes)
              ];
            }
          }

          return concat(
            this.informationTypeService.createInformationTypes(
              collectionId,
              informationTypes
            ).pipe(
              switchMap((createInformationTypes: CreateInformationTypesResponse) => [
                FileUploadActions.uploadInformationTypesSuccess({
                  informationTypes: createInformationTypes.informationTypes
                }),
                ToastActions.showToast({
                  message: createInformationTypes.message,
                  toastType: 'success'
                })
              ]),
              catchError((error: Error) => [
                FileUploadActions.uploadInformationTypesFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.message,
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
                this.throwFileParseError(stateEnumerations)
              ];
            }
          }

          return concat(
            this.stateService.createStateEnumerations(
              collectionId,
              stateEnumerations
            ).pipe(
              switchMap((saveEnumerations: StateEnumerationsResponse) => [
                StateActions.saveEnumerationsSuccess({
                  stateEnumerations: saveEnumerations.stateEnumerations
                }),
                ToastActions.showToast({
                  message: saveEnumerations.message,
                  toastType: 'success'
                })
              ]),
              catchError((error: Error) => [
                FileUploadActions.uploadStateEnumerationsFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.message,
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
                this.throwFileParseError(events)
              ];
            }
          }

          return concat(
            this.eventService.createEvents(
              collectionId,
              events
            ).pipe(
              switchMap((createEvents: EventsResponse) => [
                FileUploadActions.uploadEventsSuccess({
                  events: createEvents.events
                }),
                ToastActions.showToast({
                  message: createEvents.message,
                  toastType: 'success'
                })
              ]),
              catchError((error: Error) => [
                FileUploadActions.uploadEventsFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.message,
                  toastType: 'error'
                })
              ])
            )
          );
        }

        return [
          this.throwFileParseError(events)
        ];
      })
    )
  );

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
          const groups: GroupUploadMappings[] = [];

          for (const parsedGroup of parsedGroups) {
            let group = parsedGroup as GroupUploadMappings;

            // Matches our JSON upload type, 
            if (this.validationService.isGroupUploadMappings(group)) {
              groups.push({ ...group });

              continue;
            }

            let groupUpload = parsedGroup as GroupUpload;

            let mappingsUpload = parsedGroup as MappingsUpload;

            if (this.validationService.isMappingsUpload(mappingsUpload)) {
              return this.groupMappingsCsvUpload(collectionId, parsedGroups as MappingsUpload[]);
            }
            
            if (this.validationService.isGroupUpload(groupUpload)) {
              groups.push({
                identifier: groupUpload.identifier,
                groupMappings: []
              });

              continue;
            }
          }

          if (groups.length === 0) {
            return [
              this.throwFileParseError(parsedGroups)
            ];
          }

          return concat(
            this.groupService.createGroups(
              collectionId,
              groups
            ).pipe(
              switchMap((createGroups: GroupsResponse) => [
                FileUploadActions.uploadGroupsSuccess({
                  groups: createGroups.groups
                }),
                ToastActions.showToast({
                  message: createGroups.message,
                  toastType: 'success'
                })
              ]),
              catchError((error: Error) => [
                FileUploadActions.uploadGroupsFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.message,
                  toastType: 'error'
                })
              ])
            )
          );
        }

        return [
          this.throwFileParseError(parsedGroups)
        ];
      })
    );
  });

  public uploadRelationship = createEffect(() =>
    this.actions.pipe(
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
                this.throwFileParseError(relationships)
              ];
            }
          }

          return concat(
            this.relationshipService.createRelationships(
              collectionId,
              relationships
            ).pipe(
              switchMap((createRelationships: RelationshipsResponse) => [
                FileUploadActions.uploadRelationshipsSuccess({
                  relationships: createRelationships.relationships
                }),
                ToastActions.showToast({
                  message: createRelationships.message,
                  toastType: 'success'
                })
              ]),
              catchError((error: Error) => [
                FileUploadActions.uploadRelationshipsFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.message,
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
              switchMap((createStates: StatesResponse) => [
                StateActions.createStatesSuccess({
                  states: createStates.states
                }),
                ToastActions.showToast({
                  message: createStates.message,
                  toastType: 'success'
                })
              ]),
              catchError((error: Error) => [
                FileUploadActions.uploadStatesFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.message,
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
    )
  );

  constructor(
    private actions: Actions,
    private commandService: CommandService,
    private constraintService: ConstraintService,
    private eventService: EventService,
    private groupService: GroupService,
    private informationTypeService: InformationTypeService,
    private parseService: ParseService,
    private stateService: StateService,
    private relationshipService: RelationshipService,
    private validationService: ValidationService
  ) {}

  private groupMappingsCsvUpload(collectionId: string, mappingsUpload: MappingsUpload[]): Observable<Action> {
    for (const mapping of mappingsUpload) {
      mapping.sortOrder = Number(mapping.sortOrder);
    }

    return concat(
      this.groupService.createGroupMappings(
        collectionId,
        mappingsUpload
      ).pipe(
        switchMap((createGroupMappings: GroupMappingsResponse) => [
          FileUploadActions.uploadGroupMappingsSuccess({
            groupMappings: createGroupMappings.groupMappings
          }),
          ToastActions.showToast({
            message: createGroupMappings.message,
            toastType: 'success'
          })
        ]),
        catchError((error: Error) => [
          FileUploadActions.uploadGroupMappingsFailure({
            error
          }),
          ToastActions.showToast({
            message: error.message,
            toastType: 'error'
          })
        ])
      )
    );
  }

  // The error will be a string, but we need to check for other types as well.
  private throwFileParseError(error: string | ParseTypes): Action {
    return ToastActions.showToast({
      message: typeof error === 'string' ? error : 'File parsing failed',
      toastType: 'error'
    });
  }
}
