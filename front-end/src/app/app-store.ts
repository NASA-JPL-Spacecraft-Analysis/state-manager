import { InjectionToken } from '@angular/core';
import { ActionReducerMap, Action, MetaReducer, ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { environment } from 'src/environments/environment';
import {
  CollectionReducer,
  ConfigReducer,
  EventReducer,
  GroupReducer,
  InformationTypesReducer,
  LayoutReducer,
  RelationshipReducer,
  StateReducer,
} from './reducers';
import { ConfigState } from './config';

export interface AppState {
  collection: CollectionReducer.CollectionState;
  config: ConfigState;
  events: EventReducer.EventState;
  groups: GroupReducer.GroupState;
  informationTypes: InformationTypesReducer.InformationTypesState;
  layout: LayoutReducer.LayoutState;
  relationships: RelationshipReducer.RelationshipState;
  router: fromRouter.RouterReducerState;
  states: StateReducer.StateState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<AppState, Action>
>('Root reducers token', {
  factory: () => ({
    collection: CollectionReducer.reducer,
    config: ConfigReducer.reducer,
    events: EventReducer.reducer,
    groups: GroupReducer.reducer,
    informationTypes: InformationTypesReducer.reducer,
    layout: LayoutReducer.reducer,
    relationships: RelationshipReducer.reducer,
    router: fromRouter.routerReducer,
    states: StateReducer.reducer
  })
});

export const logger = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => (state: AppState, action: any): AppState => {
  const result = reducer(state, action);

  console.groupCollapsed(action.type);
  console.log('prev state', state);
  console.log('action', action);
  console.log('next state', result);
  console.groupEnd();

  return result;
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
