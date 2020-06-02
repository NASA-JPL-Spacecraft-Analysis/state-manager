import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { StateVariableMap, StateEnumerationMap, RelationshipMap, InformationTypesMap, EventMap } from '../models';
import { mockEventMap, identifierList, relationshipMap, stateEnumerationMap, stateVariableMap, mockInformationTypesMap } from './../mocks';

@Injectable()
export class MockStateManagementService {
  public getEventMap(): Observable<EventMap> {
    return new Observable((observer: Observer<EventMap>) => {
      observer.next(mockEventMap);
      observer.complete();
    });
  }

  public getEventHistoryMap(): Observable<EventMap> {
    return new Observable((observer: Observer<EventMap>) => {
      observer.next(mockEventMap);
      observer.complete();
    });
  }

  public getIdentifiers(): Observable<string[]> {
    return new Observable((observer: Observer<string[]>) => {
      observer.next(identifierList);
      observer.complete();
    });
  }

  public getInformationTypes(): Observable<InformationTypesMap> {
    return new Observable((observer: Observer<InformationTypesMap>) => {
      observer.next(mockInformationTypesMap);
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

  public saveInformationTypesCsv(file: File): Observable<InformationTypesMap> {
    return new Observable((observer: Observer<InformationTypesMap>) => {
      observer.next(mockInformationTypesMap);
      observer.complete();
    });
  }

  public saveInformationTypesJson(file: File): Observable<InformationTypesMap> {
    return new Observable((observer: Observer<InformationTypesMap>) => {
      observer.next(mockInformationTypesMap);
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
