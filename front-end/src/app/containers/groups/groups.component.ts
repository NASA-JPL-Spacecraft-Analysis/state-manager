import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';
import { getGroups } from 'src/app/selectors';
import { Group } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'groups',
  styleUrls: [ 'groups.component.css' ],
  templateUrl: 'groups.component.html'
})
export class GroupsComponent implements OnDestroy {
  public groups: Group[];

  private subscriptions: SubSink;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getGroups)).subscribe(groups => {
        console.log(groups);
        console.log(groups.length);
        this.groups = groups;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onCreateNewGroup(): void {
    console.log('create');
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
    MaterialModule
  ]
})
export class GroupsModule {}
