import { NgModule, Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { TestString } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'data-display',
  styleUrls: [ 'data-display.component.css' ],
  templateUrl: 'data-display.component.html'
})
export class DataDisplayComponent implements OnInit {
  @Input() public items: TestString[];

  public selected: string;

  public ngOnInit(): void {
    console.log(this.items);
  }
}

@NgModule({
  declarations: [
    DataDisplayComponent
  ],
  exports: [
    DataDisplayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class DataDisplayModule {}
