import { NgModule, Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TestString } from '../../models';
import { FpsaProtoAppState } from '../../fpsa-proto-app-store';
import { getData } from '../../selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'home',
  styleUrls: [ 'home.component.css' ],
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  public data$: Observable<Array<TestString>>;

  constructor(
    private store: Store<FpsaProtoAppState>
  ) {
    this.data$ = this.store.pipe(select(getData));
  }
}

@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class HomeModule {}
