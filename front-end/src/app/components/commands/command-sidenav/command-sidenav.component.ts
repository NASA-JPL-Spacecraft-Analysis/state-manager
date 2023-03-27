import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output
} from '@angular/core';

import { Command } from 'src/app/models';
import { LoadingModule } from '../../loading/loading.component';
import { CommandArgumentDisplayModule } from '../command-argument-display/command-argument-display.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-command-sidenav',
  styleUrls: ['command-sidenav.component.css'],
  templateUrl: 'command-sidenav.component.html'
})
export class CommandSidenavComponent {
  @Input() public command: Command;
  @Input() public isSaving: boolean;

  @Output() public closeSidenav: EventEmitter<boolean>;

  constructor() {
    this.closeSidenav = new EventEmitter();
  }

  public onCancel(): void {
    this.closeSidenav.emit(true);
  }
}

@NgModule({
  declarations: [CommandSidenavComponent],
  exports: [CommandSidenavComponent],
  imports: [CommandArgumentDisplayModule, CommonModule, LoadingModule]
})
export class CommandSidenavModule {}
