import { createReducer, on } from '@ngrx/store';

import { DataActions } from '../actions';
import { TestString } from '../models';

export interface DataState {
  data: Array<TestString>;
}

export const initialState: DataState = {
  data: []
};

export const reducer = createReducer(
  initialState,
  on(DataActions.setData, (state, action) => ({
    ...state,
    data: action.data
  })),
  on(DataActions.createTestStringSuccess, (state, action) => ({
    ...state,
    data: action.data
  }))
);
