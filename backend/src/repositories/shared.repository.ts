import { UserInputError } from 'apollo-server-errors';
import { Connection, ObjectType, Repository } from 'typeorm';

import { IdentifierType } from '../models';
import { DeleteItemsResponse } from '../responses';
import { ValidationService } from '../service';

export class SharedRepository<T extends IdentifierType> extends Repository<T> {
  private entity: ObjectType<T>;
  private validationService: ValidationService;

  constructor(
    connection: Connection,
    entity: ObjectType<T>,
    validationService: ValidationService) {
    super();

    this.entity = entity;
    this.validationService = validationService;

    Object.assign(this, {
      manager: connection.manager,
      metadata: connection.getMetadata(entity),
      queryRunner: connection.manager.queryRunner,
    });
  }

  public async deleteAll(collectionId: string): Promise<DeleteItemsResponse> {
    try {
      const items = await this.find({
        where: {
          collectionId
        }
      });

      await this.validationService.canBeDeleted(items, collectionId);

      const deletedIds: string[] = [];

      for (const item of items) {
        deletedIds.push(item.id);

        await item.remove();
      }

      return {
        deletedIds,
        message: `${this.entity.name}s deleted successfully`,
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  public async getOne(collectionId?: string, id?: string, identifier?: string): Promise<T | undefined> {
    if (!collectionId && !id && !identifier) {
      throw new UserInputError('You must provide some search criteria');
    }

    if (id) {
      return this.findOne({
        where: {
          id
        }
      });
    }

    if (!collectionId || !identifier) {
      throw new UserInputError('If you don\'t provide an ID, you must provide both a collectionId and identifier');
    }

    const item = await this.findOne({
      where: {
        collectionId,
        identifier
      }
    });

    if (!item) {
      throw new UserInputError(`A ${this.entity.name} with the given parameters: [${collectionId}, ${identifier}] could not be found`);
    }

    return item;
  }
}
