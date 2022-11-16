import { MaterialModule } from 'src/app/material';
import { CommandArgument } from 'src/app/models';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-command-argument-display',
  styleUrls: ['command-argument-form.display.css'],
  templateUrl: 'command-argument-form.display.html'
})
export class CommandArgumentDisplay implements OnChanges {
  ngOnChanges();
}
