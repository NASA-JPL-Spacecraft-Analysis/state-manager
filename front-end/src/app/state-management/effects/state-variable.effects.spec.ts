import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StateVariableEffects } from './state-variable.effects';
import { StateManagementService } from '../services/state-management.service';
import { MockStateManagementService, getMockIdentifiers } from '../services/mock-state-management.service';
import { TestScheduler } from 'rxjs/testing';
import { StateVariableActions } from '../actions';

describe('StateVariableEffects', () => {
  let actions: Observable<Action>;
  let effects: StateVariableEffects;
  let testScheduler: TestScheduler;
  let stateManagementService: StateManagementService;

  // Mock data
  const identifiers: string[] = getMockIdentifiers();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StateVariableEffects,
        provideMockActions(() => actions),
        {
          provide: StateManagementService,
          useValue: new MockStateManagementService()
        }
      ]
    });

    stateManagementService = TestBed.inject(StateManagementService);
    actions = TestBed.inject(Actions);
    effects = TestBed.inject(StateVariableEffects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('fetchIdentifiers', () => {
    it('should dispatch the correct actions when we try to fetch our identifiers', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = StateVariableActions.fetchIdentifiers({});

        actions = hot('-a', { a: action });

        expectObservable(effects.fetchIdentifiers).toBe('-(b)', {
          b: StateVariableActions.setIdentifiers({ identifiers })
        });
      });
    });
  });
});
