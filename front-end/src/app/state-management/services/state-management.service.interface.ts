import { Observable } from 'rxjs';

import { StateVariableMap, StateEnumerationMap, StateVariable, StateEnumeration } from '../models';

export interface StateManagementServiceInterface {
  createStateVariable(stateVariable: StateVariable): Observable<StateVariable>;
  editStateVariable(stateVariable: StateVariable): Observable<StateVariable>;
  getIdentifiers(): Observable<string[]>;
  getStateEnumerations(): Observable<StateEnumerationMap>;
  getStateVariables(): Observable<StateVariableMap>;
  saveEnumerations(stateVariableId: number, enumerations: StateEnumeration[]): Observable<StateEnumeration[]>;
}
