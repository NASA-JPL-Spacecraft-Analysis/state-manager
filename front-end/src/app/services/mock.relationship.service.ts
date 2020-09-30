import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { Relationship } from '../models';
import { mockRelationships, mockRelationshipHistory } from './../mocks';

@Injectable()
export class MockRelationshipService {
  public getRelationships(): Observable<Relationship[]> {
    return new Observable((observer: Observer<Relationship[]>) => {
      observer.next(mockRelationships);
      observer.complete();
    });
  }

  public getRelationshipHistory(): Observable<Relationship[]> {
    return new Observable((observer: Observer<Relationship[]>) => {
      observer.next(mockRelationshipHistory);
      observer.complete();
    });
  }
}
