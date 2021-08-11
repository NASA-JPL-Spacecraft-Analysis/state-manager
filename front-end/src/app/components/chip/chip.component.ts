import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { MaterialModule } from 'src/app/material';

interface ChipItem {
  id: string;
  text: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'chip',
  styleUrls: [ 'chip.component.css' ],
  templateUrl: 'chip.component.html'
})
export class ChipComponent implements OnInit {
  @Input() public id: string;
  @Input() public text: string;

  @Output() public removed: EventEmitter<ChipItem>;

  public item: ChipItem;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.removed = new EventEmitter<ChipItem>();

    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));
  }

  public ngOnInit(): void {
    this.item = {
      id: this.id,
      text: this.text
    };
  }

  public onRemove(): void {
    this.removed.emit(this.item);
  }
}

@NgModule({
  declarations: [
    ChipComponent
  ],
  exports: [
    ChipComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
})
export class ChipModule {}
