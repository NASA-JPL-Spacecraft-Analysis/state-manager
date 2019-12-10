import { NgModule, Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { StateVariable } from '../../models';
import { StateManagementAppState } from '../../state-management-app-store';
import { getStateVariables } from '../../selectors';
import { AddDataFormModule } from '../../components/add-data-form/add-data-form.component';
import { StateVariableActions } from '../../actions';
import { StateVariableTableModule } from '../../components/state-variable-table/state-variable-table.component';
import { DataDialogComponent, DataDialogModule } from '../../components/data-dialog/data-dialog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'home',
  styleUrls: [ 'home.component.css' ],
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  public stateVariables$: Observable<StateVariable[]>;

  constructor(
    public dialog: MatDialog,
    private store: Store<StateManagementAppState>
  ) {
    this.stateVariables$ = this.store.pipe(select(getStateVariables));
  }

  /**
   * Called on creation or edit of a state variable.
   * @param stateVariable The state variable that we're creating or modifing.
   */
  public onModifyStateVariable(stateVariable?: StateVariable): void {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '400px',
      data: {
        stateVariable
      }
    });

    dialogRef.afterClosed().subscribe(
      (modifiedStateVariable: StateVariable) => {
        this.modifyData(modifiedStateVariable);
      }
    );
  }

  public modifyData(stateVariable: StateVariable): void {
    if (stateVariable !== undefined) {
      if (stateVariable.id == null) {
        this.store.dispatch(StateVariableActions.createStateVariable({
          stateVariable
        }));
      } else {
        this.store.dispatch(StateVariableActions.editStateVariable({
          stateVariable
        }));
      }
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
    DataDialogModule,
    StateVariableTableModule,
    CommonModule
  ]
})
export class HomeModule {}
