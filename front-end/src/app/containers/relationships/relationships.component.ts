import { Component, ChangeDetectionStrategy, NgModule, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { RelationshipMap, Relationship } from 'src/app/models/relationship';
import {
  getRelationships,
  getSelectedRelationship,
  getStates,
  getEventMap,
  getShowSidenav,
  getSelectedCollectionId,
  getInformationTypeMap,
  getCommandMap,
  getConstraintMap,
  getCommandArgumentMap,
  getStateEnumerationMap,
} from 'src/app/selectors';
import { RelationshipsTableModule } from 'src/app/components/relationships-table/relationships-table.component';
import { LayoutActions, ToastActions, RelationshipActions } from 'src/app/actions';
import { RelationshipSidenavModule } from 'src/app/components';
import { MaterialModule } from 'src/app/material';
import { StateMap, InformationTypeMap, EventMap, ConstraintMap, CommandMap, CommandArgumentMap, StateEnumerationMap } from 'src/app/models';
import { UploadConstants } from 'src/app/constants';
import { NavigationService } from '../../services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-relationships',
  styleUrls: [ 'relationships.component.css' ],
  templateUrl: 'relationships.component.html'
})
export class RelationshipsComponent implements OnDestroy {
  public commandMap: CommandMap;
  public commandArgumentMap: CommandArgumentMap;
  public constraintMap: ConstraintMap;
  public eventMap: EventMap;
  public informationTypeMap: InformationTypeMap;
  public relationshipMap: RelationshipMap;
  public relationship: Relationship;
  public showSidenav: boolean;
  public stateEnumerationMap: StateEnumerationMap;
  public stateMap: StateMap;

  private collectionId: string;
  private relationshipId: string;
  private subscriptions = new SubSink();

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location,
    private navigationService: NavigationService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.subscriptions.add(
      this.store.pipe(select(getSelectedCollectionId)).subscribe(collectionId => {
        this.collectionId = collectionId;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getCommandMap)).subscribe(commandMap => {
        this.commandMap = commandMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getCommandArgumentMap)).subscribe(commandArgumentMap => {
        this.commandArgumentMap = commandArgumentMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getConstraintMap)).subscribe(constraintMap => {
        this.constraintMap = constraintMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getEventMap)).subscribe(eventMap => {
        this.eventMap = eventMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getInformationTypeMap)).subscribe(informationTypeMap => {
        this.informationTypeMap = informationTypeMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getRelationships)).subscribe(relationshipMap => {
        this.relationshipMap = relationshipMap;
        this.changeDetectorRef.markForCheck();

        this.relationshipId = this.activatedRoute.snapshot.paramMap.get('id');

        if (this.relationshipId && this.relationshipMap) {
          this.onModifyRelationship(this.relationshipMap[this.relationshipId]);
        }
      }),
      this.store.pipe(select(getSelectedRelationship)).subscribe(selectedRelationship => {
        this.relationship = selectedRelationship;
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
      this.store.pipe(select(getStateEnumerationMap)).subscribe(stateEnumerationMap => {
        this.stateEnumerationMap = stateEnumerationMap;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onFileUpload(): void {
    this.store.dispatch(LayoutActions.openFileUploadDialog({
      collectionId: this.collectionId,
      csvFormat: [ UploadConstants.relationshipCsvUploadFormat ],
      dialogType: 'Relationship',
      jsonFormat: UploadConstants.relationshipJsonUploadFormat
    }));
  }

  public onFormErrorOutput(error: string): void {
    this.store.dispatch(ToastActions.showToast({
      message: error,
      toastType: 'error'
    }));
  }

  public onModifyRelationship(relationship?: Relationship): void {
    this.store.dispatch(RelationshipActions.setSelectedRelationship({
      relationship
    }));

    const newRelationshipId = relationship?.id ?? '';

    this.navigationService.addItemIDToURL(this.relationshipId, newRelationshipId, this.location, this.router.url);
    this.relationshipId = newRelationshipId;

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onRelationshipOutput(relationship: Relationship): void {
    if (relationship === undefined) {
      // If the user is closing the sidenav intentionally, remove the ID from the URL.
      this.navigationService.removeIDFromURL(this.location, this.router.url);
      this.relationshipId = '';

      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: false
      }));
    } else {
      if (relationship.id === null) {
        this.store.dispatch(RelationshipActions.createRelationship({
          collectionId: this.collectionId,
          relationship
        }));
      } else {
        this.store.dispatch(RelationshipActions.updateRelationship({
          relationship
        }));
      }
    }
  }
}

@NgModule({
  declarations: [
    RelationshipsComponent
  ],
  exports: [
    RelationshipsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RelationshipSidenavModule,
    RelationshipsTableModule,
    RouterModule
  ]
})
export class RelationshipsModule {}
