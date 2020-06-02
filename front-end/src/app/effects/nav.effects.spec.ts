import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { RouterNavigatedAction } from '@ngrx/router-store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { NavEffects } from './nav.effects';
import { MockStateManagementService } from '../services/mock-state-management.service';
import { StateVariableActions, EventActions, LayoutActions } from '../actions';
import { RouterState } from 'src/app/app-routing.module';
import { StateManagementService } from '../services/state-management.service';
import {
  identifierList,
  mockEventMap,
  mockEventHistoryMap,
  mockInformationTypesMap,
  relationshipMap,
  stateVariableMap,
  stateEnumerationMap
} from '../mocks';

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

  describe('navEvents', () => {
    it('should dispatch the correct actions when navigating to /events', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = getRouterNavigatedAction('events');

        actions = hot('-a', { a: action });

        expectObservable(effects.navEvents).toBe('-(bc)', {
          b: LayoutActions.toggleSidenav({ showSidenav: false }),
          c: EventActions.setEventMap({ eventMap: mockEventMap })
        });
      });
    });
  });

  describe('navInformationTypes', () => {
    it('should dispatch the correct actions when navigating to /information-types', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = getRouterNavigatedAction('information-types');

        actions = hot('-a', { a: action });

        expectObservable(effects.navInformationTypes).toBe('-(bc)', {
          b: LayoutActions.toggleSidenav({ showSidenav: false }),
          c: StateVariableActions.setInformationTypes({ informationTypes: mockInformationTypesMap })
        });
      });
    });
  });

  describe('navRelationships', () => {
    it('should dispatch the correct actions when navigating to /relationships', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = getRouterNavigatedAction('relationships');

        actions = hot('-a', { a: action });

        expectObservable(effects.navRelationships).toBe('-(bcdef)', {
          b: LayoutActions.toggleSidenav({ showSidenav: false }),
          c: EventActions.setEventMap({ eventMap: mockEventMap }),
          d: StateVariableActions.setInformationTypes({ informationTypes: mockInformationTypesMap }),
          e: StateVariableActions.setRelationships({ relationships: relationshipMap }),
          f: StateVariableActions.setStateVariables({ stateVariables: stateVariableMap })
        });
      });
    });
  });

  describe('navStates', () => {
    it('should dispatch the correct actions when navigating to /states', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = getRouterNavigatedAction('states');

        actions = hot('-a', { a: action });

        expectObservable(effects.navState).toBe('-(bcde)', {
          b: LayoutActions.toggleSidenav({ showSidenav: false }),
          c: StateVariableActions.setStateVariables({ stateVariables: stateVariableMap }),
          d: StateVariableActions.setStateEnumerations({ stateEnumerations: stateEnumerationMap }),
          e: StateVariableActions.setIdentifiers({ identifiers: identifierList })
        });
      });
    });
  });

  /*
  describe('navRelationshipHistory', () => {
    it('should dispatch the correct actions when navigating to /relationship-history', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = getRouterNavigatedAction('relationship-history');

        actions = hot('-a', { a: action });

        expectObservable(effects.navRelationshipHistory).toBe('-(bcd)', {
          b: StateVariableActions.setInformationTypes({ informationTypes: informationTypesMap }),
          c: StateVariableActions.setRelationshipHistory({ relationshipHistory: relationshipHistoryMap }),
          d: StateVariableActions.setStateVariables({ stateVariables: stateVariableMap })
        });
      });
    });
  });

  describe('navStateHistory', () => {
    it('should dispatch the correct actions when navigating to /state-history', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = getRouterNavigatedAction('state-history');

        actions = hot('-a', { a: action });

        expectObservable(effects.navStateHistory).toBe('-(bc)', {
          b: StateVariableActions.setStateHistory({ stateHistory: stateVariableMap }),
          c: StateVariableActions.setStateVariables({ stateVariables: stateVariableMap })
        });
      });
    });
  });
  */
});
