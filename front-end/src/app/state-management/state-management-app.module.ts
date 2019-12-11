import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StateManagementAppRoutingModule } from './state-management-app-routing.module';
import { reducers } from './state-management-app-store';
import { HomeModule } from './containers';
import { DataEffects } from './effects';
import { DataDialogComponent } from './containers/data-dialog/data-dialog.component';

@NgModule({
  imports: [
    HttpClientModule,
    EffectsModule.forRoot([
      DataEffects
    ]),
    StateManagementAppRoutingModule,
    StoreModule.forFeature('stateManagementApp', reducers),
    HomeModule
  ],
  entryComponents: [
    DataDialogComponent
  ]
})
export class StateManagementAppModule {}
