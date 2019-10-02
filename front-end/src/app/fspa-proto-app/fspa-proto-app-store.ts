import { Action, combineReducers } from '@ngrx/store';

import * as fromRoot from '../app-store';
import * as fromData from './reducers/data.reducer';

export interface State {
  data: fromData.DataState;
}

export interface FspaProtoAppState extends fromRoot.AppState {
  fspaProtoApp: State;
}

export function reducers(state: State | undefined, action: Action) {
  return combineReducers({
    data: fromData.reducer
  })(state, action);
}
