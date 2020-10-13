import { NgModule, Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { State, StateMap, StateEnumeration } from '../../models';
import { getStates, getSelectedState, getShowSidenav, getCollectionState, getSelectedCollectionId } from '../../selectors';
import { StateActions, LayoutActions, ToastActions, FileUploadActions } from '../../actions';
import { StateTableModule } from '../../components';
import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';
import { StateManagementConstants } from 'src/app/constants/state-management.constants';
import { StateSidenavModule } from '../state-sidenav/state-sidenav.component';

enum UploadableTypes {
  Enumerations,
  States
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'states',
  styleUrls: [ 'states.component.css' ],
  templateUrl: 'states.component.html'
})
export class StateComponent implements OnDestroy {
  public collectionId: number;
  public showSidenav: boolean;
  public stateMap: StateMap;
  public state: State;
  public enumerationsUploadableType = UploadableTypes.Enumerations;
  public statesUploadableType = UploadableTypes.States;

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
      this.store.pipe(select(getStates)).subscribe(stateMap => {
        this.stateMap = stateMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedState)).subscribe(selectedState => {
        this.state = selectedState;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onEnumerationsOutput(enumerations: StateEnumeration[]): void {
    this.store.dispatch(StateActions.saveEnumerations({
      collectionId: this.collectionId,
      stateId: this.state.id,
      enumerations
    }));
  }

  /**
   * Called on creation or edit of a state.
   * @param state The state that we're creating or modifing. Can be undefined
   * if the user is creating a new state.
   */
  public onModifyState(state?: State): void {
    this.store.dispatch(StateActions.setSelectedState({
      state
    }));

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onSidenavOutput(result: { state?: State, stateEnumerations: StateEnumeration[] }): void {
    if (result === undefined) {
      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: false
      }));
    } else {
      const { state } = result;

      state.enumerations = [
        ...result.stateEnumerations
      ];

      if (state !== undefined) {
        // Try and set the state id so we don't get duplicate identifier errors.
        if (state.id === null && this.state) {
          state.id = this.state.id;
        }

        if (state.id === null) {
          this.store.dispatch(StateActions.createState({
            collectionId: this.collectionId,
            state
          }));
        } else {
          this.store.dispatch(StateActions.editState({
            collectionId: this.collectionId,
            state
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
    const fileType = file.name.split('.').pop().toLowerCase();

    if (file && (fileType === 'csv' || fileType === 'json')) {
      switch (type) {
        case UploadableTypes.Enumerations:
          this.store.dispatch(FileUploadActions.uploadStateEnumerations({
            collectionId: this.collectionId,
            file,
            fileType
          }));

          break;
        case UploadableTypes.States:
          this.store.dispatch(FileUploadActions.uploadStates({
            collectionId: this.collectionId,
            file,
            fileType
          }));

          break;
        default:
          break;
      }
    } else {
      this.store.dispatch(ToastActions.showToast({
        message: StateManagementConstants.wrongFiletypeUploadMessage,
        toastType: 'error'
      }));
    }
  }
}

@NgModule({
  declarations: [
    StateComponent
  ],
  exports: [
    StateComponent
  ],
  imports: [
    StateSidenavModule,
    StateTableModule,
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class StateModule {}
