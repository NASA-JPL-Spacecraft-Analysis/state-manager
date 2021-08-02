import { createReducer, on } from '@ngrx/store';

import { LayoutActions } from '../actions';

export interface LayoutState {
  showGroupsSidemenu: boolean;
  showSidenav: boolean;
}

export const initialState: LayoutState = {
  showGroupsSidemenu: false,
  showSidenav: false
};

export const reducer = createReducer(
  initialState,
  on(LayoutActions.toggleGroupsSidemenu, (state, { showGroupsSidemenu }) => ({
    ...state,
    showGroupsSidemenu: showGroupsSidemenu
  })),
  on(LayoutActions.toggleSidenav, (state, { showSidenav }) => ({
    ...state,
    showSidenav: showSidenav
  }))
);
