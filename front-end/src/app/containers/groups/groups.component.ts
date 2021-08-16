import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy, } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';
import { GroupsMenuModule, GroupsSidenavModule } from 'src/app/components/groups';
import { getEventMap, getGroupIdentifierMap, getShowGroupsSidemenu, getGroupMap, getGroups, getInformationTypeMap, getSelectedCollectionId, getSelectedGroup, getShowSidenav, getStates } from 'src/app/selectors';
import { EventMap, Group, GroupMap, IdentifierMap, InformationTypeMap, StateMap } from 'src/app/models';
import { GroupActions, LayoutActions, ToastActions } from 'src/app/actions';
import { UploadConstants } from 'src/app/constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'groups',
  styleUrls: [ 'groups.component.css' ],
  templateUrl: 'groups.component.html'
})
export class GroupsComponent implements OnDestroy {
  public eventMap: EventMap;
  public group: Group;
  public groupIdentifierMap: IdentifierMap;
  public groupMap: GroupMap;
  public groupNameMap: IdentifierMap;
  public groups: Group[];
  public informationTypeMap: InformationTypeMap;
  public showGroupsSidemenu: boolean;
  public showSidenav: boolean;
  public selectedCollectionId: string;
  public stateMap: StateMap;

  private subscriptions: SubSink;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry,
    private store: Store<AppState>
  ) {
    this.iconRegistry.addSvgIcon('delete', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg'));
    this.subscriptions = new SubSink();
    this.groupIdentifierMap = {};

    this.subscriptions.add(
      this.store.pipe(select(getEventMap)).subscribe(eventMap => {
        this.eventMap = eventMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getGroupMap)).subscribe(groupMap => {
        this.groupMap = { ...groupMap };
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getGroupIdentifierMap)).subscribe(groupIdentifierMap => {
        this.groupIdentifierMap = groupIdentifierMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getGroups)).subscribe(groups => {
        this.groups = groups;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getInformationTypeMap)).subscribe(informationTypeMap => {
        this.informationTypeMap = informationTypeMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getShowGroupsSidemenu)).subscribe(showGroupsSidemenu => {
        this.showGroupsSidemenu = showGroupsSidemenu;
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

  public onCloseSidemenu(): void {
    this.store.dispatch(
      LayoutActions.toggleGroupsSidemenu({
        showGroupsSidemenu: !this.showGroupsSidemenu
      })
    );
  }

  public onDeleteGroup(): void {
    if (this.group) {
      this.store.dispatch(
        GroupActions.deleteGroup({
          group: this.group
        })
      );
    }
  }

  public onShowError(error: string): void {
    this.store.dispatch(
      ToastActions.showToast({
        message: error,
        toastType: 'error'
      })
    );
  }

  public onFileUpload(): void {
    this.store.dispatch(LayoutActions.openFileUploadDialog({
      collectionId: this.selectedCollectionId,
      csvFormat: [ UploadConstants.groupCsvUploadFormat, UploadConstants.groupMappingCsvUploadFormat ],
      dialogType: 'Group',
      jsonFormat: UploadConstants.groupJsonUploadFormat
    }));
  }

  public onGroupSelected(group?: Group): void {
    this.store.dispatch(GroupActions.setSelectedGroup({
      group
    }))

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onSidenavOutput(group: Group): void {
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
          collectionId: this.selectedCollectionId,
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
    GroupsMenuModule,
    GroupsSidenavModule,
    MaterialModule
  ]
})
export class GroupsModule {}
