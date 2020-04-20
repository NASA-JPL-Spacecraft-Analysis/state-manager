import { NgModule } from '@angular/core';
import { RouterModule, Routes, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import {
  StateVariablesComponent,
  StateHistoryComponent,
  RelationshipsComponent,
  RelationshipHistoryComponent,
  FaqComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'states'
  },
  {
    component: FaqComponent,
    path: 'faqs'
  },
  {
    component: RelationshipsComponent,
    path: 'relationships'
  },
  {
    component: RelationshipHistoryComponent,
    path: 'relationship-history'
  },
  {
    component: StateVariablesComponent,
    path: 'states'
  },
  {
    component: StateHistoryComponent,
    path: 'state-history'
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {}

export interface RouterState {
  params: Params;
  path: string;
  queryParams: Params;
  url: string;
}

export class RouterSerializer implements RouterStateSerializer<RouterState> {
  serialize(routerStateSnapshot: RouterStateSnapshot): RouterState {
    const { url, root } = routerStateSnapshot;

    let route = root;
    const path: string[] = [];

    while (route.firstChild) {
      route = route.firstChild;

      if (route.routeConfig && route.routeConfig.path) {
        path.push(route.routeConfig.path);
      }
    }

    const routerState: RouterState = {
      params: route.params,
      path: path.join('/'),
      queryParams: root.queryParams,
      url
    };

    return routerState;
  }
}
