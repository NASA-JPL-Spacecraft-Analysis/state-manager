import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { DataEffects } from './data.effects';
import { reducers } from '../state-management-app-store';
import { DataService } from '../services/data.service';
import { MockDataService, getMockTestStrings } from '../services/mock-data.service';
import { DataActions } from '../actions';
import { TestString } from '../models';
import { ROOT_REDUCERS } from '../../app-store';

describe('DataEffects', () => {
  let actions: Observable<any>;
  let effects: DataEffects;

  // Mock data
  const data: TestString[] = getMockTestStrings();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(ROOT_REDUCERS),
        StoreModule.forFeature('stateManagementApp', reducers)
      ],
      providers: [
        DataEffects,
        HttpClient,
        Store,
        provideMockActions(() => actions),
        {
          provide: DataService,
          useValue: new MockDataService()
        }
      ]
    });

    effects = TestBed.get(DataEffects);
  });

  describe('createNewData', () => {
    it('should return a createTestStringSuccess action with data on success', () => {
      const action = DataActions.createNewData({ data: 'Test data' });
      const success = DataActions.createTestStringSuccess({ data });

      actions = hot('-a', { a: action });

      const expected = cold('-(b)', {
        b: success
      });

      expect(effects.createNewData).toBeObservable(expected);
    });

    it('should return a createTestStringFailure action with an error on failure', () => {
      const action = DataActions.createNewData({ data: 'Test data' });
      const error = new Error('CreateTestStringFailure');
      const failure = DataActions.createTestStringFailure({ error });
      const service = TestBed.get(DataService);

      spyOn(service, 'createNewData').and.returnValue(
        cold('-#|', null, error),
      );

      actions = hot('-a', { a: action });
      const expected = cold('--(b)', {
        b: failure
      });

      expect(effects.createNewData).toBeObservable(expected);
    });
  });
});
