import { InjectionToken } from '@angular/core';
import { ActionReducerMap, Action, MetaReducer, ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { environment } from 'src/environments/environment';
import {
  CollectionReducer,
  ConfigReducer,
  EventReducer,
  InformationTypesReducer,
  LayoutReducer,
  StateReducer,
} from './reducers';
import { ConfigState } from './config';

export interface AppState {
  collection: CollectionReducer.CollectionState;
  config: ConfigState;
  event: EventReducer.EventState;
  informationTypes: InformationTypesReducer.InformationTypesState;
  layout: LayoutReducer.LayoutState;
  router: fromRouter.RouterReducerState;
  states: StateReducer.StateState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<AppState, Action>
>('Root reducers token', {
  factory: () => ({
    collection: CollectionReducer.reducer,
    config: ConfigReducer.reducer,
    event: EventReducer.reducer,
    informationTypes: InformationTypesReducer.reducer,
    layout: LayoutReducer.reducer,
    router: fromRouter.routerReducer,
    states: StateReducer.reducer
  })
});

export function logger(
  reducer: ActionReducer<AppState>,
): ActionReducer<AppState> {
  return (state: AppState, action: any): AppState => {
    const result = reducer(state, action);

    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
