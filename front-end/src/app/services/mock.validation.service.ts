import { Injectable } from '@angular/core';

import { InformationTypes, State, StateEnumerationUpload } from '../models';

@Injectable()
export class MockValidationService {
  public validateInformationType(informationType: InformationTypes): boolean {
    return true;
  }

  public validateState(state: State): boolean {
    return true;
  }

  public validateStateEnumerationUpload(stateEnumeration: StateEnumerationUpload): boolean {
    return true;
  }
}
