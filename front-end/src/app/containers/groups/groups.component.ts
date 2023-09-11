import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgModule,
  OnDestroy
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { GroupsSidenavModule, GroupsTableModule } from 'src/app/components/groups';
import {
  getCommandMap,
  getConstraintMap,
  getEventMap,
  getGroupIdentifierMap,
  getGroupMap,
  getGroups,
  getInformationTypeMap,
  getIsLoading,
  getIsSaving,
  getSelectedCollectionId,
  getSelectedGroup,
  getShowSidenav,
  getStates
} from 'src/app/selectors';
import {
  CommandMap,
  ConstraintMap,
  EventMap,
  Group,
  IdentifierMap,
  InformationTypeMap,
  StateMap
} from 'src/app/models';
import { GroupActions, LayoutActions, ToastActions } from 'src/app/actions';
import { UploadConstants } from 'src/app/constants';
import { getItemNameOrIdentifier } from '../../functions/helpers';
import { LoadingModule } from '../../components/loading/loading.component';
import { MenuModule } from '../../components/menu/menu.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-groups',
  styleUrls: ['groups.component.css'],
  templateUrl: 'groups.component.html'
})
export class GroupsComponent implements OnDestroy {
  public isLoading: boolean;
  public isSaving: boolean;
  public commandMap: CommandMap;
  public constraintMap: ConstraintMap;
  public eventMap: EventMap;
  public getItemNameOrIdentifierFunc = getItemNameOrIdentifier;
  public group: Group;
  public groupIdentifierMap: IdentifierMap;
  public groupMap: Record<string, Group>;
  public groupNameMap: IdentifierMap;
  public groups: Group[];
  public informationTypeMap: InformationTypeMap;
  public showGroupsSidemenu: boolean;
  public showSidenav: boolean;
  public selectedCollectionId: string;
  public selectedGroup: Group;
  public stateMap: StateMap;

  private subscriptions: SubSink;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry,
    private store: Store<AppState>
  ) {
    this.iconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg')
    );
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getIsLoading)).subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getIsSaving)).subscribe((isSaving) => {
        this.isSaving = isSaving;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getCommandMap)).subscribe((commandMap) => {
        this.commandMap = commandMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getConstraintMap)).subscribe((constraintMap) => {
        this.constraintMap = constraintMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getEventMap)).subscribe((eventMap) => {
        this.eventMap = eventMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getGroupMap)).subscribe((groupMap) => {
        this.groupMap = groupMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getGroupIdentifierMap)).subscribe((groupIdentifierMap) => {
        this.groupIdentifierMap = groupIdentifierMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getGroups)).subscribe((groups) => {
        this.groups = groups;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getInformationTypeMap)).subscribe((informationTypeMap) => {
        this.informationTypeMap = informationTypeMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getShowSidenav)).subscribe((showSidenav) => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCollectionId)).subscribe((selectedCollectionId) => {
        this.selectedCollectionId = selectedCollectionId;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedGroup)).subscribe((group) => {
        this.group = group;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStates)).subscribe((stateMap) => {
        this.stateMap = stateMap;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
    this.store.dispatch(
      LayoutActions.openFileUploadDialog({
        collectionId: this.selectedCollectionId,
        csvFormat: [
          UploadConstants.groupCsvUploadFormat,
          UploadConstants.groupMappingCsvUploadFormat
        ],
        dialogType: 'Group',
        jsonFormat: UploadConstants.groupJsonUploadFormat
      })
    );
  }

  public onGroupSelected(group?: Group): void {
    this.store.dispatch(
      GroupActions.setSelectedGroup({
        group
      })
    );

    this.store.dispatch(
      LayoutActions.toggleSidenav({
        showSidenav: true
      })
    );

    this.selectedGroup = group;
  }

  public onSidenavOutput(group?: Group): void {
    // Group will be undefined if the user closes the sidenav using the X or the cancel button.
    if (!group) {
      this.store.dispatch(
        LayoutActions.toggleSidenav({
          showSidenav: false
        })
      );
    } else {
      // Group.id will be undefined if the user is creating a new group.
      if (!group.id) {
        this.store.dispatch(
          GroupActions.createGroup({
            collectionId: this.selectedCollectionId,
            group
          })
        );
      } else {
        // Otherwise the user is updating an existing group.
        this.store.dispatch(
          GroupActions.updateGroup({
            collectionId: this.selectedCollectionId,
            group
          })
        );
      }
    }

    this.selectedGroup = group;
  }
}

@NgModule({
  declarations: [GroupsComponent],
  exports: [GroupsComponent],
  imports: [CommonModule, GroupsSidenavModule, GroupsTableModule, LoadingModule, MenuModule]
})
export class GroupsModule {}
