import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { StateVariableMap, StateEnumeration, StateEnumerationMap, RelationshipMap } from '../models';

@Injectable()
export class MockStateManagementService {
  public getIdentifiers(): Observable<string[]> {
    return new Observable((observer: Observer<string[]>) => {
      observer.next(getMockIdentifiersArray());
      observer.complete();
    });
  }

  public getRelationships(): Observable<RelationshipMap> {
    return new Observable((observer: Observer<RelationshipMap>) => {
      observer.next(getMockRelationships());
      observer.complete();
    });
  }

  public getStateEnumerations(): Observable<StateEnumerationMap> {
    return new Observable((observer: Observer<StateEnumerationMap>) => {
      observer.next(getMockStateEnumerations());
      observer.complete();
    });
  }

  public getStateVariables(): Observable<StateVariableMap> {
    return new Observable((observer: Observer<StateVariableMap>) => {
      observer.next(getMockStateVariables());
      observer.complete();
    });
  }
}

export function getMockRelationships(): RelationshipMap {
  return {
    [1]: {
      id: 1,
      displayName: 'Test display name',
      description: 'Test description',
      subjectStateId: 1,
      targetStateId: 2,
      type: 'Test Type'
    }
  };
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

export function getMockStateEnumerationsArray(): StateEnumeration[] {
  return [
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
  ];
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
