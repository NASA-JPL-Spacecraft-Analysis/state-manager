import { NgModule, Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { State, StateMap, StateEnumeration, IdentifierMap } from '../../models';
import {
  getStates,
  getSelectedState,
  getShowSidenav,
  getSelectedCollectionId,
  getStateIdentifierMap,
  getStateEnumerations,
  getStateTypes
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
  public stateIdentifierMap: IdentifierMap;
  public stateTypes: string[];

  private stateId: string;
  private subscriptions = new SubSink();

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location,
    private router: Router,
    private store: Store<AppState>
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

        this.stateId = this.activatedRoute.snapshot.paramMap.get('id');

        if (this.stateId && this.stateMap) {
          this.onModifyState(this.stateMap[this.stateId]);
        }
      }),
      this.store.pipe(select(getStateTypes)).subscribe(stateTypes => {
        this.stateTypes = stateTypes;
        this.changeDetectorRef.markForCheck();
      })
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
    if (state?.id) {
      this.store.dispatch(StateActions.setSelectedState({
        id: state.id
      }));

      // Only change the URL if the user selects a different item then the one already selected.
      if (this.stateId !== state.id) {
        if (this.stateId === '') {
          // If the user hasn't selected an item, append the item ID to the URL.
          this.location.replaceState(this.router.url + state.id);
        } else {
          const splitUrl = this.router.url.split('/');
          splitUrl.pop();

          // If the user already has an item selected, replace that part of the URL with the new ID.
          this.location.replaceState(splitUrl.join('/') + '/' + state.id);
        }

        this.stateId = state.id;
      }
    }

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
      const splitUrl = this.router.url.split('/');
      splitUrl.pop();

      // If the user is closing the sidenav intentionally, remove the ID from the URL.
      this.location.replaceState(splitUrl.join('/'));
      this.stateId = '';

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
      jsonFormat: UploadConstants.stateJsonUploadFormat,
      types: this.stateTypes
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
