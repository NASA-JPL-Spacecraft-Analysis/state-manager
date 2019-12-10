import { NgModule, Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StateVariable } from '../../models';
import { StateManagementAppState } from '../../state-management-app-store';
import { getStateVariables } from '../../selectors';
import { AddDataFormModule } from '../../components/add-data-form/add-data-form.component';
import { StateVariableActions } from '../../actions';
import { StateVariableTableModule } from '../../components/state-variable-table/state-variable-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'home',
  styleUrls: [ 'home.component.css' ],
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  public stateVariables$: Observable<StateVariable[]>;

  constructor(
    private store: Store<StateManagementAppState>
  ) {
    this.stateVariables$ = this.store.pipe(select(getStateVariables));
  }

  public onModifyData(stateVariable: StateVariable): void {
    if (stateVariable !== undefined) {
      this.store.dispatch(StateVariableActions.modifyStateVariable({ stateVariable }));
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
    StateVariableTableModule,
    CommonModule
  ]
})
export class HomeModule {}
