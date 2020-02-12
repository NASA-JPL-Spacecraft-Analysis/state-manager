import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { StateVariableMap, StateEnumerationMap } from '../models';

@Injectable()
export class MockStateManagementService {
  public getStateVariables(): Observable<StateVariableMap> {
    return new Observable((observer: Observer<StateVariableMap>) => {
      observer.next(getMockStateVariables());
      observer.complete();
    });
  }

  public getStateEnumerations(): Observable<StateEnumerationMap> {
    return new Observable((observer: Observer<StateEnumerationMap>) => {
      observer.next(getMockStateEnumerations());
      observer.complete();
    });
  }
}

export function getMockStateVariables(): StateVariableMap {
  return {
    [1]: {
      id: 1,
      identifier: 'TEST',
      displayName: 'Test',
      type: 'test string',
      units: 'na',
      source: 'na',
      description: 'This is a test string.'
    },
    [2]: {
      id: 2,
      identifier: 'TEST 1',
      displayName: 'Test 1',
      type: 'test string 1',
      units: 'na',
      source: 'na',
      description: 'This is test string 1.'
    }
  };
}

export function getMockStateEnumerations(): StateEnumerationMap {
  return {
    [1]: [
      {
        id: 1,
        stateVariableId: 1,
        label: 'test off',
        value: 0
      },
      {
        id: 2,
        stateVariableId: 1,
        label: 'test on',
        value: 1
      }
    ]
  };
}

export function getMockIdentifiersArray(): string[] {
  return [
    'TEST',
    'TEST 1'
  ];
}

export function getMockIdentifiersSet(): Set<string> {
  return new Set([
    'TEST',
    'TEST 1'
  ]);
}
