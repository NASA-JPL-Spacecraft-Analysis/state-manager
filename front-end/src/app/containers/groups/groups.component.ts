import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy, } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';
import { getEventMap, getGroups, getInformationTypes, getSelectedCollectionId, getSelectedGroup, getShowSidenav, getStates } from 'src/app/selectors';
import { GroupsSidenavModule } from 'src/app/components/groups';
import { EventMap, Group, InformationTypesMap, StateMap } from 'src/app/models';
import { GroupActions, LayoutActions, ToastActions } from 'src/app/actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'groups',
  styleUrls: [ 'groups.component.css' ],
  templateUrl: 'groups.component.html'
})
export class GroupsComponent implements OnDestroy {
  public eventMap: EventMap;
  public group: Group;
  public groups: Group[];
  public groupNameMap: Map<string, string>;
  public informationTypesMap: InformationTypesMap;
  public showSidenav: boolean;
  public selectedCollectionId: string;
  public stateMap: StateMap;

  private subscriptions: SubSink;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) {
    this.subscriptions = new SubSink();
    this.groupNameMap = new Map();

    this.subscriptions.add(
      this.store.pipe(select(getEventMap)).subscribe(eventMap => {
        this.eventMap = eventMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getGroups)).subscribe(groups => {
        this.groups = groups;

        for (const group of groups) {
          this.groupNameMap.set(group.name, group.collectionId);
        }

        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getInformationTypes)).subscribe(informationTypesMap => {
        this.informationTypesMap = informationTypesMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getShowSidenav)).subscribe(showSidenav => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCollectionId)).subscribe(selectedCollectionId => {
        this.selectedCollectionId = selectedCollectionId;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedGroup)).subscribe(group => {
        this.group = group;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStates)).subscribe(stateMap => {
        this.stateMap = stateMap;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onDuplicateGroupName(duplicateGroupName: boolean): void {
    if (duplicateGroupName) {
      this.store.dispatch(
        ToastActions.showToast({
          message: 'Please provide a unique group name',
          toastType: 'error'
        })
      );
    }
  }

  public onModifyGroup(group?: Group): void {
    if (group) {
      this.store.dispatch(GroupActions.setSelectedGroup({
        group
      }))
    }

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onSidenavOutput(group: Group): void {
    console.log(group);
    if (group === undefined) {
      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: false
      }));
    } else {
      if (!group.id) {
        this.store.dispatch(GroupActions.createGroup({
          collectionId: this.selectedCollectionId,
          group
        }));
      } else {
        this.store.dispatch(GroupActions.updateGroup({
          group
        }));
      }
    }
  }
}

@NgModule({
  declarations: [
    GroupsComponent
  ],
  exports: [
    GroupsComponent
  ],
  imports: [
    CommonModule,
    GroupsSidenavModule,
    MaterialModule
  ]
})
export class GroupsModule {}
