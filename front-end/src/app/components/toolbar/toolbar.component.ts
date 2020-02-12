import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

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
    MatButtonModule,
    MatToolbarModule,
    RouterModule
  ]
})
export class ToolbarModule {}
