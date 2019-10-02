import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FspaProtoAppRoutingModule } from './fspa-proto-app-routing.module';
import { reducers } from './fspa-proto-app-store';
import { HomeModule } from './containers';
import { DataEffects } from './effects';

@NgModule({
  imports: [
    HttpClientModule,
    EffectsModule.forRoot([
      DataEffects
    ]),
    FspaProtoAppRoutingModule,
    StoreModule.forFeature('fspaProtoApp', reducers),
    HomeModule
  ]
})
export class FspaProtoAppModule {}
