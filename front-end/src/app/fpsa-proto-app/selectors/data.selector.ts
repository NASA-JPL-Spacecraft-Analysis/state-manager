import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../fpsa-proto-app-store';
import { DataState } from './../reducers/data.reducer';

const featureSelector = createFeatureSelector<State>('fpsaProtoApp');

export const getDataState = createSelector(
  featureSelector,
  (state: State): DataState => state.data,
);

export const getData = createSelector(
  getDataState,
  (state: DataState) => state.data,
);
