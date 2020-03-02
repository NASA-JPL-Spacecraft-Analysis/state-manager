import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { RouterNavigatedAction } from '@ngrx/router-store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { NavEffects } from './nav.effects';
import {
  MockStateManagementService,
  getMockStateVariables,
  getMockStateEnumerations,
  getMockIdentifiersArray,
  getMockRelationships
} from '../services/mock-state-management.service';
import { StateVariableActions, LayoutActions } from '../actions';
import { StateVariableMap, StateEnumerationMap } from '../models';
import { RouterState } from 'src/app/app-routing.module';
import { StateManagementService } from '../services/state-management.service';

function getRouterNavigatedAction(url: string, path?: string, params = {}): RouterNavigatedAction<RouterState> {
  return {
    payload: {
      event: {
        id: 1,
        url: `/${url}`,
        urlAfterRedirects: `/${url}`,
      },
      routerState: {
        params,
        path: path || `${url}`,
        queryParams: {},
        url: `/${url}`,
      },
    },
    type: '@ngrx/router-store/navigated',
  };
}

describe('NavEffects', () => {
  let actions: Observable<Action>;
  let effects: NavEffects;
  let testScheduler: TestScheduler;
  let stateManagementService: StateManagementService;

  // Mock data
  const identifiers: string[] = getMockIdentifiersArray();
  const relationships = getMockRelationships();
  const stateEnumerations: StateEnumerationMap = getMockStateEnumerations();
  const stateVariables: StateVariableMap = getMockStateVariables();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        NavEffects,
        provideMockActions(() => actions),
        {
          provide: StateManagementService,
          useValue: new MockStateManagementService()
        }
      ]
    });

    stateManagementService = TestBed.inject(StateManagementService);
    actions = TestBed.inject(Actions);
    effects = TestBed.inject(NavEffects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('navStates', () => {
    it('should dispatch the correct actions when navigating to /states', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = getRouterNavigatedAction('states');

        actions = hot('-a', { a: action });

        expectObservable(effects.navState).toBe('-(bcde)', {
          b: LayoutActions.toggleSidenav({ showSidenav: false }),
          c: StateVariableActions.setStateVariables({ stateVariables }),
          d: StateVariableActions.setStateEnumerations({ stateEnumerations }),
          e: StateVariableActions.setIdentifiers({ identifiers })
        });
      });
    });
  });

  describe('navRelationships', () => {
    it('should dispatch the correct actions when navigating to /relationships', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = getRouterNavigatedAction('relationships');

        actions = hot('-a', { a: action });

        expectObservable(effects.navRelationships).toBe('-(bcd)', {
          b: LayoutActions.toggleSidenav({ showSidenav: false }),
          c: StateVariableActions.setRelationships({ relationships }),
          d: StateVariableActions.setStateVariables({ stateVariables })
        });
      });
    });
  });
});
