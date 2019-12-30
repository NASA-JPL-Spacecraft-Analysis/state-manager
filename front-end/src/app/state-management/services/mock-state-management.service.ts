import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { StateVariable } from '../models';

@Injectable()
export class MockStateManagementService {
  public getStateVariables(): Observable<StateVariable[]> {
    return new Observable((observer: Observer<StateVariable[]>) => {
      observer.next(getMockStateVariables());
      observer.complete();
    });
  }
}

export function getMockStateVariables(): StateVariable[] {
  return [
    {
      id: 1,
      identifier: 'TEST',
      displayName: 'Test',
      type: 'test string',
      units: 'na',
      source: 'na',
      description: 'This is a test string.'
    },
    {
      id: 2,
      identifier: 'TEST 1',
      displayName: 'Test 1',
      type: 'test string 1',
      units: 'na',
      source: 'na',
      description: 'This is test string 1.'
    }
  ];
}

export function getMockIdentifiers(): string[] {
  return [
    'TEST',
    'TEST 1'
  ];
}
