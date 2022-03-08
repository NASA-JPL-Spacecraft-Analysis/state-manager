import { UserInputError } from 'apollo-server-errors';
import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';

import { CollectionIdArgs, CollectionIdTypeArgs, IdentifierArgs, TypeArgs } from '../args';
import { ConstraintConstants } from '../constants';
import { CreateConstraintInput, CreateConstraintsInput, UpdateConstraintInput } from '../inputs';
import { Constraint, ConstraintHistory } from '../models';
import { SharedRepository } from '../repositories';
import { ConstraintResponse, ConstraintsResponse, DeleteItemResponse, DeleteItemsResponse } from '../responses';
import { ValidationService } from '../service';
import { DataTypesService } from '../service/data-types.service';

@Resolver()
export class ConstraintResolver {
  private sharedRepository: SharedRepository<Constraint>;

  constructor(
    private readonly dataTypesService: DataTypesService,
    private readonly validationService: ValidationService
  ) {
    this.sharedRepository = new SharedRepository<Constraint>(getConnection(), Constraint, validationService);
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
        await this.constraints({ collectionId: data.collectionId }), data.identifier, data.type);

      const constraint = Constraint.create(data);

      this.validationService.hasValidType([ constraint ], await this.dataTypesService.getDataType('constraint'));

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

  @Mutation(() => ConstraintsResponse)
  public async createConstraints(@Arg('data') data: CreateConstraintsInput): Promise<ConstraintsResponse> {
    try {
      const existingConstraints = await this.constraints({ collectionId: data.collectionId });

      // Check to make sure each constraint has a unique identifier.
      for (const constraint of data.constraints) {
        this.validationService.isDuplicateIdentifier(existingConstraints, constraint.identifier, constraint.type);
      }

      const constraints = Constraint.create(data.constraints);

      // Check to make sure each constraint has a valid type.
      this.validationService.hasValidType(constraints, await this.dataTypesService.getDataType('constraint'));

      for (const constraint of constraints) {
        await constraint.save();

        this.createConstraintHistory(constraint);
      }

      return {
        constraints,
        message: 'Constraints Created',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Query(() => [ String ])
  public async constraintTypes(): Promise<string[]> {
    return [ ...(await this.dataTypesService.getDataType('constraint')) ] as string[];
  }

  @Mutation(() => DeleteItemsResponse)
  public async deleteAllConstraints(@Args() { collectionId }: CollectionIdArgs): Promise<DeleteItemsResponse> {
    return this.sharedRepository.deleteAll(collectionId);
  }

  @Mutation(() => DeleteItemResponse)
  public deleteConstraint(@Args() { collectionId, identifier, type }: TypeArgs): Promise<DeleteItemResponse> {
    return this.sharedRepository.deleteByIdentifierAndType(collectionId, identifier, type);
  }

  @Mutation(() => DeleteItemsResponse)
  public async deleteConstraintsByType(@Args() { collectionId, type }: CollectionIdTypeArgs): Promise<DeleteItemsResponse> {
    return this.sharedRepository.deleteByCollectionIdAndType(collectionId, type, await this.dataTypesService.getDataType('constraint'));
  }

  @Mutation(() => ConstraintResponse)
  public async updateConstraint(@Arg('data') data: UpdateConstraintInput): Promise<ConstraintResponse> {
    try {
      const constraint = await this.constraint({ id: data.id });

      if (!constraint) {
        throw new UserInputError(ConstraintConstants.constraintNotFoundError(data.id));
      }

      // Remove the constraint we're updating from the list so we don't mark it as a duplicate identifier.
      let constraints = await this.constraints({ collectionId: constraint.collectionId });
      constraints = constraints.filter((s) => s.id !== constraint.id);

      this.validationService.isDuplicateIdentifier(constraints, data.identifier, data.type);

      Object.assign(constraint, data);

      this.validationService.hasValidType([ constraint ], await this.dataTypesService.getDataType('constraint'));

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
