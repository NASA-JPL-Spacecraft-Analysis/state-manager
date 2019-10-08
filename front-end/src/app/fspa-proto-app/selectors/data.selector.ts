import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../fspa-proto-app-store';
import { DataState } from './../reducers/data.reducer';

const featureSelector = createFeatureSelector<State>('fspaProtoApp');

export const getDataState = createSelector(
  featureSelector,
  (state: State): DataState => state.data,
);

export const getData = createSelector(
  getDataState,
  (state: DataState) => state.data,
);
