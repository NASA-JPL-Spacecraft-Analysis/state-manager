import { Component, ChangeDetectionStrategy, OnDestroy, NgModule, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-store';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SubSink } from 'subsink';

import { MaterialModule } from 'src/app/material';
import { CollectionActions } from 'src/app/actions';
import { CollectionMap } from 'src/app/models';
import { getCollectionMap, getSelectedCollectionId } from 'src/app/selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'collections',
  styleUrls: [ 'collections.component.css' ],
  templateUrl: 'collections.component.html'
})
export class CollectionComponent implements OnDestroy {
  public collectionMap: CollectionMap;
  public selectedCollectionId: number;

  private subscriptions: SubSink;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getCollectionMap)).subscribe(collectionMap => {
        this.collectionMap = collectionMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCollectionId)).subscribe(selectedCollectionId => {
        this.selectedCollectionId = selectedCollectionId;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {

  }

  public onCollectionChange(collectionId: number): void {
    this.store.dispatch(CollectionActions.setSelectedCollection({
      id: collectionId
    }));

    this.router.navigate([ 'collection/' + collectionId + '/' + this.router.url.split('/').pop() ]);
  }
}

@NgModule({
  declarations: [
    CollectionComponent
  ],
  exports: [
    CollectionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class CollectionModule {}
