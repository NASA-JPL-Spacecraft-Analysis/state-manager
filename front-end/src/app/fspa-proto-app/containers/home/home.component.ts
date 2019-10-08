import { NgModule, Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TestString } from '../../models';
import { FspaProtoAppState } from '../../fspa-proto-app-store';
import { getData } from '../../selectors';
import { AddDataFormModule } from '../../components/add-data-form/add-data-form.component';
import { DataActions } from '../../actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'home',
  styleUrls: [ 'home.component.css' ],
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  public data$: Observable<Array<TestString>>;

  constructor(
    private store: Store<FspaProtoAppState>
  ) {
    this.data$ = this.store.pipe(select(getData));
  }

  public onAddData(data: string): void {
    if (data !== undefined) {
      this.store.dispatch(DataActions.createNewData({ data }));
    }
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
    AddDataFormModule,
    CommonModule
  ]
})
export class HomeModule {}
