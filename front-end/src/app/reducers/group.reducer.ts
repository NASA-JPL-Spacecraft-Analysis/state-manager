import { createReducer, on } from '@ngrx/store';

import { GroupActions } from '../actions';
import { Group } from '../models';

export interface GroupState {
  groups: Group[]
};

export const initialState: GroupState = {
  groups: []
};

export const reducer = createReducer(
  initialState,
  on(GroupActions.setGroups, (state, { groups }) => ({
    ...state,
    groups: [
      ...groups
    ]
  }))
);
