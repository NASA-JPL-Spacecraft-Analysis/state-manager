import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import {
  CommandArgument,
  CommandArgumentEnumeration
} from '../models';

@Resolver(() => CommandArgument)
export class CommandArgumentResolver implements ResolverInterface<CommandArgument> {
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
