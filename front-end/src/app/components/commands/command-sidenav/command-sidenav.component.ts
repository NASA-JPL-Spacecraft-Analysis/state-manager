import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output } from '@angular/core';

import { Command } from 'src/app/models';
import { CommandArgumentDisplayModule } from '../command-argument-display/command-argument-display.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'command-sidenav',
  styleUrls: ['command-sidenav.component.css'],
  templateUrl: 'command-sidenav.component.html'
})
export class CommandSidenavComponent {
  @Input() public command: Command;

  @Output() public closeSidenav: EventEmitter<boolean>;

  constructor() {
    this.closeSidenav = new EventEmitter();
  }

  public onCancel(): void {
    this.closeSidenav.emit(true);
  }
}

@NgModule({
  declarations: [
    CommandSidenavComponent
  ],
  exports: [
    CommandSidenavComponent
  ],
  imports: [
    CommandArgumentDisplayModule,
    CommonModule
  ]
})
export class CommandSidenavModule { }
