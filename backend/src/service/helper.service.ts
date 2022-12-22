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
  public async findItemByType(collectionId: string, itemType: string, id?: string, identifier?: string):
    Promise<typeof AllTypesUnion | undefined> {
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
        case 'Command Argument': {
          return await CommandArgument.findOne({ id });
        }
        case 'Command Argument Enumeration': {
          return await CommandArgumentEnumeration.findOne({ id });
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
        case 'Information Type': {
          return await InformationType.findOne(query);
        }
        case 'State': {
          return await State.findOne(query);
        }
        case 'State Enumeration': {
          return await StateEnumeration.findOne({ id });
        }
      }
    }

    if (identifier) {
      throw new UserInputError(ErrorConstants.itemNotFoundError(identifier, itemType));
    } else if (id) {
      throw new UserInputError(ErrorConstants.itemNotFoundIdError(id));
    }
  }
}
