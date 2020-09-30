import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { State, StateMap, StateEnumerationMap } from '../models';
import { mockStates, mockStateMap, mockStateEnumerationMap } from './../mocks';

@Injectable()
export class MockStateService {
  public getStateEnumerations(): Observable<StateEnumerationMap> {
    return new Observable((observer: Observer<StateEnumerationMap>) => {
      observer.next(mockStateEnumerationMap);
      observer.complete();
    });
  }

  public getStates(): Observable<State[]> {
    return new Observable((observer: Observer<State[]>) => {
      observer.next(mockStates);
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
