import { NgModule, Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { StateVariable, StateVariableMap, StateEnumeration } from '../../models';
import { StateManagementAppState } from '../../state-management-app-store';
import { getStateVariables, getSelectedStateVariable } from '../../selectors';
import { StateVariableActions, LayoutActions } from '../../actions';
import { AddDataFormModule, StateVariableTableModule } from '../../components';
import { getShowSidenav } from '../../selectors/layout.selector';
import { StateVariableSidenavModule } from '../state-variable-sidenav/state-variable-sidenav.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'home',
  styleUrls: [ 'home.component.css' ],
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnDestroy {
  public showSidenav: boolean;
  public stateVariableMap: StateVariableMap;
  public stateVariable: StateVariable;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<StateManagementAppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.store.pipe(select(getShowSidenav)).subscribe(showSidenav => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStateVariables)).subscribe(stateVariableMap => {
        this.stateVariableMap = stateVariableMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedStateVariable)).subscribe(selectedStateVariable => {
        this.stateVariable = selectedStateVariable;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Called on creation or edit of a state variable.
   * @param stateVariable The state variable that we're creating or modifing. Can be undefined
   * if the user is creating a new state variable.
   */
  public onModifyStateVariable(stateVariable?: StateVariable): void {
    this.store.dispatch(StateVariableActions.setSelectedStateVariable({
      stateVariable
    }));

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onSidenavOutput(result: { stateVariable?: StateVariable, stateEnumerations: StateEnumeration[] }): void {
    if (result === undefined) {
      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: false
      }));
    } else {
      const { stateVariable } = result;
      const { stateEnumerations } = result;

      if (stateVariable !== undefined) {
        // Try and set the state variable id so we don't get duplicate identifier errors.
        if (stateVariable.id === null && this.stateVariable) {
          stateVariable.id = this.stateVariable.id;
        }

        if (stateVariable.id === null) {
          this.store.dispatch(StateVariableActions.createStateVariable({
            stateVariable,
            stateEnumerations
          }));
        } else {
          this.store.dispatch(StateVariableActions.editStateVariable({
            stateVariable
          }));
        }
      }
    }
  }

  public onEnumerationsOutput(enumerations: StateEnumeration[]): void {
    this.store.dispatch(StateVariableActions.saveEnumerations({
      stateVariableId: this.stateVariable.id,
      enumerations
    }));
  }

  /**
   * Only dispatch a valid file, if file is null then we couldn't parse the file
   * due to a filetype issue.
   * @param file The file we're being passed.
   */
  public onUploadStateVariables(file: File): void {
    if (file) {
      this.store.dispatch(StateVariableActions.parseStateVariablesFile({
        file
      }));
    } else {
      this.store.dispatch(StateVariableActions.parseStateVariablesFileFailure({
        error: new Error('Wrong filetype supplied, only csv is supported.')
      }));
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
    StateVariableSidenavModule,
    StateVariableTableModule,
    CommonModule
  ]
})
export class HomeModule {}
