import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';

import { StateVariable } from '../models';
import { StateManagementServiceInterface } from './state-management.service.interface';
import { StateVariableActions } from '../actions';

@Injectable()
export class MockStateManagementService {
  public createStateVariable(): Observable<StateVariable[]> {
    return new Observable((observer: Observer<StateVariable[]>) => {
      observer.next([
        ...getMockStateVariables()
      ]);

      observer.complete();
    });
  }

  public editStateVariable(): Observable<StateVariable[]> {
    return new Observable((observer: Observer<StateVariable[]>) => {
      observer.next([
        ...getMockStateVariables()
      ]);

      observer.complete();
    });
  }

  public getIdentifiers(): Observable<string[]> {
    return new Observable((observer: Observer<string[]>) => {
      observer.next([
        ...getMockIdentifiers()
      ]);

      observer.complete();
    });
  }

  public getStateVariables(): Observable<Action> {
    return new Observable((observer: Observer<Action>) => {
      const mockStateVariables = getMockStateVariables();

      observer.next(
        StateVariableActions.setStateVariables({
          stateVariables: mockStateVariables
        })
      );

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
