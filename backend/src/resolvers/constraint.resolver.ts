import { UserInputError } from 'apollo-server-errors';
import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';

import { CollectionIdArgs, IdentifierArgs } from '../args';
import { ConstraintConstants } from '../constants';
import { CreateConstraintInput, UpdateConstraintInput } from '../inputs';
import { Constraint, ConstraintHistory, constraintTypes } from '../models';
import { SharedRepository } from '../repositories';
import { ConstraintResponse } from '../responses';
import { ValidationService } from '../service';

@Resolver()
export class ConstraintResolver {
  private sharedRepository: SharedRepository<Constraint>;

  constructor(
    private readonly validationService: ValidationService
  ) {
    this.sharedRepository = new SharedRepository<Constraint>(getConnection(), Constraint);
  }

  @Query(() => Constraint)
  public constraint(@Args() { collectionId, id, identifier }: IdentifierArgs): Promise<Constraint | undefined> {
    return this.sharedRepository.getOne(collectionId, id, identifier);
  }

  @Query(() => [ ConstraintHistory ])
  public constraintHistory(@Args() { collectionId }: CollectionIdArgs): Promise<ConstraintHistory[]> {
    return ConstraintHistory.find({
      where: {
        collectionId
      }
    });
  }

  @Query(() => [ Constraint ])
  public constraints(@Args() { collectionId }: CollectionIdArgs): Promise<Constraint[]> {
    return Constraint.find({
      where: {
        collectionId
      }
    });
  }

  @Mutation(() => ConstraintResponse)
  public async createConstraint(@Arg('data') data: CreateConstraintInput): Promise<ConstraintResponse> {
    try {
      this.validationService.isDuplicateIdentifier(
        await this.constraints({ collectionId: data.collectionId }), data.identifier);

      const constraint = Constraint.create(data);

      this.validationService.hasValidType([ constraint ], constraintTypes);

      await constraint.save();

      this.createConstraintHistory(constraint);

      return {
        constraint,
        message: 'Constraint Created',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => ConstraintResponse)
  public async updateConstraint(@Arg('data') data: UpdateConstraintInput): Promise<ConstraintResponse> {
    try {
      const constraint = await this.constraint({ id: data.id });

      if (!constraint) {
        throw new UserInputError(ConstraintConstants.constraintNotFoundError(data.id));
      }

      this.validationService.isDuplicateIdentifier(
        await this.constraints({ collectionId: constraint.collectionId}), data.identifier, constraint.id);

      Object.assign(constraint, data);

      this.validationService.hasValidType([ constraint ], constraintTypes);

      await constraint.save();

      this.createConstraintHistory(constraint);

      return {
        constraint,
        message: 'Constraint Updated',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  private createConstraintHistory(constraint: Constraint): void {
    // Create a new ConstraintHistory and omit the Constraint's ID property.
    const constraintHistory = ConstraintHistory.create({
      collectionId: constraint.collectionId,
      constraintId: constraint.id,
      description: constraint.description,
      displayName: constraint.displayName,
      editable: constraint.editable,
      externalLink: constraint.externalLink,
      identifier: constraint.identifier,
      type: constraint.type,
      updated: new Date()
    });

    void constraintHistory.save();
  }
}
