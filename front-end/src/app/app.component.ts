import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ToastrModule } from 'ngx-toastr';

import {
  NavEffects,
  ToastEffects,
  FileUploadEffects,
  EventEffects,
  CollectionEffects,
  InformationTypesEffects,
  StateEffects,
  RelationshipEffects,
  GroupEffects
} from './effects';
import { AppRoutingModule, RouterSerializer } from './app-routing.module';
import { metaReducers, ROOT_REDUCERS } from './app-store';
import { MaterialModule } from './material';
import { ToolbarModule } from './containers';
import { environment } from './../environments/environment';

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
    ApolloModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpLinkModule,
    MaterialModule,
    EffectsModule.forRoot([
      CollectionEffects,
      EventEffects,
      FileUploadEffects,
      GroupEffects,
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
  providers: [
    {
      deps: [ HttpLink ],
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: environment.apolloServerUrl
        })
      })
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
