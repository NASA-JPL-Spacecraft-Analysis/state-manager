import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FpsaProtoAppRoutingModule } from './fpsa-proto-app-routing.module';
import { reducers } from './fpsa-proto-app-store';
import { HomeModule } from './containers';
import { DataEffects } from './effects';

@NgModule({
  imports: [
    HttpClientModule,
    EffectsModule.forRoot([
      DataEffects
    ]),
    FpsaProtoAppRoutingModule,
    StoreModule.forFeature('fpsaProtoApp', reducers),
    HomeModule
  ]
})
export class FpsaProtoAppModule {}
