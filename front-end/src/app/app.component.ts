import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule, RouterSerializer } from './app-routing.module';
import { environment } from './../environments/environment';
import { NavEffects } from './state-management/effects/nav.effects';
import { metaReducers, ROOT_REDUCERS } from './app-store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    EffectsModule.forRoot([
      NavEffects
    ]),
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: !environment.production,
        strictActionSerializability: false,
        strictStateImmutability: !environment.production,
        strictStateSerializability: false,
      }
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
      serializer: RouterSerializer
    }),
    NoopAnimationsModule
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
