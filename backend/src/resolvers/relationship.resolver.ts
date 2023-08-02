import {
  Resolver,
  Query,
  ResolverInterface,
  FieldResolver,
  Root,
  Args,
  Mutation,
  Arg
} from 'type-graphql';
import { UserInputError } from 'apollo-server';

import { CollectionIdArgs, IdArgs, IdentifierArgs } from '../args';
import {
  CreateRelationshipInput,
  CreateRelationshipsInput,
  UpdateRelationshipInput
} from '../inputs';
import { Relationship, RelationshipHistory } from '../models';
import {
  DeleteItemResponse,
  DeleteItemsResponse,
  RelationshipResponse,
  RelationshipsResponse
} from '../responses';
import { ErrorConstants, RelationshipConstants } from '../constants';
import { HelperService, ValidationService } from '../service';
import { AllTypesUnion } from '../models/all-types-union';

@Resolver(() => Relationship)
export class RelationshipResolver implements ResolverInterface<Relationship> {
  constructor(
    private readonly helperService: HelperService,
    private readonly validationService: ValidationService
  ) {}

  @Mutation(() => RelationshipResponse)
  public async createRelationship(
    @Arg('data') data: CreateRelationshipInput
  ): Promise<RelationshipResponse> {
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
  public async createRelationships(
    @Arg('data') data: CreateRelationshipsInput
  ): Promise<RelationshipsResponse> {
    try {
      for (const relationship of data.relationships) {
        relationship.collectionId = data.collectionId;

        const subject = await this.helperService.findItemByType(
          data.collectionId,
          relationship.subjectType,
          undefined,
          relationship.subjectIdentifier
        );
        const target = await this.helperService.findItemByType(
          data.collectionId,
          relationship.targetType,
          undefined,
          relationship.targetIdentifier
        );

        if (!subject) {
          throw new UserInputError(
            RelationshipConstants.subjectNotFoundError(relationship.subjectIdentifier)
          );
        }

        if (!target) {
          throw new UserInputError(
            RelationshipConstants.targetNotFoundError(relationship.targetIdentifier)
          );
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
  public async deleteAllRelationships(
    @Args() { collectionId }: CollectionIdArgs
  ): Promise<DeleteItemsResponse> {
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

  @Mutation(() => DeleteItemResponse)
  public async deleteRelationship(@Args() { id }: IdArgs): Promise<DeleteItemResponse> {
    try {
      const relationship = await Relationship.findOne({
        where: {
          id
        }
      });

      if (!relationship) {
        throw new UserInputError(ErrorConstants.itemNotFoundIdError(id));
      }

      await relationship.remove();

      return {
        deletedId: id,
        message: 'Relationship deleted',
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

  @Query(() => [RelationshipHistory])
  public relationshipHistory(
    @Args() { collectionId }: CollectionIdArgs
  ): Promise<RelationshipHistory[]> {
    return RelationshipHistory.find({
      where: {
        collectionId
      }
    });
  }

  @Query(() => [Relationship])
  public relationships(@Args() { collectionId }: CollectionIdArgs): Promise<Relationship[]> {
    return Relationship.find({
      where: {
        collectionId
      }
    });
  }

  @FieldResolver(() => AllTypesUnion)
  public async subject(
    @Root() relationship: Relationship
  ): Promise<typeof AllTypesUnion | undefined> {
    return this.helperService.findItemByType(
      relationship.collectionId,
      relationship.subjectType,
      relationship.subjectTypeId
    );
  }

  @FieldResolver(() => AllTypesUnion)
  public async target(
    @Root() relationship: Relationship
  ): Promise<typeof AllTypesUnion | undefined> {
    return this.helperService.findItemByType(
      relationship.collectionId,
      relationship.targetType,
      relationship.targetTypeId
    );
  }

  @Mutation(() => RelationshipResponse)
  public async updateRelationship(
    @Arg('data') data: UpdateRelationshipInput
  ): Promise<RelationshipResponse> {
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
      displayName: relationship.displayName,
      relationshipId: relationship.id,
      subjectToTargetDescription: relationship.subjectToTargetDescription,
      subjectType: relationship.subjectType,
      subjectTypeId: relationship.subjectTypeId,
      targetToSubjectDescription: relationship.targetToSubjectDescription,
      targetType: relationship.targetType,
      targetTypeId: relationship.targetTypeId,
      updated: new Date()
    });

    void relationshipHistory.save();
  }
}
