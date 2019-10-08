import { initialState, reducer } from './data.reducer';
import { DataActions } from '../actions';
import { TestString } from '../models';
import { getMockTestStrings } from '../services/mock-data.service';

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
