import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelationshipSidenavModule } from '../relationship-sidenav/relationship-sidenav.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationships',
  styleUrls: [ 'relationships.component.css' ],
  templateUrl: 'relationships.component.html'
})
export class RelationshipsComponent {

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
    RelationshipSidenavModule
  ]
})
export class RelationshipsModule {}
