import { NgModule, Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-faq',
  styleUrls: [ 'faq.component.css' ],
  templateUrl: 'faq.component.html'
})
export class FaqComponent {
  public url: string;

  constructor() {
    this.url = window.location.origin + '/state-management/api/v1';
  }
}

@NgModule({
  declarations: [
    FaqComponent
  ],
  exports: [
    FaqComponent
  ],
  imports: [
    MaterialModule
  ]
})
export class FaqModule {}
