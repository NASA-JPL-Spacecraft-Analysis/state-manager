import { Injectable } from '@angular/core';

import { Event, Group, IdentifierMap, InformationTypes, Relationship, State, StateEnumerationUpload } from '../models';

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

  public isGroup(group: Group): group is Group {
    return (
      group.name !== undefined
      && group.groupMappings !== undefined
    );
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
