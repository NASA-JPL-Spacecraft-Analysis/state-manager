import { Resolver, Query, ResolverInterface, FieldResolver, Root, Args, Mutation, Arg } from 'type-graphql';
import { UserInputError } from 'apollo-server';

import { CollectionIdArgs, IdentifierArgs } from '../args';
import { CreateRelationshipInput, CreateRelationshipsInput, UpdateRelationshipInput } from '../inputs';
import {
  Relationship,
  InformationType,
  Event,
  State,
  RelationshipHistory,
  IdentifierTypeUnion,
  Constraint
} from '../models';
import { DeleteItemsResponse, RelationshipResponse, RelationshipsResponse } from '../responses';
import { RelationshipConstants } from '../constants';
import { ValidationService } from '../service';

@Resolver(() => Relationship)
export class RelationshipResolver implements ResolverInterface<Relationship> {
  constructor(
    private readonly validationService: ValidationService
  ) {}

  @Mutation(() => RelationshipResponse)
  public async createRelationship(@Arg('data') data: CreateRelationshipInput): Promise<RelationshipResponse> {
    try {
      const relationship: Relationship = Relationship.create(data);
      await relationship.save();

      this.createRelationshipHistory(relationship);

      return {
        message: 'Relationship Created',
        relationship,
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => RelationshipsResponse)
  public async createRelationships(@Arg('data') data: CreateRelationshipsInput): Promise<RelationshipsResponse> {
    try {
      for (const relationship of data.relationships) {
        relationship.collectionId = data.collectionId;

        const subject =
          await this.getSubjectOrTarget(data.collectionId, relationship.subjectType, undefined, relationship.subjectIdentifier);
        const target =
          await this.getSubjectOrTarget(data.collectionId, relationship.targetType, undefined, relationship.targetIdentifier);

        if (!subject) {
          throw new UserInputError(RelationshipConstants.subjectNotFoundError(relationship.subjectIdentifier));
        }

        if (!target) {
          throw new UserInputError(RelationshipConstants.targetNotFoundError(relationship.targetIdentifier));
        }

        relationship.subjectTypeId = subject.id;
        relationship.targetTypeId = target.id;
      }

      const relationships = Relationship.create(data.relationships);

      for (const relationship of relationships) {
        await relationship.save();

        this.createRelationshipHistory(relationship);
      }

      return {
        message: 'Relationships Created',
        relationships,
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => DeleteItemsResponse)
  public async deleteAllRelationships(@Args() { collectionId }: CollectionIdArgs): Promise<DeleteItemsResponse> {
    try {
      const relationships = await Relationship.find({
        where: {
          collectionId
        }
      });

      // Check to make sure each relationship can be deleted, otherwise throw an error.
      await this.validationService.canRelationshipsBeDeleted(relationships, collectionId);

      const deletedIds: string[] = [];

      for (const relationship of relationships) {
        deletedIds.push(relationship.id);

        await relationship.remove();
      }

      return {
        deletedIds,
        message: 'Relationships deleted successfully',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Query(() => Relationship)
  public relationship(@Args() { id }: IdentifierArgs): Promise<Relationship | undefined> {
    return Relationship.findOne({
      where: {
        id
      }
    });
  }

  @Query(() => [ RelationshipHistory ])
  public relationshipHistory(@Args() { collectionId }: CollectionIdArgs): Promise<RelationshipHistory[]> {
    return RelationshipHistory.find({
      where: {
        collectionId
      }
    });
  }

  @Query(() => [ Relationship ])
  public relationships(@Args() { collectionId }: CollectionIdArgs): Promise<Relationship[]> {
    return Relationship.find({
      where: {
        collectionId
      }
    });
  }

  @FieldResolver(() => IdentifierTypeUnion)
  public async subject(@Root() relationship: Relationship): Promise<typeof IdentifierTypeUnion | undefined> {
    return this.getSubjectOrTarget(
      relationship.collectionId,
      relationship.subjectType,
      relationship.subjectTypeId
    );
  }

  @FieldResolver(() => IdentifierTypeUnion)
  public async target(@Root() relationship: Relationship): Promise<typeof IdentifierTypeUnion | undefined> {
    return this.getSubjectOrTarget(
      relationship.collectionId,
      relationship.targetType,
      relationship.targetTypeId
    );
  }

  @Mutation(() => RelationshipResponse)
  public async updateRelationship(@Arg('data') data: UpdateRelationshipInput): Promise<RelationshipResponse> {
    try {
      const relationship = await this.relationship({ id: data.id });

      // If we can't find a relationship with the given ID, error.
      if (!relationship) {
        throw new UserInputError(RelationshipConstants.relationshipNotFoundError(data.id));
      }

      Object.assign(relationship, data);
      await relationship.save();

      this.createRelationshipHistory(relationship);

      return {
        message: 'Relationship Updated',
        relationship,
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  private createRelationshipHistory(relationship: Relationship): void {
    const relationshipHistory = RelationshipHistory.create({
      collectionId: relationship.collectionId,
      description: relationship.description,
      displayName: relationship.displayName,
      relationshipId: relationship.id,
      subjectType: relationship.subjectType,
      subjectTypeId: relationship.subjectTypeId,
      targetType: relationship.targetType,
      targetTypeId: relationship.targetTypeId,
      updated: new Date()
    });

    void relationshipHistory.save();
  }

  /**
   * Finds the subject or target of the relationship based on id or identifier.
   *
   * @param id The optional id of the thing we're looking for.
   * @param identifier The optional identifier of the thing we're looking for.
   */
  private async getSubjectOrTarget(collectionId: string, relationshipType: string, id?: string, identifier?: string):
    Promise<typeof IdentifierTypeUnion | undefined> {
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

      if (relationshipType === 'constraint') {
        const constraint = await Constraint.findOne(query);

        if (constraint) {
          return constraint;
        }
      }

      if (relationshipType === 'event') {
        const event = await Event.findOne(query);

        if (event) {
          return event;
        }
      }

      if (relationshipType === 'informationType') {
        const informationType = await InformationType.findOne(query);

        if (informationType) {
          return informationType;
        }
      }

      if (relationshipType === 'state') {
        const state = await State.findOne(query);

        if (state) {
          return state;
        }
      }
    }

    return undefined;
  }
}
