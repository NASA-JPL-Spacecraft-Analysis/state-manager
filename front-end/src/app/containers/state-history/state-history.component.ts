import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-history',
  styleUrls: [ 'state-history.component.css' ],
  templateUrl: 'state-history.component.html'
})
export class StateHistoryComponent {

}

@NgModule({
  declarations: [
    StateHistoryComponent
  ],
  exports: [
    StateHistoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class StateHistoryModule {}
