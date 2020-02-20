import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'toolbar',
  styleUrls: [ 'toolbar.component.css' ],
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent {}

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ],
  imports: [
    MaterialModule,
    RouterModule
  ]
})
export class ToolbarModule {}
