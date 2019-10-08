import { Action } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';

import { TestString } from '../models';
import { DataServiceInterface } from './data.service.interface';
import { DataActions } from '../actions';

export class MockDataService implements DataServiceInterface {
  public createNewData(data: string): Observable<TestString[]> {
    return new Observable((observer: Observer<TestString[]>) => {
      observer.next([
        ...getMockTestStrings()
      ]);

      observer.complete();
    });
  }

  public getData(): Observable<Action> {
    return new Observable((observer: Observer<Action>) => {
      const testStrings = getMockTestStrings();

      observer.next(
        DataActions.setData({
          data: testStrings
        })
      );

      observer.complete();
    });
  }
}

export function getMockTestStrings(): TestString[] {
  return [
    {
      id: 1,
      data: 'Testing'
    },
    {
      id: 2,
      data: 'Another test string'
    }
  ];
}
