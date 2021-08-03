import { NgModule } from '@angular/core';
import { RouterModule, Routes, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import {
  StatesComponent,
  StateHistoryComponent,
  RelationshipsComponent,
  RelationshipHistoryComponent,
  FaqComponent,
  GroupsComponent,
  InformationTypesComponent,
  EventsComponent,
  EventHistoryComponent,
  ConstraintsComponent,
  ConstraintHistoryComponent,
  CommandHistoryComponent,
  CommandsComponent
} from './containers';
import { CommandArgumentHistoryComponent } from './containers/command-argument-history/command-argument-history.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'collection'
  },
  {
    path: 'collection/:collectionId',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'states'
      },
      {
        component: CommandArgumentHistoryComponent,
        path: 'command-argument-history'
      },
      {
        component: CommandHistoryComponent,
        path: 'command-history'
      },
      {
        component: CommandsComponent,
        path: 'commands'
      },
      {
        component: ConstraintHistoryComponent,
        path: 'constraint-history'
      },
      {
        component: ConstraintsComponent,
        path: 'constraints'
      },
      {
        component: EventsComponent,
        path: 'events'
      },
      {
        component: EventHistoryComponent,
        path: 'event-history'
      },
      {
        component: GroupsComponent,
        path: 'groups'
      },
      {
        component: InformationTypesComponent,
        path: 'information-types'
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
        component: StatesComponent,
        path: 'states'
      },
      {
        component: StateHistoryComponent,
        path: 'state-history'
      }
    ],
  },
  {
    component: FaqComponent,
    path: 'faqs'
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
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
