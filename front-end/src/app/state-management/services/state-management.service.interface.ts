import { Observable } from 'rxjs';

import { StateVariable } from '../models';

export interface StateManagementServiceInterface {
  createStateVariable(stateVariable: StateVariable): Observable<StateVariable>;
  editStateVariable(stateVariable: StateVariable): Observable<StateVariable>;
  getIdentifiers(): Observable<string[]>;
  getStateVariables(): Observable<StateVariable[]>;
}
