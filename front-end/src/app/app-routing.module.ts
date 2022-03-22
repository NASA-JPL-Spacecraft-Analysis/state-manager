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
  CommandsComponent,
  CommandArgumentHistoryComponent,
  StateEnumerationHistoryComponent
} from './containers';

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
        redirectTo: 'states/'
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
        path: 'commands',
        redirectTo: 'commands/'
      },
      {
        component: CommandsComponent,
        path: 'commands/:id'
      },
      {
        component: ConstraintHistoryComponent,
        path: 'constraint-history'
      },
      {
        path: 'constraints',
        redirectTo: 'constraints/'
      },
      {
        component: ConstraintsComponent,
        path: 'constraints/:id'
      },
      {
        path: 'events',
        redirectTo: 'events/'
      },
      {
        component: EventsComponent,
        path: 'events/:id'
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
        path: 'relationships',
        redirectTo: 'relationships/'
      },
      {
        component: RelationshipsComponent,
        path: 'relationships/:id'
      },
      {
        component: RelationshipHistoryComponent,
        path: 'relationship-history'
      },
      {
        component: StateEnumerationHistoryComponent,
        path: 'state-enumeration-history'
      },
      {
        path: 'states',
        redirectTo: 'states/'
      },
      {
        component: StatesComponent,
        path: 'states/:id'
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
