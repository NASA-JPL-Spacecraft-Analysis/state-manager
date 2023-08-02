import { UserInputError } from 'apollo-server';
import { Service } from 'typedi';
import { ErrorConstants } from '../constants';

import {
  AllTypesUnion,
  Command,
  CommandArgument,
  CommandArgumentEnumeration,
  Constraint,
  Event,
  Group,
  InformationType,
  State,
  StateEnumeration
} from '../models';

@Service()
export class HelperService {
  public async findItemByType(
    collectionId: string,
    itemType: string,
    id?: string,
    identifier?: string
  ): Promise<typeof AllTypesUnion | undefined> {
    if (id || identifier) {
      let query;

      if (id) {
        query = {
          id
        };
      } else {
        query = {
          collectionId,
          identifier
        };
      }

      switch (itemType) {
        case 'Command': {
          return await Command.findOne(query);
        }
        case 'CommandArgument': {
          if (id) {
            return await CommandArgument.findOne({ id });
          } else if (identifier) {
            return this.findNestedCommandSubType(collectionId, identifier, itemType);
          }
          break;
        }
        case 'CommandArgumentEnumeration': {
          if (id) {
            return await CommandArgumentEnumeration.findOne({ id });
          } else if (identifier) {
            return this.findNestedCommandSubType(collectionId, identifier, itemType);
          }
          break;
        }
        case 'Constraint': {
          return await Constraint.findOne(query);
        }
        case 'Event': {
          return await Event.findOne(query);
        }
        case 'Group': {
          return await Group.findOne(query);
        }
        case 'InformationType': {
          return await InformationType.findOne(query);
        }
        case 'State': {
          return await State.findOne(query);
        }
        case 'StateEnumeration': {
          if (id) {
            return await StateEnumeration.findOne({ id });
          } else if (identifier) {
            return this.findNestedStateSubType(collectionId, identifier, itemType);
          }
        }
      }
    }

    if (identifier) {
      throw new UserInputError(ErrorConstants.itemNotFoundError(identifier, itemType));
    } else if (id) {
      throw new UserInputError(ErrorConstants.itemNotFoundIdError(id));
    }
  }

  /**
   * There can be Command Arguments and Command Argument Enumerations that have the same identifier, so we need a way
   * to find deeply nested items inside of commands.
   *
   * @param identifier The nested identifier deliniated by dashes.
   * @param itemType The type of the thing we're trying to find.
   * @returns Either a CommandArgument or CommandArgumentEnumeration depending on what type the user is trying to locate.
   */
  private async findNestedCommandSubType(
    collectionId: string,
    identifier: string,
    itemType: string
  ): Promise<CommandArgument | CommandArgumentEnumeration> {
    const splitIdentifier = identifier.split('|');

    if (splitIdentifier && splitIdentifier.length > 0) {
      const command = await Command.findOne({
        collectionId,
        identifier: splitIdentifier[0].trim()
      });

      if (command) {
        const commandArgument = await CommandArgument.findOne({
          collectionId,
          commandId: command.id,
          name: splitIdentifier[1].trim()
        });

        // If we found a Command Argument and that was the type the user was looking for, return here.
        if (commandArgument) {
          if (itemType === 'CommandArgument') {
            return commandArgument;
          }

          // Otherwise keep looking for a Command Argument Enumeration.
          const commandArgumentEnumeration = await CommandArgumentEnumeration.findOne({
            collectionId,
            commandArgumentId: commandArgument.id,
            label: splitIdentifier[2].trim()
          });

          if (commandArgumentEnumeration) {
            return commandArgumentEnumeration;
          }
        }
      }
    }

    throw new UserInputError(ErrorConstants.itemNotFoundError(identifier, itemType));
  }

  /**
   * There can be State Enumerations that have the same identifier, so we need a way to find deeply nested enumerations inside of states.
   *
   * @param identifier The nested identifier deliniated by dashes.
   * @param itemType The type of the thing we're trying to find.
   * @returns The State Enumeration the user is trying to locate.
   */
  private async findNestedStateSubType(
    collectionId: string,
    identifier: string,
    itemType: string
  ): Promise<StateEnumeration> {
    const splitIdentifier = identifier.split('|');

    if (splitIdentifier && splitIdentifier.length > 0) {
      const state = await State.findOne({
        collectionId,
        identifier: splitIdentifier[0].trim()
      });

      if (state) {
        const stateEnumeration = await StateEnumeration.findOne({
          collectionId,
          stateId: state.id,
          label: splitIdentifier[1].trim()
        });

        if (stateEnumeration) {
          return stateEnumeration;
        }
      }
    }

    throw new UserInputError(ErrorConstants.itemNotFoundError(identifier, itemType));
  }
}
