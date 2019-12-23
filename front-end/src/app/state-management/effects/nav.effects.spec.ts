import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Action, StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { RouterNavigatedAction } from '@ngrx/router-store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { NavEffects } from './nav.effects';
import { MockStateManagementService, getMockStateVariables } from '../services/mock-state-management.service';
import { StateVariableActions } from '../actions';
import { StateVariable } from '../models';
import { RouterState } from 'src/app/app-routing.module';
import { StateManagementService } from '../services/state-management.service';

function getRouterNavigatedAction(url: string, path?: string, params = {}) {
  const action: RouterNavigatedAction<RouterState> = {
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
  return action;
}

describe('NavEffects', () => {
  let actions: Observable<Action>;
  let effects: NavEffects;
  let testScheduler: TestScheduler;
  let stateManagementService: StateManagementService;

  // Mock data
  const stateVariables: StateVariable[] = getMockStateVariables();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({})
      ],
      providers: [
        NavEffects,
        provideMockActions(() => actions),
        {
          provide: StateManagementService,
          useValue: new MockStateManagementService(),
        },
      ],
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

        expectObservable(effects.navStates).toBe('-b', {
          b: StateVariableActions.setStateVariables({ stateVariables })
        });
      });
    });

    /*
    it('should dispatch the correct actions when navigating to /states and the call fails', () => {
      testScheduler.run(({ cold, hot, expectObservable }) => {
        const action = getRouterNavigatedAction('states');

        actions = hot('-a', { a: action });

        spyOn(stateManagementService, 'getStateVariables').and.returnValue(
          cold('#|', null, '')
        );

        expectObservable(effects.navRoot).toBe('-(b)', {
          b: fetchStateVariablesFailure
        });
      });
    });
    */
  });
});
