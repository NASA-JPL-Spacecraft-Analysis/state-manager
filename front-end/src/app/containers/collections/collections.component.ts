import { Component, ChangeDetectionStrategy, OnDestroy, NgModule, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ROUTER_CONFIGURATION } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { CollectionActions } from 'src/app/actions';
import { CollectionMap } from 'src/app/models';
import { getCollectionMap, getSelectedCollectionId } from 'src/app/selectors';
import { CollectionInputModule } from 'src/app/components';
import { NavigationService } from '../../services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-collections',
  styleUrls: ['collections.component.css'],
  templateUrl: 'collections.component.html'
})
export class CollectionComponent implements OnDestroy {
  public collectionMap: CollectionMap;
  public collectionName: string;
  public currentCollectionId: string;
  public deleting: boolean;
  public editing: boolean;
  public selectedCollectionId: string;

  private subscriptions: SubSink;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private navigationService: NavigationService,
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
        this.selectedCollectionId = selectedCollectionId;
        this.currentCollectionId = selectedCollectionId;

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

  public onCollectionChange(collectionId: string): void {
    switch (collectionId) {
      case 'create':
        this.toggleEditing();
        this.selectedCollectionId = undefined;

        break;
      case 'delete':
        this.deleting = true;

        this.store.dispatch(CollectionActions.deleteCollection({
          id: this.currentCollectionId,
          name: this.collectionMap[this.currentCollectionId].name
        }));

        setTimeout(() => {
          this.deleting = false;
        });

        break;
      case 'edit':
        this.toggleEditing();
        this.selectedCollectionId = this.currentCollectionId;

        break;
      default:
        this.store.dispatch(CollectionActions.setSelectedCollection({
          id: collectionId
        }));

        const page = this.navigationService.getCurrentPageFromURL(this.router.url);

        if (page) {
          this.router.navigate(['collection/' + collectionId + '/' + page]);
        } else {
          this.router.navigate(['collection/' + collectionId]);
        }

        break;
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
    FormsModule,
    RouterModule
  ]
})
export class CollectionModule { }
