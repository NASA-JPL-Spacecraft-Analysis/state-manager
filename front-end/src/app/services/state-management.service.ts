import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StateVariable, StateEnumerationMap, StateVariableMap, StateEnumeration, Relationship, RelationshipMap } from '../models';
import { StateManagementServiceInterface } from './state-management.service.interface';
import { environment } from 'src/environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class StateManagementService implements StateManagementServiceInterface {
  constructor(private http: HttpClient) {}

  public createRelationship(relationship: Relationship): Observable<Relationship> {
    return this.http.post<Relationship>(
      baseUrl + '/relationship',
      relationship
    );
  }

  public createStateVariable(stateVariable: StateVariable): Observable<StateVariable> {
    return this.http.post<StateVariable>(
      baseUrl + '/state-variable',
      stateVariable
    );
  }

  /**
   * Takes the data from our uploaded file and tries to post it. Will be
   * rejected if there's duplicate identifiers.
   *
   * @param data Our parsed .csv data
   */
  public createStateVariables(stateVariables: Partial<StateVariable>[]): Observable<StateVariableMap> {
    return this.http.post<StateVariableMap>(
      baseUrl + '/state-variables',
      stateVariables
    );
  }

  public editRelationship(relationship: Relationship): Observable<Relationship> {
    return this.http.put<Relationship>(
      baseUrl + '/relationship',
      relationship
    );
  }

  public editStateVariable(stateVariable: StateVariable): Observable<StateVariable> {
    return this.http.put<StateVariable>(
      baseUrl + '/state-variable',
      stateVariable
    );
  }

  public getIdentifiers(): Observable<string[]> {
    return this.http.get<string[]>(
      baseUrl + '/state-identifiers'
    );
  }

  public getRelationships(): Observable<RelationshipMap> {
    return this.http.get<RelationshipMap>(
      baseUrl + '/relationships'
    );
  }

  public getStateEnumerations(): Observable<StateEnumerationMap> {
    return this.http.get<StateEnumerationMap>(
      baseUrl + '/state-enumerations'
    );
  }

  public getStateVariables(): Observable<StateVariableMap> {
    return this.http.get<StateVariableMap>(
      baseUrl + '/state-variables'
    );
  }

  public saveEnumerations(stateVariableId: number, enumerations: StateEnumeration[]): Observable<StateEnumeration[]> {
    return this.http.post<StateEnumeration[]>(
      baseUrl + '/state-enumerations/' + stateVariableId,
      enumerations
    );
  }
}
