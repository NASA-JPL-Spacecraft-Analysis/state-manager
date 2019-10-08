import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { RouterNavigation } from 'src/libs/ngrx-router';

import { NavEffects } from './nav.effects';
import { ROOT_REDUCERS } from 'src/app/app-store';
import { reducers } from '../fspa-proto-app-store';
import { DataService } from '../services/data.service';
import { MockDataService, getMockTestStrings } from '../services/mock-data.service';
import { DataActions } from '../actions';
import { TestString } from '../models';

describe('NavEffects', () => {
  let actions: Observable<any>;
  let effects: NavEffects;

  // Mock data
  const data: TestString[] = getMockTestStrings();

  // Failure actions
  const dataFailure = DataActions.fetchDataFailure({
    error: new Error('FetchDataFailure'),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(ROOT_REDUCERS),
        StoreModule.forFeature('fspaProtoApp', reducers)
      ],
      providers: [
        NavEffects,
        HttpClient,
        Store,
        provideMockActions(() => actions),
        {
          provide: DataService,
          useValue: new MockDataService()
        }
      ]
    });

    effects = TestBed.get(NavEffects);
  });

  describe('navRoot', () => {
    it('should dispatch the correct actions when navigating to /test', () => {
      const action = new RouterNavigation({ path: 'test' });

      actions = hot('-a', { a: action });

      const expected = cold('-(b)', {
        b: DataActions.setData({ data })
      });

      expect(effects.navRoot).toBeObservable(expected);
    });

    it('should dispatch the correct actions when navigating to /test and the call fails', () => {
      const action = new RouterNavigation({ path: 'test' });

      const dataService = TestBed.get(DataService);
      spyOn(dataService, 'getData').and.returnValue(
        of(dataFailure),
      );

      actions = hot('-a', { a: action });

      const expected = cold('-(b)', {
        b: dataFailure
      });

      expect(effects.navRoot).toBeObservable(expected);
    });
  });
});
