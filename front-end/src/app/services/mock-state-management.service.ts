import { Injectable } from '@angular/core';
import { Observable, Observer, observable } from 'rxjs';

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
}
