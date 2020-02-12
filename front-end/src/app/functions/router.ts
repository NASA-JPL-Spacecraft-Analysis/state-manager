import { Action } from '@ngrx/store';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

import { RouterState } from 'src/app/app-routing.module';

export function isRoute(route: string): (action: Action) => boolean {
  return (action: Action) => {
    if (action.type === ROUTER_NAVIGATED) {
      const routerAction = action as RouterNavigatedAction<RouterState>;
      const { path } = routerAction.payload.routerState;

      return route === path;
    }

    return false;
  };
}

export function ofRoute(route: string): MonoTypeOperatorFunction<Action> {
  return filter<Action>(isRoute(route));
}
