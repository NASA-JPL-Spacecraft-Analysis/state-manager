import { Action } from '@ngrx/store';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { RouterState } from 'src/app/app-routing.module';

export const isRoute = (route: string | string[] | RegExp): (action: Action) => boolean => (action: Action) => {
  if (action.type === ROUTER_NAVIGATED) {
    const routerAction = action as RouterNavigatedAction<RouterState>;
    const { path } = routerAction.payload.routerState;

    if (Array.isArray(route)) {
      return route.indexOf(path) > -1;
    } else if (route instanceof RegExp) {
      route.test(path);
    }

    return route === path;
  }

  return false;
};

export const ofRoute = (route: string | string[] | RegExp): MonoTypeOperatorFunction<Action> => filter<Action>(isRoute(route));

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function mapToParam<T>(key: string): OperatorFunction<RouterNavigatedAction<RouterState>, T> {
  return map<RouterNavigatedAction<RouterState>, T>(
    routerAction => routerAction.payload.routerState.params[key],
  );
}
