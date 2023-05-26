import {
  NgModule,
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
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
  getStateTypes,
  getIsLoading,
  getIsSaving
} from '../../selectors';
import { StateActions, LayoutActions, ToastActions } from '../../actions';
import { StateSidenavModule, StateTableModule } from 'src/app/components';
import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';
import { UploadConstants } from 'src/app/constants';
import { NavigationService } from '../../services';
import { LoadingModule } from '../../components/loading/loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-states',
  styleUrls: ['states.component.css'],
  templateUrl: 'states.component.html'
})
export class StatesComponent implements OnDestroy {
  @Output() public jsonExport: EventEmitter<State>;
  @Output() public csvExport: EventEmitter<State>;

  public collectionId: string;
  public isLoading: boolean;
  public isSaving: boolean;
  public showSidenav: boolean;
  public stateMap: StateMap;
  public state: State;
  public stateEnumerations: StateEnumeration[];
  public stateIdentifierMap: IdentifierMap;
  public stateTypes: string[];
  public currentFilteredStates: State[];

  private stateId: string;
  private subscriptions = new SubSink();

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location,
    private navigationService: NavigationService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.currentFilteredStates = [];

    this.subscriptions.add(
      this.store.pipe(select(getSelectedCollectionId)).subscribe((collectionId) => {
        this.collectionId = collectionId;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getIsLoading)).subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getIsSaving)).subscribe((isSaving) => {
        this.isSaving = isSaving;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getShowSidenav)).subscribe((showSidenav) => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedState)).subscribe((selectedState) => {
        this.state = selectedState;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStateEnumerations)).subscribe((stateEnumerations) => {
        this.stateEnumerations = stateEnumerations;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStateIdentifierMap)).subscribe((stateIdentifierMap) => {
        this.stateIdentifierMap = stateIdentifierMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStates)).subscribe((stateMap) => {
        this.stateMap = stateMap;
        this.changeDetectorRef.markForCheck();

        this.stateId = this.activatedRoute.snapshot.paramMap.get('id');

        if (this.stateId && this.stateMap) {
          this.onModifyState(this.stateMap[this.stateId]);
        }
      }),
      this.store.pipe(select(getStateTypes)).subscribe((stateTypes) => {
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
    this.store.dispatch(
      StateActions.setSelectedState({
        id: state?.id
      })
    );

    const newStateId = state?.id ?? '';

    this.navigationService.addItemIDToURL(this.stateId, newStateId, this.location, this.router.url);
    this.stateId = newStateId;

    this.store.dispatch(
      LayoutActions.toggleSidenav({
        showSidenav: true
      })
    );
  }

  public onSidenavError(error: string): void {
    this.store.dispatch(
      ToastActions.showToast({
        message: error,
        toastType: 'error'
      })
    );
  }

  public onSidenavOutput(result: { state: State; deletedEnumerationIds: string[] }): void {
    if (!result) {
      // If the user is closing the sidenav intentionally, remove the ID from the URL.
      this.navigationService.removeIDFromURL(this.location, this.router.url);
      this.stateId = '';

      this.store.dispatch(
        LayoutActions.toggleSidenav({
          showSidenav: false
        })
      );
    } else {
      this.store.dispatch(LayoutActions.isSaving({ isSaving: true }));

      if (!result.state.id) {
        this.store.dispatch(
          StateActions.createState({
            state: result.state
          })
        );
      } else {
        this.store.dispatch(
          StateActions.updateState({
            state: result.state
          })
        );
      }

      if (result.deletedEnumerationIds.length > 0 && result.state.id) {
        this.store.dispatch(
          StateActions.deleteEnumerations({
            deletedEnumerationIds: result.deletedEnumerationIds,
            stateId: result.state.id
          })
        );
      }
    }
  }

  public onStateEnumerationFileUpload(): void {
    this.store.dispatch(
      LayoutActions.openFileUploadDialog({
        collectionId: this.collectionId,
        csvFormat: [UploadConstants.stateEnumerationCsvUploadFormat],
        dialogType: 'State Enumeration',
        jsonFormat: UploadConstants.stateEnumerationJsonUploadFormat
      })
    );
  }

  public onStateFileUpload(): void {
    this.store.dispatch(
      LayoutActions.openFileUploadDialog({
        collectionId: this.collectionId,
        csvFormat: [UploadConstants.stateCsvUploadFormat],
        dialogType: 'State',
        jsonFormat: UploadConstants.stateJsonUploadFormat,
        types: this.stateTypes
      })
    );
  }

  public onStateJsonDownload(): void {
    this.store.dispatch(
      ToastActions.showToast({
        message: 'No download yet',
        toastType: 'error'
      })
    );
    const outputData = 'data';

    const blob = new Blob([outputData], { type: `application/json;charset=utf-8;` });
    const link = document.createElement('a');
    if (link.download !== undefined) { 
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `test.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }

  public onStateCsvDownload(): void {
    this.store.dispatch(
      ToastActions.showToast({
        message: 'No download yet',
        toastType: 'error'
      })
    );
    let outputData = 'channelId,dataType,description,displayName,editable,externalLink,id,identifier,restricted,source,subsystem,type,units,version\n';

    for (var i in this.currentFilteredStates) {
      outputData += `${this.currentFilteredStates[i].channelId},`+
                    `${this.currentFilteredStates[i].dataType},`+
                    `${this.currentFilteredStates[i].description},`+
                    `${this.currentFilteredStates[i].displayName},`+
                    `${this.currentFilteredStates[i].editable},`+
                    `${this.currentFilteredStates[i].externalLink},`+
                    `${this.currentFilteredStates[i].id},`+
                    `${this.currentFilteredStates[i].identifier},`+
                    `${this.currentFilteredStates[i].restricted},`+
                    `${this.currentFilteredStates[i].source},`+
                    `${this.currentFilteredStates[i].subsystem},`+
                    `${this.currentFilteredStates[i].type},`+
                    `${this.currentFilteredStates[i].units},`+
                    `${this.currentFilteredStates[i].version}\n`
    }

    const blob = new Blob([outputData], { type: `text/csv;charset=utf-8;` });
    const link = document.createElement('a');
    if (link.download !== undefined) { 
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `states.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }

  public onFilterUpdate(states: State[]): void {
    this.currentFilteredStates = states;
    //TODO: check filtered states list looks how it wants, onchange may not happen as frequently as expected
  }

}



@NgModule({
  declarations: [StatesComponent],
  exports: [StatesComponent],
  imports: [
    CommonModule,
    LoadingModule,
    MaterialModule,
    RouterModule,
    StateSidenavModule,
    StateTableModule
  ]
})
export class StatesModule {}
