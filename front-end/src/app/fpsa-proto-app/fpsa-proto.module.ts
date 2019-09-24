import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { FpsaProtoAppRoutingModule } from './fpsa-proto-app-routing.module';
import { reducers } from './fpsa-proto-app-store';
import { HomeModule } from './containers';

@NgModule({
  imports: [
    HttpClientModule,
    FpsaProtoAppRoutingModule,
    StoreModule.forFeature('fpsaProtoApp', reducers),
    HomeModule
  ]
})
export class FpsaProtoAppModule {}
