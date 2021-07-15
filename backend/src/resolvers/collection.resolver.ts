import { Resolver, Query, Arg, Mutation, FieldResolver, ResolverInterface, Root, Args } from 'type-graphql';
import { UserInputError } from 'apollo-server';

import { IdArgs } from '../args';
import { Collection, Constraint, Event, Group, InformationType, Relationship, State } from '../models';
import { CreateCollectionInput, UpdateCollectionInput} from '../inputs';
import { CollectionResponse, Response } from './../responses';
import { CollectionConstants } from '../constants';

@Resolver(() => Collection)
export class CollectionResolver implements ResolverInterface<Collection> {
  /**
   * Returns a list of enabled collections.
   */
  @Query(() => [ Collection ])
  public collections(): Promise<Collection[]> {
    return Collection.find({
      where: {
        enabled: true
      }
    });
  }

  @FieldResolver()
  public async constraints(@Root() collection: Collection): Promise<Constraint[]> {
    return Constraint.find({
      where: {
        collectionId: collection.id
      }
    });
  }

  @Mutation(() => CollectionResponse)
  public async createCollection(@Arg('data') data: CreateCollectionInput): Promise<CollectionResponse> {
    try {
      const collection = Collection.create(data);
      await collection.save();

      return {
        collection,
        message: 'Collection Created',
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
   * Marks the collection as disabled, will error if the user tries to delete
   * an already deleted collection.
   *
   * @param id The id of the collection we're deleting.
   */
  @Mutation(() => Response)
  public async deleteCollection(@Args() { id }: IdArgs): Promise<Response> {
    const collection = await Collection.findOne({
      where: {
        enabled: true,
        id
      }
    });

    if (!collection) {
      throw new UserInputError(CollectionConstants.collectionNotFoundError(id));
    }

    collection.enabled = false;
    void collection.save();

    return {
      message: 'Collection Deleted',
      success: true
    };
  }

  @FieldResolver()
  public async groups(@Root() collection: Collection): Promise<Group[]> {
    return Group.find({
      where: {
        collectionId: collection.id
      }
    });
  }

  @FieldResolver()
  public async events(@Root() collection: Collection): Promise<Event[]> {
    return Event.find({
      where: {
        collectionId: collection.id
      }
    });
  }

  @FieldResolver()
  public async informationTypes(@Root() collection: Collection): Promise<InformationType[]> {
    return InformationType.find({
      where: {
        collectionId: collection.id
      }
    });
  }

  @FieldResolver()
  public async relationships(@Root() collection: Collection): Promise<Relationship[]> {
    return Relationship.find({
      where: {
        collectionId: collection.id
      }
    });
  }

  @FieldResolver()
  public async states(@Root() collection: Collection): Promise<State[]> {
    return State.find({
      where: {
        collectionId: collection.id
      }
    });
  }

  /**
   * Updates a single collection. Will error if the collection with the given id doesn't
   * exist.
   *
   * @param id The id of the collection we're updating.
   */
  @Mutation(() => CollectionResponse)
  public async updateCollection(@Arg('data') data: UpdateCollectionInput): Promise<CollectionResponse> {
    try {
      const collection = await Collection.findOne({
        where: {
          id: data.id
        }
      });

      if (!collection) {
        throw new UserInputError(CollectionConstants.collectionNotFoundError(data.id));
      }

      Object.assign(collection, data);
      await collection.save();

      return {
        collection,
        message: 'Collection Created',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }
}
