import { UserInputError } from 'apollo-server';
import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';

import { CollectionIdArgs, IdentifierArgs } from '../args';
import { CommandConstants } from '../constants';
import { CreateCommandInput, UpdateCommandInput } from '../inputs';
import { Command, CommandHistory, commandTypes } from '../models';
import { SharedRepository } from '../repositories';
import { CommandResponse } from '../responses';
import { ValidationService } from '../service';

@Resolver()
export class CommandResolver {
  private sharedRepository: SharedRepository<Command>;

  constructor(
    private readonly validationService: ValidationService
  ) {
    this.sharedRepository = new SharedRepository<Command>(getConnection(), Command);
  }

  @Query(() => Command)
  public command(@Args() { collectionId, id, identifier }: IdentifierArgs): Promise<Command | undefined> {
    return this.sharedRepository.getOne(collectionId, id, identifier);
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
      const command = Command.create(data);

      this.validationService.hasValidType([ command ], commandTypes);

      await command.save();

      this.createCommandHistory(command);

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

  @Mutation(() => CommandResponse)
  public async updateCommand(@Arg('data') data: UpdateCommandInput): Promise<CommandResponse> {
    try {
      const command = await this.command({ id: data.id });

      if (!command) {
        throw new UserInputError(CommandConstants.commandNotFoundError(data.id));
      }

      this.validationService.isDuplicateIdentifier(
        await this.commands({ collectionId: command.collectionId}), data.identifier, command.id);

      Object.assign(command, data);

      this.validationService.hasValidType([ command ], commandTypes);

      await command.save();

      this.createCommandHistory(command);

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
}
