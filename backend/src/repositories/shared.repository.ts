import { UserInputError } from 'apollo-server-errors';
import { Connection, ObjectType, Repository } from 'typeorm';
import { ErrorConstants } from '../constants';

import { IdentifierType } from '../models';
import { DeleteItemResponse, DeleteItemsResponse } from '../responses';
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

  /**
   * Deletes ALL items of a given type and collection id.
   *
   * @param collectionId The collection id of the items we are deleting.
   * @returns A list of deleted item ids.
   */
  public async deleteAll(collectionId: string): Promise<DeleteItemsResponse> {
    try {
      const items = await this.find({
        where: {
          collectionId
        }
      });

      const deletedIds = await this.deleteItems(items, collectionId);

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

  /**
   * Deletes ALL items of a given collection id and type.
   *
   * @param collectionId The collection id of the items we are deleting.
   * @param type The type of the items we are deleting.
   * @param validTypes A list of valid types.
   * @returns A list of deleted item ids.
   */
  public async deleteByCollectionIdAndType(collectionId: string, type: string, validTypes: Set<string>): Promise<DeleteItemsResponse> {
    try {
      if (!validTypes.has(type)) {
        throw new UserInputError(`Type: ${type} is not valid for ${this.entity.name}s`);
      }

      const items = await this.find({
        where: {
          collectionId,
          type
        }
      });

      const deletedIds = await this.deleteItems(items, collectionId);

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

  /**
   * Deletes a single item from the database.
   *
   * @param collectionId The collectionId of the item.
   * @param identifier The item's identifier.
   * @param type The type of the item.
   * @returns The deleted item's id wrapped in a response.
   */
  public async deleteByIdentifierAndType(collectionId: string, identifier: string, type: string): Promise<DeleteItemResponse> {
    try {
      const item = await this.findOne({
        where: {
          collectionId,
          identifier,
          type
        }
      });

      if (!item) {
        throw new UserInputError(ErrorConstants.itemNotFoundError(identifier, type));
      }

      const id = item.id;

      await item.remove();

      return {
        deletedId: id,
        message: `${this.entity.name} deleted successfully`,
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

  /**
   * Checks to see if the passed list of items can be deleted, and then deletes them.
   *
   * @param items The list of items we are trying to delete.
   * @param collectionId The collection id of the items we're trying to delete.
   * @returns A list of ids that were deleted.
   */
  private async deleteItems(items: T[], collectionId: string): Promise<string[]> {
    await this.validationService.canBeDeleted(items, collectionId);

    const deletedIds: string[] = [];

    for (const item of items) {
      deletedIds.push(item.id);
    }

    void this.createQueryBuilder()
      .delete()
      .where('id IN (:...ids)', { ids: deletedIds })
      .execute();

    return deletedIds;
  }
}
