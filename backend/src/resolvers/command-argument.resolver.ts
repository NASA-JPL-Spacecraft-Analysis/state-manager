import { Args, FieldResolver, Query, Resolver, ResolverInterface, Root } from 'type-graphql';

import { CollectionIdArgs } from '../args';
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

  @Query(() => [CommandArgument])
  public async commandArgument(@Args() { collectionId }: CollectionIdArgs): Promise<CommandArgument[]> {
    return CommandArgument.find({
      where: collectionId
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
