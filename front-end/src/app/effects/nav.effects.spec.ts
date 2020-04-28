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
import { StateVariableActions, LayoutActions } from '../actions';
import { RouterState } from 'src/app/app-routing.module';
import { StateManagementService } from '../services/state-management.service';
import { identifierList, informationTypesMap, relationshipMap, stateVariableMap, stateEnumerationMap } from '../mocks';

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

  describe('navRelationships', () => {
    it('should dispatch the correct actions when navigating to /relationships', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = getRouterNavigatedAction('relationships');

        actions = hot('-a', { a: action });

        expectObservable(effects.navRelationships).toBe('-(bcde)', {
          b: LayoutActions.toggleSidenav({ showSidenav: false }),
          c: StateVariableActions.setInformationTypes({ informationTypes: informationTypesMap }),
          d: StateVariableActions.setRelationships({ relationships: relationshipMap }),
          e: StateVariableActions.setStateVariables({ stateVariables: stateVariableMap })
        });
      });
    });
  });
});
