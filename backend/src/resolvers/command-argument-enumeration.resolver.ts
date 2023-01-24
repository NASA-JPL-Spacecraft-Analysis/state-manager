import { Args, FieldResolver, Query, Resolver, ResolverInterface, Root } from 'type-graphql';

import { CollectionIdArgs } from '../args';
import { Command, CommandArgument, CommandArgumentEnumeration } from '../models';

@Resolver(() => CommandArgumentEnumeration)
export class CommandArgumentEnumerationResolver implements ResolverInterface<CommandArgumentEnumeration> {
  @FieldResolver(() => Command)
  public async command(@Root() commandArgumentEnumeration: CommandArgumentEnumeration): Promise<Command | undefined> {
    const commandArgument = await this.commandArgument(commandArgumentEnumeration);

    return Command.findOne({
      where: {
        id: commandArgument?.commandId
      }
    });
  }

  @FieldResolver(() => CommandArgument)
  public async commandArgument(@Root() commandArgumentEnumeration: CommandArgumentEnumeration): Promise<CommandArgument | undefined> {
    return CommandArgument.findOne({
      where: {
        id: commandArgumentEnumeration.commandArgumentId
      }
    });
  }

  @Query(() => [CommandArgumentEnumeration])
  public async commandArgumentEnumerations(@Args() { collectionId }: CollectionIdArgs): Promise<CommandArgumentEnumeration[]> {
    return CommandArgumentEnumeration.find({
      where: {
        collectionId
      }
    });
  }
}
