import { Component, NgModule, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { MatIconRegistry } from '@angular/material/icon';
import { SubSink } from 'subsink';

import { MaterialModule } from 'src/app/material';
import { AppState } from 'src/app/app-store';
import { getCollectionMap } from 'src/app/selectors';
import { CollectionMap } from 'src/app/models';
import { CollectionActions } from 'src/app/actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'toolbar',
  styleUrls: [ 'toolbar.component.css' ],
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent implements OnDestroy {
  public collectionMap: CollectionMap;

  private subscriptions = new SubSink();

  constructor(private store: Store<AppState>,
              private changeDetectorRef: ChangeDetectorRef,
              private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.addSvgIcon('more_vert', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/more_vert.svg'));

    this.subscriptions.add(
      this.store.pipe(select(getCollectionMap)).subscribe(collectionMap => {
        this.collectionMap = collectionMap;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onCollectionChange(id: number): void {
    this.store.dispatch(CollectionActions.setSelectedCollection({ id }));
  }
}

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class ToolbarModule {}
