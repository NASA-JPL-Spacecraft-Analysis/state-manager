import { Injectable } from '@angular/core';
import { DSVRowString } from 'd3-dsv';

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

  public validateState(item: DSVRowString<string>): boolean {
    return (
      item.hasOwnProperty('description')
      && item.hasOwnProperty('displayName')
      && item.hasOwnProperty('identifier')
      && item.hasOwnProperty('source')
      && item.hasOwnProperty('subsystem')
      && item.hasOwnProperty('type')
      && item.hasOwnProperty('units')
    );
  }

  public validateStateEnumerationUpload(item: DSVRowString<string>): boolean {
    return (
      item.hasOwnProperty('label')
      && item.hasOwnProperty('stateIdentifier')
      && item.hasOwnProperty('value')
    );
  }
}
