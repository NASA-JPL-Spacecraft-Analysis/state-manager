import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StateManagementAppRoutingModule } from './state-management-app-routing.module';
import { reducers } from './state-management-app-store';
import { HomeModule } from './containers';
import { DataEffects } from './effects';

@NgModule({
  imports: [
    HttpClientModule,
    EffectsModule.forRoot([
      DataEffects
    ]),
    StateManagementAppRoutingModule,
    StoreModule.forFeature('stateManagementApp', reducers),
    HomeModule
  ]
})
export class StateManagementAppModule {}
