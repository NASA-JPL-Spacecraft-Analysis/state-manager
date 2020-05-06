import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { StateVariableMap, StateEnumerationMap, RelationshipMap, InformationTypesMap } from '../models';
import { identifierList, relationshipMap, stateEnumerationMap, stateVariableMap, informationTypesMap } from './../mocks';

@Injectable()
export class MockStateManagementService {
  public getIdentifiers(): Observable<string[]> {
    return new Observable((observer: Observer<string[]>) => {
      observer.next(identifierList);
      observer.complete();
    });
  }

  public getInformationTypes(): Observable<InformationTypesMap> {
    return new Observable((observer: Observer<InformationTypesMap>) => {
      observer.next(informationTypesMap);
      observer.complete();
    });
  }

  public getRelationships(): Observable<RelationshipMap> {
    return new Observable((observer: Observer<RelationshipMap>) => {
      observer.next(relationshipMap);
      observer.complete();
    });
  }

  public getRelationshipHistory(): Observable<RelationshipMap> {
    return new Observable((observer: Observer<RelationshipMap>) => {
      observer.next(relationshipMap);
      observer.complete();
    });
  }

  public getStateEnumerations(): Observable<StateEnumerationMap> {
    return new Observable((observer: Observer<StateEnumerationMap>) => {
      observer.next(stateEnumerationMap);
      observer.complete();
    });
  }

  public getStateVariables(): Observable<StateVariableMap> {
    return new Observable((observer: Observer<StateVariableMap>) => {
      observer.next(stateVariableMap);
      observer.complete();
    });
  }

  public saveEnumerationsCsv(file: File): Observable<StateEnumerationMap> {
    return new Observable((observer: Observer<StateEnumerationMap>) => {
      observer.next(stateEnumerationMap);
      observer.complete();
    });
  }

  public saveEnumerationsJson(file: File): Observable<StateEnumerationMap> {
    return new Observable((observer: Observer<StateEnumerationMap>) => {
      observer.next(stateEnumerationMap);
      observer.complete();
    });
  }

  public saveInformationTypesFile(file: File): Observable<InformationTypesMap> {
    return new Observable((observer: Observer<InformationTypesMap>) => {
      observer.next(informationTypesMap);
      observer.complete();
    });
  }

  public saveStateVariablesCsv(file: File): Observable<StateVariableMap> {
    return new Observable((observer: Observer<StateVariableMap>) => {
      observer.next(stateVariableMap);
      observer.complete();
    });
  }

  public saveStateVariablesJson(file: File): Observable<StateVariableMap> {
    return new Observable((observer: Observer<StateVariableMap>) => {
      observer.next(stateVariableMap);
      observer.complete();
    });
  }
}
