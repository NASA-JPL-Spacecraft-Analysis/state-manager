import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { StateMap, StateEnumerationMap, RelationshipMap, InformationTypesMap, EventMap, CollectionMap } from '../models';
import {
  mockEventMap,
  mockRelationshipMap,
  mockStateEnumerationMap,
  mockStateMap,
  mockInformationTypesMap,
  mockCollectionMap
} from './../mocks';

@Injectable()
export class MockStateManagementService {
  public getCollections(): Observable<CollectionMap> {
    return new Observable((observer: Observer<CollectionMap>) => {
      observer.next(mockCollectionMap);
      observer.complete();
    });
  }

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

  public getInformationTypes(): Observable<InformationTypesMap> {
    return new Observable((observer: Observer<InformationTypesMap>) => {
      observer.next(mockInformationTypesMap);
      observer.complete();
    });
  }

  public getRelationships(): Observable<RelationshipMap> {
    return new Observable((observer: Observer<RelationshipMap>) => {
      observer.next(mockRelationshipMap);
      observer.complete();
    });
  }

  public getRelationshipHistory(): Observable<RelationshipMap> {
    return new Observable((observer: Observer<RelationshipMap>) => {
      observer.next(mockRelationshipMap);
      observer.complete();
    });
  }

  public getStateEnumerations(): Observable<StateEnumerationMap> {
    return new Observable((observer: Observer<StateEnumerationMap>) => {
      observer.next(mockStateEnumerationMap);
      observer.complete();
    });
  }

  public getStates(): Observable<StateMap> {
    return new Observable((observer: Observer<StateMap>) => {
      observer.next(mockStateMap);
      observer.complete();
    });
  }

  public saveEnumerationsCsv(file: File): Observable<StateEnumerationMap> {
    return new Observable((observer: Observer<StateEnumerationMap>) => {
      observer.next(mockStateEnumerationMap);
      observer.complete();
    });
  }

  public saveEnumerationsJson(file: File): Observable<StateEnumerationMap> {
    return new Observable((observer: Observer<StateEnumerationMap>) => {
      observer.next(mockStateEnumerationMap);
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

  public saveStatesCsv(file: File): Observable<StateMap> {
    return new Observable((observer: Observer<StateMap>) => {
      observer.next(mockStateMap);
      observer.complete();
    });
  }

  public saveStatesJson(file: File): Observable<StateMap> {
    return new Observable((observer: Observer<StateMap>) => {
      observer.next(mockStateMap);
      observer.complete();
    });
  }
}
