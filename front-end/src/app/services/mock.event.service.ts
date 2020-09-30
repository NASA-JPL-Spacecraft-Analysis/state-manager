import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { Event } from '../models';
import { mockEvents, mockEventHistory } from './../mocks';

@Injectable()
export class MockEventService {
  public getEventMap(): Observable<Event[]> {
    return new Observable((observer: Observer<Event[]>) => {
      observer.next(mockEvents);
      observer.complete();
    });
  }

  public getEventHistoryMap(): Observable<Event[]> {
    return new Observable((observer: Observer<Event[]>) => {
      observer.next(mockEventHistory);
      observer.complete();
    });
  }
}
