import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';

import {
  NavEffects,
  ToastEffects,
  FileUploadEffects,
  EventEffects,
  CollectionEffects,
  InformationTypesEffects,
  StateEffects,
  RelationshipEffects
} from './effects';
import { AppRoutingModule, RouterSerializer } from './app-routing.module';
import { environment } from './../environments/environment';
import { metaReducers, ROOT_REDUCERS } from './app-store';
import { MaterialModule } from './material';
import { ToolbarModule } from './containers';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    EffectsModule.forRoot([
      CollectionEffects,
      EventEffects,
      FileUploadEffects,
      InformationTypesEffects,
      NavEffects,
      RelationshipEffects,
      StateEffects,
      ToastEffects
    ]),
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: false,
        strictStateImmutability: true,
        strictStateSerializability: true,
      }
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer
    }),
    ToastrModule.forRoot({
      countDuplicates: true,
      maxOpened: 4,
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true
    }),
    ToolbarModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
