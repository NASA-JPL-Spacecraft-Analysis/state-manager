import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';

import { CommandArgument, CommandArgumentType } from '../../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-command-argument-display',
  styleUrls: ['command-argument-display.component.css'],
  templateUrl: 'command-argument-display.component.html'
})
export class CommandArgumentDisplayComponent implements OnChanges {
  @Input() public arguments: CommandArgument[];

  public readonly CommandArgumentType = CommandArgumentType;

  public enumerationsMap: Record<string, string[]>;
  public showArguments: boolean;

  public ngOnChanges(): void {
    this.arguments = [...this.arguments];
    this.arguments = this.arguments.sort((a, b) => a.sortOrder - b.sortOrder);

    this.enumerationsMap = {};

    for (const argument of this.arguments) {
      if (argument.enums) {
        this.enumerationsMap[argument.id] = argument.enums.split(',');
      }
    }

    console.log(this.enumerationsMap);
  }

  public onExpandArguments(): void {
    this.showArguments = !this.showArguments;
  }

  public splitEnums(enumString: string): string[] {
    return enumString.split(',');
  }

  public removeTrailingComma(enumVal: string): string {
    return enumVal.substring(0, enumVal.length - 1);
  }
}

@NgModule({
  declarations: [
    CommandArgumentDisplayComponent
  ],
  exports: [
    CommandArgumentDisplayComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommandArgumentDisplayModule { }
