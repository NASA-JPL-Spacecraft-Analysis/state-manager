import { NgModule, Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { State, StateMap, StateEnumeration, NewIdentifierMap } from '../../models';
import {
  getStates,
  getSelectedState,
  getShowSidenav,
  getSelectedCollectionId,
  getStateIdentifierMap,
  getStateEnumerations
} from '../../selectors';
import { StateActions, LayoutActions, ToastActions } from '../../actions';
import { StateSidenavModule, StateTableModule } from 'src/app/components';
import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';
import { UploadConstants } from 'src/app/constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-states',
  styleUrls: [ 'states.component.css' ],
  templateUrl: 'states.component.html'
})
export class StatesComponent implements OnDestroy {
  public collectionId: string;
  public showSidenav: boolean;
  public stateMap: StateMap;
  public state: State;
  public stateEnumerations: StateEnumeration[];
  public stateIdentifierMap: NewIdentifierMap;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.store.pipe(select(getSelectedCollectionId)).subscribe(collectionId => {
        this.collectionId = collectionId;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getShowSidenav)).subscribe(showSidenav => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedState)).subscribe(selectedState => {
        this.state = selectedState;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStateEnumerations)).subscribe(stateEnumerations => {
        this.stateEnumerations = stateEnumerations;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStateIdentifierMap)).subscribe(stateIdentifierMap => {
        this.stateIdentifierMap = stateIdentifierMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStates)).subscribe(stateMap => {
        this.stateMap = stateMap;
        this.changeDetectorRef.markForCheck();
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Called on creation or edit of a state.
   *
   * @param state The state that we're creating or modifing. Can be undefined if the user is creating a new state.
   */
  public onModifyState(state?: State): void {
    this.store.dispatch(StateActions.setSelectedState({
      id: state?.id
    }));

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onSidenavError(error: string): void {
    this.store.dispatch(ToastActions.showToast({
      message: error,
      toastType: 'error'
    }));
  }

  public onSidenavOutput(result: { state: State; deletedEnumerationIds: string[] }): void {
    if (!result) {
      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: false
      }));
    } else {
      if (!result.state.id) {
        this.store.dispatch(StateActions.createState({
          state: result.state
        }));
      } else {
        this.store.dispatch(StateActions.updateState({
          state: result.state
        }));
      }

      if (result.deletedEnumerationIds.length > 0 && result.state.id) {
        this.store.dispatch(StateActions.deleteEnumerations({
          deletedEnumerationIds: result.deletedEnumerationIds,
          stateId: result.state.id
        }));
      }
    }
  }

  public onStateEnumerationFileUpload():  void {
    this.store.dispatch(LayoutActions.openFileUploadDialog({
      collectionId: this.collectionId,
      csvFormat: [ UploadConstants.stateEnumerationCsvUploadFormat ],
      dialogType: 'State Enumeration',
      jsonFormat: UploadConstants.stateEnumerationJsonUploadFormat
    }));
  }

  public onStateFileUpload(): void {
    this.store.dispatch(LayoutActions.openFileUploadDialog({
      collectionId: this.collectionId,
      csvFormat: [ UploadConstants.stateCsvUploadFormat ],
      dialogType: 'State',
      jsonFormat: UploadConstants.stateJsonUploadFormat
    }));
  }
}

@NgModule({
  declarations: [
    StatesComponent
  ],
  exports: [
    StatesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    StateSidenavModule,
    StateTableModule
  ]
})
export class StatesModule {}
