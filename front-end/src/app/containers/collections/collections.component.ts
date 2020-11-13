import { Component, ChangeDetectionStrategy, OnDestroy, NgModule, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';
import { CollectionActions } from 'src/app/actions';
import { CollectionMap } from 'src/app/models';
import { getCollectionMap, getSelectedCollectionId } from 'src/app/selectors';
import { CollectionInputModule } from 'src/app/components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'collections',
  styleUrls: [ 'collections.component.css' ],
  templateUrl: 'collections.component.html'
})
export class CollectionComponent implements OnDestroy {
  public collectionMap: CollectionMap;
  public collectionName: string;
  public deleting: boolean;
  public editing: boolean;
  public selectedCollectionId: number;

  private subscriptions: SubSink;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.matIconRegistry.addSvgIcon('add', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
    this.matIconRegistry.addSvgIcon('delete', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg'));
    this.matIconRegistry.addSvgIcon('done', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/done.svg'));
    this.matIconRegistry.addSvgIcon('edit', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'));

    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getCollectionMap)).subscribe(collectionMap => {
        this.collectionMap = collectionMap;

        if (this.selectedCollectionId) {
          this.setCollectioName();
        }

        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCollectionId)).subscribe(selectedCollectionId => {
        this.selectedCollectionId = Number(selectedCollectionId);

        if (this.collectionMap) {
          this.setCollectioName();
        }

        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onCollectionChange(collectionId: number): void {
    // Don't try and do anything if we don't have a valid collectionId.
    if (collectionId) {
      this.store.dispatch(CollectionActions.setSelectedCollection({
        id: collectionId
      }));

      this.router.navigate([ 'collection/' + collectionId + '/' + this.router.url.split('/').pop() ]);
    }
  }

  public onCollectionInputOutput(collectionName: string): void {
    this.editing = false;

    if (collectionName) {
      if (this.selectedCollectionId && collectionName !== this.collectionMap[this.selectedCollectionId].name) {
        this.store.dispatch(CollectionActions.updateCollection({
          collectionId: this.selectedCollectionId,
          name: collectionName
        }));
      } else {
        this.store.dispatch(CollectionActions.createCollection({
          name: collectionName
        }));
      }
    }
  }

  public onCreateNewCollection(): void {
    this.selectedCollectionId = null;

    this.toggleEditing();
  }

  public onDeleteCollection(): void {
    this.deleting = true;

    this.store.dispatch(CollectionActions.deleteCollection({
      id: this.selectedCollectionId,
      name: this.collectionMap[this.selectedCollectionId].name
    }));

    setTimeout(() => {
      this.deleting = false;
    });
  }

  public onEditCollection(): void {
    this.toggleEditing();
  }

  private setCollectioName(): void {
    this.collectionName = this.collectionMap[this.selectedCollectionId]?.name;
  }

  private toggleEditing(): void {
    this.editing = true;

    this.changeDetectorRef.markForCheck();
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
    CollectionInputModule,
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class CollectionModule {}
