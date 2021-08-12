import { UserInputError } from 'apollo-server';
import { Arg, Args, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { getConnection } from 'typeorm';

import { CollectionIdArgs, IdentifierArgs } from '../args';
import { CommandConstants } from '../constants';
import {
  CreateCommandArgumentsInput,
  CreateCommandInput,
  CreateCommandsInput,
  DeleteArgumentsInput,
  ModifyCommandArgument,
  UpdateCommandInput
} from '../inputs';
import { Command, CommandArgument, CommandArgumentHistory, CommandHistory, commandTypes } from '../models';
import { SharedRepository } from '../repositories';
import { CommandArgumentResponse, CommandResponse, CommandsResponse, DeleteArgumentResponse } from '../responses';
import { ValidationService } from '../service';

@Resolver(() => Command)
export class CommandResolver implements ResolverInterface<Command> {
  private sharedRepository: SharedRepository<Command>;

  constructor(
    private readonly validationService: ValidationService
  ) {
    this.sharedRepository = new SharedRepository<Command>(getConnection(), Command);
  }

  @FieldResolver(() => [ CommandArgument ])
  public async arguments(@Root() command: Command): Promise<CommandArgument[]> {
    return CommandArgument.find({
      where: {
        commandId: command.id
      }
    });
  }

  @Query(() => Command)
  public command(@Args() { collectionId, id, identifier }: IdentifierArgs): Promise<Command | undefined> {
    return this.sharedRepository.getOne(collectionId, id, identifier);
  }

  @Query(() => [ CommandArgumentHistory ])
  public commandArgumentHistory(@Args() { collectionId }: CollectionIdArgs): Promise<CommandArgumentHistory[]> {
    return CommandArgumentHistory.find({
      where: {
        collectionId
      },
      order: {
        updated: 'DESC'
      }
    });
  }

  @Query(() => [ CommandArgument ])
  public commandArguments(@Arg('commandId') commandId: string): Promise<CommandArgument[]> {
    return CommandArgument.find({
      where: {
        commandId
      }
    });
  }

  @Query(() => [ CommandHistory ])
  public commandHistory(@Args() { collectionId }: CollectionIdArgs): Promise<CommandHistory[]> {
    return CommandHistory.find({
      where: {
        collectionId
      }
    });
  }

  @Query(() => [ Command ])
  public commands(@Args() { collectionId }: CollectionIdArgs): Promise<Command[]> {
    return Command.find({
      where: {
        collectionId
      }
    });
  }

  @Mutation(() => CommandResponse)
  public async createCommand(@Arg('data') data: CreateCommandInput): Promise<CommandResponse> {
    try {
      this.validationService.isDuplicateIdentifier(await this.commands({ collectionId: data.collectionId }), data.identifier);

      const command = Command.create(data);

      // TODO: For now hardcore this value, there aren't any other options for commands.
      command.type = 'command';

      await command.save();

      this.createCommandHistory(command);

      command.arguments = await this.saveCommandArguments(data.arguments, command.id);

      return {
        command,
        message: 'Command Created',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => CommandArgumentResponse)
  public async createCommandArguments(@Arg('data') data: CreateCommandArgumentsInput): Promise<CommandArgumentResponse> {
    try {
      const commandArguments: CommandArgument[] = [];

      for (const argument of data.commandArguments) {
        const command = await this.command({ collectionId: data.collectionId, identifier: argument.commandIdentifier });

        if (!command) {
          throw new UserInputError(CommandConstants.commandNotFoundIdentifierError(argument.commandIdentifier));
        }

        const commandArgument = CommandArgument.create({
          collectionId: command.collectionId,
          commandId: command.id,
          name: argument.name,
          sortOrder: argument.sortOrder
        });

        await commandArgument.save();

        this.createCommandArgumentHistory(commandArgument);

        commandArguments.push(commandArgument);
      }

      return {
        commandArguments,
        message: 'Command Arguments Created',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => CommandsResponse)
  public async createCommands(@Arg('data') data: CreateCommandsInput): Promise<CommandsResponse> {
    try {
      const existingCommands = await this.commands({ collectionId: data.collectionId });

      for (const command of data.commands) {
        this.validationService.isDuplicateIdentifier(existingCommands, command.identifier);
      }

      const commands = Command.create(data.commands);

      for (const command of commands) {
        // TODO: For now hardcore this value, there aren't any other options for commands.
        command.type = 'command';

        await command.save();

        this.createCommandHistory(command);
      }

      return {
        commands,
        message: 'Commands Created',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => DeleteArgumentResponse)
  public async deleteArguments(@Arg('data') data: DeleteArgumentsInput): Promise<DeleteArgumentResponse> {
    try {
      const commandArguments = await CommandArgument.find({
        where: {
          commandId: data.commandId
        }
      });

      if (!commandArguments || commandArguments.length === 0) {
        throw new UserInputError(CommandConstants.commandArgumentsNotFound(data.commandId));
      }

      const deletedIds: string[] = [];

      for (const id of data.deletedArgumentIds) {
        const argument = commandArguments.find((e) => e.id === id);

        if (!argument) {
          throw new UserInputError(CommandConstants.argumentNotFoundError(id));
        }

        deletedIds.push(argument.id);

        await argument.remove();
      }

      return {
        deletedArgumentIds: deletedIds,
        message: 'Arguments deleted successfully',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => CommandResponse)
  public async updateCommand(@Arg('data') data: UpdateCommandInput): Promise<CommandResponse> {
    try {
      const command = await this.command({ id: data.id });

      if (!command) {
        throw new UserInputError(CommandConstants.commandNotFoundIdError(data.id));
      }

      // TODO: For now hardcore this value, there aren't any other options for commands.
      command.type = 'command';

      this.validationService.isDuplicateIdentifier(
        await this.commands({ collectionId: command.collectionId}), data.identifier, command.id);

      Object.assign(command, data);

      this.validationService.hasValidType([ command ], commandTypes);

      await command.save();

      this.createCommandHistory(command);

      command.arguments = await this.saveCommandArguments(data.arguments, command.id);

      return {
        command,
        message: 'Command Updated',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  private createCommandArgumentHistory(commandArgument: CommandArgument): void {
    const commandArgumentHistory = CommandArgumentHistory.create({
      collectionId: commandArgument.collectionId,
      commandId: commandArgument.commandId,
      name: commandArgument.name,
      sortOrder: commandArgument.sortOrder,
      commandArgumentId: commandArgument.id,
      updated: new Date()
    });

    void commandArgumentHistory.save();
  }

  private createCommandHistory(command: Command): void {
    const commandHistory = CommandHistory.create({
      collectionId: command.collectionId,
      commandId: command.id,
      description: command.description,
      displayName: command.displayName,
      editable: command.editable,
      externalLink: command.externalLink,
      identifier: command.identifier,
      type: command.type,
      updated: new Date()
    });

    void commandHistory.save();
  }

  private async saveCommandArguments(commandArguments: ModifyCommandArgument[] | undefined, commandId: string): Promise<CommandArgument[]> {
    if (commandArguments) {
      for (const argument of commandArguments) {
        const commandArgument = CommandArgument.create(argument);
        commandArgument.commandId = commandId;

        await commandArgument.save();

        this.createCommandArgumentHistory(commandArgument);
      }
    }

    return this.commandArguments(commandId);
  }
}
