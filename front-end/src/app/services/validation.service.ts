import { Injectable } from '@angular/core';

import { InformationTypes, State, StateEnumerationUpload } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public isDuplicateIdentifier(identifier: string, id: number, identifierMap: Map<string, number>) {
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

  public validateInformationType(informationType: InformationTypes): boolean {
    return (
      informationType.hasOwnProperty('identifier')
      && informationType.hasOwnProperty('displayName')
      && informationType.hasOwnProperty('type')
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
