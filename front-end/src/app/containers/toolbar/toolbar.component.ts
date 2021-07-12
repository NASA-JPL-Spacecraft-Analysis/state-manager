import { Component, NgModule, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { MatIconRegistry } from '@angular/material/icon';
import { SubSink } from 'subsink';

import { MaterialModule } from 'src/app/material';
import { AppState } from 'src/app/app-store';
import { getSelectedCollectionId } from 'src/app/selectors';
import { CollectionModule } from '../collections/collections.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toolbar',
  styleUrls: [ 'toolbar.component.css' ],
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent implements OnDestroy {
  public eventPageActive: boolean;
  public relationshipPageActive: boolean;
  public selectedCollectionId: string;
  public statePageActive: boolean;

  private subscriptions = new SubSink();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.matIconRegistry.addSvgIcon('help', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/help.svg'));
    this.matIconRegistry.addSvgIcon('more_vert', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/more_vert.svg'));

    this.subscriptions.add(
      this.store.pipe(select(getSelectedCollectionId)).subscribe(selectedCollectionId => {
        this.selectedCollectionId = selectedCollectionId;
        this.changeDetectorRef.markForCheck();
      }),
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const splitRoute = event.url.split('/');
          const route = splitRoute[splitRoute.length - 1];

          this.eventPageActive = route === 'events' || route === 'event-history';
          this.relationshipPageActive = route === 'relationships' || route === 'relationship-history';
          this.statePageActive = route === 'states' || route === 'state-history';
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
    CollectionModule,
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class ToolbarModule {}
