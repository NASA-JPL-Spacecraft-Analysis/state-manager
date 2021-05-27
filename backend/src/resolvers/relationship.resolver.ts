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

@Resolver(() => Relationship)
export class RelationshipResolver implements ResolverInterface<Relationship> {
  @Mutation(() => Relationship)
  public async createRelationship(@Arg('data') data: CreateRelationshipInput): Promise<Relationship> {
    const relationship: Relationship = Relationship.create(data);
    await relationship.save();

    this.createRelationshipHistory(relationship);

    return relationship;
  }

  @Mutation(() => [ Relationship ])
  public async createRelationships(@Arg('data') data: CreateRelationshipsInput): Promise<Relationship[]> {
    for (const relationship of data.relationships) {
      relationship.collectionId = data.collectionId;

      const subject = await this.getSubjectOrTarget(data.collectionId, relationship.subjectType, undefined, relationship.subjectIdentifier);
      const target = await this.getSubjectOrTarget(data.collectionId, relationship.targetType, undefined, relationship.targetIdentifier);

      if (!subject) {
        throw new UserInputError(`Subject with provided identifier: ${relationship.subjectIdentifier} does not exist.`);
      }

      if (!target) {
        throw new UserInputError(`Target with provided identifier: ${relationship.targetIdentifier} does not exist.`);
      }

      relationship.subjectTypeId = subject.id;
      relationship.targetTypeId = target.id;
    }

    const relationships = Relationship.create(data.relationships);

    for (const relationship of relationships) {
      await relationship.save();

      this.createRelationshipHistory(relationship);
    }

    return relationships;
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

  @Mutation(() => Relationship)
  public async updateRelationship(@Arg('data') data: UpdateRelationshipInput): Promise<Relationship> {
    const relationship = await this.relationship({ id: data.id });

    // If we can't find a relationship with the given ID, error.
    if (!relationship) {
      throw new UserInputError(`Relationship with provided id ${data.id} not found`);
    }

    Object.assign(relationship, data);
    await relationship.save();

    this.createRelationshipHistory(relationship);

    return relationship;
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
