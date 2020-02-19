import { Observable } from 'rxjs';

import { StateVariableMap, StateEnumerationMap, StateVariable, StateEnumeration, Relationship } from '../models';

export interface StateManagementServiceInterface {
  createRelationship(relationship: Relationship): Observable<Relationship>;
  createStateVariable(stateVariable: StateVariable): Observable<StateVariable>;
  createStateVariables(stateVariables: Partial<StateVariable>[]): Observable<StateVariableMap>;
  editRelationship(relationship: Relationship): Observable<Relationship>;
  editStateVariable(stateVariable: StateVariable): Observable<StateVariable>;
  getIdentifiers(): Observable<string[]>;
  getStateEnumerations(): Observable<StateEnumerationMap>;
  getStateVariables(): Observable<StateVariableMap>;
  saveEnumerations(stateVariableId: number, enumerations: StateEnumeration[]): Observable<StateEnumeration[]>;
}
