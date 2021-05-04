import { UserInputError } from 'apollo-server-errors';
import { Service } from 'typedi';
import { ErrorConstants } from '../constants';

import { Event, IdentifierTypeUnion, InformationType, State } from '../models';

@Service()
export class IdentifierTypeService {
  // TODO: See if we can add memoization so that we cache results without each class handling that.
  public async findItemByIdentifierAndType(collectionId: string, identifier: string, type: string): Promise<typeof IdentifierTypeUnion> {
    let item: typeof IdentifierTypeUnion | undefined;

    switch (type) {
      case Event.name:
        item = await Event.findOne({
          where: {
            collectionId,
            identifier
          }
        });
      case State.name:
        item = await State.findOne({
          where: {
            collectionId,
            identifier
          }
        });
      case InformationType.name:
        item = await InformationType.findOne({
          where: {
            collectionId,
            identifier
          }
        });
    }

    if (!item) {
      throw new UserInputError(ErrorConstants.itemNotFoundError(identifier, type));
    }

    return item;
  }
}
