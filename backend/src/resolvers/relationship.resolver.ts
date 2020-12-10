import { Resolver, Query, ResolverInterface, FieldResolver, Root, Args, Mutation, Arg } from 'type-graphql';
import { UserInputError } from 'apollo-server';

import { CollectionIdArgs, IdArgs } from '../args';
import { CreateRelationshipInput, CreateRelationshipsInput, UpdateRelationshipInput } from '../inputs';
import { Relationship, IdentifierType, InformationTypeEnum, InformationType, Event, State, RelationshipHistory } from '../models';

@Resolver(() => Relationship)
export class RelationshipResolver implements ResolverInterface<Relationship> {
  @Mutation(() => Relationship)
  public async createRelationship(@Arg('data') data: CreateRelationshipInput): Promise<Relationship> {
    const relationship = Relationship.create(data);
    await relationship.save();

    this.createRelationshipHistory(relationship);

    return relationship;
  }

  @Mutation(() => [ Relationship ])
  public async createRelationships(@Arg('data') data: CreateRelationshipsInput): Promise<Relationship[]> {
    for (const relationship of data.relationships) {
      relationship.collectionId = data.collectionId;

      const subject = await this.getSubjectOrTarget(relationship.subjectType,
        { collectionId: data.collectionId, identifier: relationship.subjectIdentifier });
      const target = await this.getSubjectOrTarget(relationship.targetType,
        { collectionId: data.collectionId, identifier: relationship.targetIdentifier });

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
  public relationship(@Args() { id }: IdArgs): Promise<Relationship | undefined> {
    return Relationship.findOne({
      where: {
        id
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

  @FieldResolver()
  public async subject(@Root() relationship: Relationship): Promise<IdentifierType | undefined> {
    return this.getSubjectOrTarget(relationship.subjectType, { id: relationship.subjectTypeId });
  }

  @FieldResolver()
  public async target(@Root() relationship: Relationship): Promise<IdentifierType | undefined> {
    return this.getSubjectOrTarget(relationship.targetType, { id: relationship.targetTypeId });
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
    const relationshipHistory = RelationshipHistory.create(relationship);
    relationshipHistory.relationshipId = relationship.id;
    relationshipHistory.updated = new Date();

    relationshipHistory.save();
  }

  /**
   * Finds the subject or target of the relationship based on id or identifier.
   * @param type The type of the thing we're looking for.
   * @param id The optional id of the thing we're looking for.
   * @param identifier The optional identifier of the thing we're looking for.
   */
  private async getSubjectOrTarget<T extends IdentifierType | undefined>(
    type: InformationTypeEnum, args: { collectionId?: string, id?: string, identifier?: string }
  ): Promise<T | undefined> {
    switch (type) {
      case InformationTypeEnum.Activity: {
        return await InformationType.findOne(args) as T;
      }
      case InformationTypeEnum.Command: {
        return await InformationType.findOne(args) as T;
      }
      case InformationTypeEnum.Event: {
        return await Event.findOne(args) as T;
      }
      case InformationTypeEnum.FSWParameter: {
        return await InformationType.findOne(args) as T;
      }
      case InformationTypeEnum.FlightRule: {
        return await InformationType.findOne(args) as T;
      }
      case InformationTypeEnum.Model: {
        return await State.findOne(args) as T;
      }
      case InformationTypeEnum.State: {
        return await State.findOne(args) as T;
      }
      default:
        return undefined;
    }
  }
}
