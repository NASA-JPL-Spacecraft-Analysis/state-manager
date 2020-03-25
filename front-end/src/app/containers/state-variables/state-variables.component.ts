import { NgModule, Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { StateVariable, StateVariableMap, StateEnumeration } from '../../models';
import { getStateVariables, getSelectedStateVariable } from '../../selectors';
import { StateVariableActions, LayoutActions, ToastActions } from '../../actions';
import { StateVariableTableModule } from '../../components';
import { getShowSidenav } from '../../selectors/layout.selector';
import { StateVariableSidenavModule } from '../state-variable-sidenav/state-variable-sidenav.component';
import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';

enum UploadableTypes {
  States,
  Enumerations
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-variables',
  styleUrls: [ 'state-variables.component.css' ],
  templateUrl: 'state-variables.component.html'
})
export class StateVariablesComponent implements OnDestroy {
  public showSidenav: boolean;
  public stateVariableMap: StateVariableMap;
  public stateVariable: StateVariable;
  public statesUploadableType = UploadableTypes.States;
  public enumerationsUploadableType = UploadableTypes.Enumerations;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<AppState>,
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

  public onEnumerationsOutput(enumerations: StateEnumeration[]): void {
    this.store.dispatch(StateVariableActions.saveEnumerations({
      stateVariableId: this.stateVariable.id,
      enumerations
    }));
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

  /**
   * Only dispatch a valid file, if file is null then we couldn't parse the file
   * due to a filetype issue.
   * @param fileEvent The Event for the current file.
   * @param type The type of items that are being uploaded, either 'states', or 'enumerations'.
   */
  public onFileUpload(fileEvent: Event, type: UploadableTypes): void {
    const file = (fileEvent.target as HTMLInputElement).files[0];
    const fileType = file.name.split('.').pop();

    if (file && fileType === 'csv') {
      switch (type) {
        case UploadableTypes.States:
          this.store.dispatch(StateVariableActions.uploadStateVariables({
            file
          }));
          break;
        case UploadableTypes.Enumerations:
          this.store.dispatch(StateVariableActions.uploadEnumerations({
            file
          }));
          break;
        default:
          break;
      }
    } else {
      this.store.dispatch(ToastActions.showToast({
        message: 'Wrong filetype supplied, only csv is supported.',
        toastType: 'error'
      }));
    }
  }
}

@NgModule({
  declarations: [
    StateVariablesComponent
  ],
  exports: [
    StateVariablesComponent
  ],
  imports: [
    StateVariableSidenavModule,
    StateVariableTableModule,
    CommonModule,
    MaterialModule
  ]
})
export class StateVariablesModule {}
