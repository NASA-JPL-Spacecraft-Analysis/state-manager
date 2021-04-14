import { UserInputError } from 'apollo-server-errors';
import { BaseEntity, Connection, ObjectType, Repository } from 'typeorm';

export class SharedRepository<T extends BaseEntity> extends Repository<T> {
  private entity: ObjectType<T>;

  constructor(connection: Connection, entity: ObjectType<T>) {
    super();

    this.entity = entity;

    Object.assign(this, {
      manager: connection.manager,
      metadata: connection.getMetadata(entity),
      queryRunner: connection.manager.queryRunner,
    });
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
      throw new UserInputError(`A ${this.entity.name} with the given parameters: [${collectionId}, ${identifier}] could not be found`)
    }

    return item;
  }
}
