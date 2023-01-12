import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import {
  Command,
  CommandArgument,
  CommandArgumentEnumeration
} from '../models';

@Resolver(() => CommandArgument)
export class CommandArgumentResolver implements ResolverInterface<CommandArgument> {
  @FieldResolver(() => Command)
  public async command(@Root() commandArgument: CommandArgument): Promise<Command | undefined> {
    return Command.findOne({
      where: {
        id: commandArgument.commandId
      }
    });
  }

  @FieldResolver(() => [CommandArgumentEnumeration])
  public async enumerations(
    @Root() commandArgument: CommandArgument
  ): Promise<CommandArgumentEnumeration[]> {
    return CommandArgumentEnumeration.find({
      where: {
        commandArgumentId: commandArgument.id
      }
    });
  }
}
