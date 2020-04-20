import { Observable } from 'rxjs';

import {
  StateVariableMap,
  StateEnumerationMap,
  StateVariable,
  StateEnumeration,
  Relationship,
  RelationshipMap,
  InformationTypesMap
} from '../models';

export interface StateManagementServiceInterface {
  createRelationship(relationship: Relationship): Observable<Relationship>;
  createStateVariable(stateVariable: StateVariable): Observable<StateVariable>;
  editRelationship(relationship: Relationship): Observable<Relationship>;
  editStateVariable(stateVariable: StateVariable): Observable<StateVariable>;
  getIdentifiers(): Observable<string[]>;
  getInformationTypes(): Observable<InformationTypesMap>;
  getRelationships(): Observable<RelationshipMap>;
  getRelationshipHistory(): Observable<RelationshipMap>;
  getStateEnumerations(): Observable<StateEnumerationMap>;
  getStateHistory(): Observable<StateVariableMap>;
  getStateVariables(): Observable<StateVariableMap>;
  saveEnumerations(stateVariableId: number, enumerations: StateEnumeration[]): Observable<StateEnumeration[]>;
  saveInformationTypesFile(file: File): Observable<InformationTypesMap>;
  saveEnumerationsFile(file: File): Observable<StateEnumerationMap>;
  saveStateVariablesFile(file: File): Observable<StateVariableMap>;
}
