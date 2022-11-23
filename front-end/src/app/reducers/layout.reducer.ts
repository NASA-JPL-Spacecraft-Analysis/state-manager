import { createReducer, on } from '@ngrx/store';

import { LayoutActions } from '../actions';

export interface LayoutState {
  showSidenav: boolean;
}

export const initialState: LayoutState = {
  showSidenav: false
};

export const reducer = createReducer(
  initialState,
  on(LayoutActions.toggleSidenav, (state, { showSidenav }) => ({
    ...state,
    showSidenav
  }))
);
