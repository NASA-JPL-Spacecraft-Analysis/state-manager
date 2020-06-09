import { Action } from '@ngrx/store';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

import { RouterState } from 'src/app/app-routing.module';

export function isRoute(route: string | string[] | RegExp): (action: Action) => boolean {
  return (action: Action) => {
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
}

export function ofRoute(route: string | string[] | RegExp): MonoTypeOperatorFunction<Action> {
  return filter<Action>(isRoute(route));
}
