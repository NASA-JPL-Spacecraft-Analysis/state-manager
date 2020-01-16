import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from 'src/app/app-store';
import { LayoutState } from './../reducers/layout.reducer';

export const getLayoutState = createFeatureSelector<AppState, LayoutState>('layout');

export const getShowSidenav = createSelector(
  getLayoutState,
  (state: LayoutState) => state.showSidenav
);
