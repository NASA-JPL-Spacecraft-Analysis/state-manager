import { Observable } from 'rxjs';

import { StateVariableMap, StateEnumerationMap, StateVariable, StateEnumeration, Relationship, RelationshipMap } from '../models';

export interface StateManagementServiceInterface {
  createRelationship(relationship: Relationship): Observable<Relationship>;
  createStateVariable(stateVariable: StateVariable): Observable<StateVariable>;
  editRelationship(relationship: Relationship): Observable<Relationship>;
  editStateVariable(stateVariable: StateVariable): Observable<StateVariable>;
  getIdentifiers(): Observable<string[]>;
  getRelationships(): Observable<RelationshipMap>;
  getStateEnumerations(): Observable<StateEnumerationMap>;
  getStateVariables(): Observable<StateVariableMap>;
  saveEnumerations(stateVariableId: number, enumerations: StateEnumeration[]): Observable<StateEnumeration[]>;
  saveStateVariables(file: File): Observable<StateVariableMap>;
}
