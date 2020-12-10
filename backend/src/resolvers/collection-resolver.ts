import { Resolver, Query, Arg, Mutation, FieldResolver, ResolverInterface, Root, Args } from 'type-graphql';
import { UserInputError } from 'apollo-server';

import { IdArgs } from '../args';
import { Collection, Response, State } from '../models';
import { CreateCollectionInput, UpdateCollectionInput} from '../inputs';

@Resolver(() => Collection)
export class CollectionResolver implements ResolverInterface<Collection> {
  @Mutation(() => Collection)
  public async createCollection(@Arg('data') data: CreateCollectionInput): Promise<Collection> {
    const collection = Collection.create(data);
    await collection.save();

    return collection;
  }

  /**
   * Marks the collection as disabled, will error if the user tries to delete
   * an already deleted collection.
   * @param id The id of the collection we're deleting.
   */
  @Mutation(() => Boolean)
  public async deleteCollection(@Args() { id }: IdArgs): Promise<Response> {
    const collection = await Collection.findOne({
      where: {
        enabled: true,
        id
      }
    });

    if (!collection) {
      throw new UserInputError(`Collection with provided id ${id} not found`);
    }

    collection.enabled = false;
    collection.save();

    return {
      success: true
    };
  }

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
   * @param id The id of the collection we're updating.
   */
  @Mutation(() => Collection)
  public async updateCollection(@Arg('data') data: UpdateCollectionInput): Promise<Collection> {
    const collection = await Collection.findOne({
      where: {
        id: data.id
      }
    });

    if (!collection) {
      throw new UserInputError(`Collection with provided id ${data.id} not found`);
    }

    Object.assign(collection, data);
    await collection.save();

    return collection;
  }
}
