import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { Collection } from '../models';
import { mockCollections } from './../mocks';

@Injectable()
export class MockCollectionService {
  public getCollections(): Observable<Collection[]> {
    return new Observable((observer: Observer<Collection[]>) => {
      observer.next(mockCollections);
      observer.complete();
    });
  }
}
