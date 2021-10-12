import { Injectable } from '@angular/core';

import {
  Command,
  CommandArgumentUpload,
  Constraint,
  Event,
  GroupMappingUpload,
  GroupUpload,
  GroupUploadMappings,
  IdentifierMap,
  InformationType,
  informationTypes,
  MappingsUpload,
  Relationship,
  State,
  StateEnumerationUpload
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public validateEvent(event: Event): boolean {
    return (
      event.hasOwnProperty('identifier')
      && event.hasOwnProperty('displayName')
    );
  }

  public isCommand(command: Command): command is Command {
    if (!command.collectionId
      && command.description
      && command.displayName
      && command.editable
      && command.externalLink
      && command.identifier
      && command.type) {
        return false;
      }

    return true;
  }

  public isCommandArgumentUpload(commandArgumentUpload: CommandArgumentUpload): commandArgumentUpload is CommandArgumentUpload {
    if (!commandArgumentUpload.commandIdentifier
      && commandArgumentUpload.name) {
        return false;
      }

    return true;
  }

  public isConstraint(constraint: Constraint): constraint is Constraint {
    if (!constraint.collectionId
      && constraint.description
      && constraint.displayName
      && constraint.editable
      && constraint.externalLink
      && constraint.identifier
      && constraint.type) {
        return false;
      }

    return true;
  }

  public isGroupUpload(groupUpload: GroupUpload): groupUpload is GroupUpload {
    if (!groupUpload.identifier) {
      return false;
    }

    return true;
  }

  public isGroupUploadMappings(group: GroupUploadMappings): group is GroupUploadMappings {
    if (!group.identifier || !group.groupMappings) {
      return false;
    }

    for (const groupMapping of group.groupMappings) {
      if (!this.isGroupMappingUpload(groupMapping)) {
        return false;
      }
    }

    return true;
  }

  public isGroupMappingUpload(groupMapping: GroupMappingUpload): groupMapping is GroupMappingUpload {
    return groupMapping.itemIdentifier !== undefined && groupMapping.itemType !== undefined;
  }

  public isInformationType(informationType: InformationType): informationType is InformationType {
    return informationType.identifier !== undefined
      && informationType.displayName !== undefined
      && informationTypes.includes(informationType.type);
  }

  public isMappingsUpload(mappingsUpload: MappingsUpload): mappingsUpload is MappingsUpload {
    return mappingsUpload.identifier !== undefined && mappingsUpload.itemIdentifier !== undefined
      && mappingsUpload.itemType !== undefined;
  }

  public validateRelationship(relationship: Relationship): boolean {
    return (
      relationship.hasOwnProperty('displayName')
      && relationship.hasOwnProperty('subjectType')
      && relationship.hasOwnProperty('subjectIdentifier')
      && relationship.hasOwnProperty('targetType')
      && relationship.hasOwnProperty('targetIdentifier')
    );
  }

  public validateState(state: State): boolean {
    return (
      state.hasOwnProperty('displayName')
      && state.hasOwnProperty('identifier')
      && state.hasOwnProperty('source')
      && state.hasOwnProperty('subsystem')
      && state.hasOwnProperty('type')
      && state.hasOwnProperty('units')
    );
  }

  public validateStateEnumerationUpload(stateEnumeration: StateEnumerationUpload): boolean {
    return (
      stateEnumeration.hasOwnProperty('label')
      && stateEnumeration.hasOwnProperty('stateIdentifier')
      && stateEnumeration.hasOwnProperty('value')
    );
  }
}
