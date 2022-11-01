import { UserInputError } from 'apollo-server';
import { Arg, Args, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { getConnection } from 'typeorm';

import { CollectionIdArgs, CollectionIdTypeArgs, IdentifierArgs, TypeArgs } from '../args';
import { CommandConstants } from '../constants';
import {
  CreateCommandArgumentsInput,
  CreateCommandInput,
  CreateCommandsInput,
  DeleteArgumentsInput,
  ModifyCommandArgument,
  UpdateCommandInput
} from '../inputs';
import { Command, CommandArgument, CommandArgumentEnumeration,  CommandArgumentHistory, CommandHistory } from '../models';
import { SharedRepository } from '../repositories';
import {
  CommandArgumentResponse,
  CommandResponse,
  CommandsResponse,
  DeleteArgumentResponse,
  DeleteItemResponse,
  DeleteItemsResponse
} from '../responses';
import { ValidationService } from '../service';
import { DataTypesService } from '../service/data-types.service';

@Resolver(() => Command)
export class CommandResolver implements ResolverInterface<Command> {
  private sharedRepository: SharedRepository<Command>;

  constructor(
    private readonly dataTypesService: DataTypesService,
    private readonly validationService: ValidationService
  ) {
    this.sharedRepository = new SharedRepository<Command>(getConnection(), Command, validationService);
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
  public commandArguments(@Args() { collectionId }: CollectionIdArgs): Promise<CommandArgument[]> {
    return CommandArgument.find({
      where: {
        collectionId
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

  @Query(() => [ String ])
  public async commandTypes(): Promise<string[]> {
    return [ ...(await this.dataTypesService.getDataType('command')) ] as string[];
  }

  @Mutation(() => CommandResponse)
  public async createCommand(@Arg('data') data: CreateCommandInput): Promise<CommandResponse> {
    try {
      const command = Command.create(data);

      this.validationService.isDuplicateIdentifier(await this.commands({ collectionId: data.collectionId }), data.identifier, command.type);

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
        this.validationService.isDuplicateIdentifier(existingCommands, command.identifier, command.type);
      }

      const commands = Command.create(data.commands);

      this.validationService.hasValidType(commands, await this.dataTypesService.getDataType('command'));

      for (const command of commands) {
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

  @Mutation(() => DeleteItemsResponse)
  public async deleteAllCommands(@Args() { collectionId }: CollectionIdArgs): Promise<DeleteItemsResponse> {
    return this.sharedRepository.deleteAll(collectionId);
  }

  @Mutation(() => DeleteItemResponse)
  public deleteCommand(@Args() { collectionId, identifier, type }: TypeArgs): Promise<DeleteItemResponse> {
    return this.sharedRepository.deleteByIdentifierAndType(collectionId, identifier, type);
  }

  @Mutation(() => DeleteItemsResponse)
  public async deleteCommandsByType(@Args() { collectionId, type }: CollectionIdTypeArgs): Promise<DeleteItemsResponse> {
    return this.sharedRepository.deleteByCollectionIdAndType(collectionId, type, await this.dataTypesService.getDataType('command'));
  }

  @Mutation(() => CommandResponse)
  public async updateCommand(@Arg('data') data: UpdateCommandInput): Promise<CommandResponse> {
    try {
      const command = await this.command({ id: data.id });

      if (!command) {
        throw new UserInputError(CommandConstants.commandNotFoundIdError(data.id));
      }

      // Remove the command we're updating from the list so we don't mark it as a duplicate identifier.
      let commands = await this.commands({ collectionId: command.collectionId });
      commands = commands.filter((c) => c.id !== command.id);

      this.validationService.isDuplicateIdentifier(commands, command.identifier, command.type);

      Object.assign(command, data);

      this.validationService.hasValidType([ command ], await this.dataTypesService.getDataType('command'));

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
      updated: new Date(),
      version: command.version
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

    return CommandArgument.find({
      where: {
        commandId
      }
    });
  }
}

@Resolver(() => CommandArgument)
export class CommandArgumentResolver implements ResolverInterface<CommandArgument> {

  @FieldResolver(() => [ CommandArgumentEnumeration ])
  public async enumerations(@Root() commandArg: CommandArgument): Promise<CommandArgumentEnumeration[]> {
    return CommandArgumentEnumeration.find({
      where: {
        commandId: commandArg.commandId
      }
    });
  }
}
