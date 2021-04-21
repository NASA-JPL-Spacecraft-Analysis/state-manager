import { Service } from 'typedi';

import { Event, IdentifierTypeUnion, InformationType, State } from '../models';

@Service()
export class IdentifierTypeService {
  public async findItemByIdentifierAndType(collectionId: string, identifier: string, type: string): Promise<typeof IdentifierTypeUnion | undefined> {
    switch (type) {
      case Event.name:
        return Event.findOne({
          where: {
            collectionId,
            identifier
          }
        });
      case State.name:
        return State.findOne({
          where: {
            collectionId,
            identifier
          }
        });
      default:
        return InformationType.findOne({
          where: {
            collectionId,
            identifier
          }
        });
    }
  }
}
