/*
import { initialState, reducer } from './state-management.reducer';
import { DataActions } from '../actions';
import { TestString } from '../models';
import { getMockTestStrings } from '../services/mock-state-management.service';

describe('DataReducer', () => {
  let data: TestString[];

  beforeEach(() => {
    data = getMockTestStrings();
  });

  describe('createTestStringSuccess', () => {
    it('should update the data after a new one is created', () => {
      const newState = reducer(
        initialState,
        DataActions.createTestStringSuccess({ data })
      );

      expect(newState).toEqual({
        ...initialState,
        data
      });
    });
  });

  describe('setData', () => {
    it('should set the data correctly', () => {
      const newState = reducer(
        initialState,
        DataActions.setData({ data })
      );

      expect(newState).toEqual({
        ...initialState,
        data
      });
    });
  });
});

*/
