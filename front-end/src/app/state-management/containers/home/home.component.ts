import { NgModule, Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';

import { StateVariable } from '../../models';
import { StateManagementAppState } from '../../state-management-app-store';
import { getStateVariables } from '../../selectors';
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
  public stateVariables$: Observable<StateVariable[]>;
  public stateVariable: StateVariable;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<StateManagementAppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.stateVariables$ = this.store.pipe(select(getStateVariables));

    this.subscriptions.add(
      this.store.pipe(select(getShowSidenav)).subscribe(showSidenav => {
        this.showSidenav = showSidenav;
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
    this.stateVariable = stateVariable;

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onCloseSidenav(stateVariable?: StateVariable): void {
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
    } else {
      // If our state variable is undefined the user closed the sidenav.
      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: false
      }));
    }
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
