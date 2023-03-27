import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-loading',
  styleUrls: ['./loading.component.css'],
  templateUrl: './loading.component.html'
})
export class LoadingComponent {
  @Input() public isLoading: boolean;
  @Input() public isSaving: boolean;
}

@NgModule({
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
  imports: [CommonModule]
})
export class LoadingModule {}
