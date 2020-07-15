import { Injectable } from '@angular/core';

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
      if (key === identifier && (id && identifierMap[key].id !== id)) {
        return true;
      }
    }

    return false;
  }
}
