import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './containers';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'test'
  },
  {
    component: HomeComponent,
    path: 'test'
  },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class FspaProtoAppRoutingModule {}
