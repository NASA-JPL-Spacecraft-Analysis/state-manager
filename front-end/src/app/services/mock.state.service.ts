import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { State, StateEnumerationMap, StateEnumeration, StateEnumerationUpload } from '../models';
import { mockStates, mockStateEnumerationMap, mockStateEnumerations } from './../mocks';

@Injectable()
export class MockStateService {
  public createStates(collectionId: number, states: State[]): Observable<State[]> {
    return new Observable((observer: Observer<State[]>) => {
      observer.next([ ...mockStates ]);
      observer.complete();
    });
  }

  public getStateEnumerations(): Observable<StateEnumerationMap> {
    return new Observable((observer: Observer<StateEnumerationMap>) => {
      observer.next({ ...mockStateEnumerationMap });
      observer.complete();
    });
  }

  public getStates(): Observable<State[]> {
    return new Observable((observer: Observer<State[]>) => {
      observer.next([ ...mockStates ]);
      observer.complete();
    });
  }

  public saveEnumerations(
    collectionId: number,
    enumerations: StateEnumeration[] | StateEnumerationUpload[]
  ): Observable<StateEnumeration[]> {
    return new Observable((observer: Observer<StateEnumeration[]>) => {
      observer.next([ ...mockStateEnumerations ]);
      observer.complete();
    });
  }
}
