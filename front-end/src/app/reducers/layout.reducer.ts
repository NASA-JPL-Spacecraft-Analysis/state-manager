import { createReducer, on } from '@ngrx/store';

import { LayoutActions } from '../actions';

export interface LayoutState {
  isLoading: boolean;
  isSaving: boolean;
  showSidenav: boolean;
}

export const initialState: LayoutState = {
  isLoading: false,
  isSaving: false,
  showSidenav: false
};

export const reducer = createReducer(
  initialState,
  on(LayoutActions.isLoading, (state, { isLoading }) => ({
    ...state,
    isLoading
  })),
  on(LayoutActions.isSaving, (state, { isSaving }) => ({
    ...state,
    isSaving
  })),
  on(LayoutActions.toggleSidenav, (state, { showSidenav }) => ({
    ...state,
    showSidenav
  }))
);
