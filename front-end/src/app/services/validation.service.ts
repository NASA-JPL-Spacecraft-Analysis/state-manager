import { Injectable } from '@angular/core';

import { Event, Group, GroupMappingUpload, GroupUpload, GroupUploadMappings, IdentifierMap, InformationTypes, MappingsUpload, Relationship, State, StateEnumerationUpload } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public isDuplicateIdentifier(identifier: string, id: string, identifierMap: IdentifierMap) {
    /**
     * If we come across a duplicate identifier
     * AND we have an id
     * AND we are looking at a different item (event, information type, or state)
     * then we have a duplicate.
     */
    for (const key of Object.keys(identifierMap)) {
      if (key === identifier && (id && identifierMap[key] !== id)) {
        return true;
      }
    }

    return false;
  }

  public validateEvent(event: Event): boolean {
    return (
      event.hasOwnProperty('identifier')
      && event.hasOwnProperty('displayName')
    );
  }

  public isGroupUpload(groupUpload: GroupUpload): groupUpload is GroupUpload {
    if (!groupUpload.name) {
      return false;
    }

    return true;
  }

  public isGroupUploadMappings(group: GroupUploadMappings): group is GroupUploadMappings {
    if (!group.name || !group.groupMappings) {
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

  public isMappingsUpload(mappingsUpload: MappingsUpload): mappingsUpload is MappingsUpload {
    return mappingsUpload.name !== undefined && mappingsUpload.itemIdentifier !== undefined
      && mappingsUpload.itemType !== undefined;
  }

  public validateInformationType(informationType: InformationTypes): boolean {
    return (
      informationType.hasOwnProperty('identifier')
      && informationType.hasOwnProperty('displayName')
      && informationType.hasOwnProperty('informationType')
    );
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
