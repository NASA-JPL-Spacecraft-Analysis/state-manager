import { Resolver, Query, Arg, Mutation, Args } from 'type-graphql';
import { getConnection } from 'typeorm';

import { CollectionIdArgs, CollectionIdTypeArgs, IdentifierArgs, TypeArgs } from '../args';
import { CreateInformationTypesInput } from '../inputs';
import { InformationType, informationTypes } from '../models';
import { SharedRepository } from '../repositories';
import { DeleteItemResponse, DeleteItemsResponse, InformationTypeResponse } from '../responses';
import { ValidationService } from '../service';

@Resolver()
export class InformationTypeResolver {
  private sharedRepository: SharedRepository<InformationType>;

  constructor(
    private readonly validationService: ValidationService
  ) {
    this.sharedRepository = new SharedRepository<InformationType>(getConnection(), InformationType, validationService);
  }

  @Mutation(() => InformationTypeResponse)
  public async createInformationTypes(@Arg('data') data: CreateInformationTypesInput): Promise<InformationTypeResponse> {
    try {
      for (const informationType of data.informationTypes) {
        informationType.collectionId = data.collectionId;
      }

      const informationTypeList = InformationType.create(data.informationTypes);

      this.validationService.hasValidType(informationTypeList, informationTypes);

      for (const informationType of informationTypeList) {
        await informationType.save();
      }

      return {
        informationTypes: informationTypeList,
        message: 'Information Types Created',
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
  public async deleteAllInformationTypes(@Args() { collectionId }: CollectionIdArgs): Promise<DeleteItemsResponse> {
    return this.sharedRepository.deleteAll(collectionId);
  }

  @Mutation(() => DeleteItemResponse)
  public deleteInformationType(@Args() { collectionId, identifier, type }: TypeArgs): Promise<DeleteItemResponse> {
    return this.sharedRepository.deleteByIdentifierAndType(collectionId, identifier, type);
  }

  @Mutation(() => DeleteItemsResponse)
  public deleteInformationTypesByType(@Args() { collectionId, type }: CollectionIdTypeArgs): Promise<DeleteItemsResponse> {
    return this.sharedRepository.deleteByCollectionIdAndType(collectionId, type, informationTypes);
  }

  @Query(() => InformationType)
  public informationType(@Args() { collectionId, id, identifier }: IdentifierArgs): Promise<InformationType | undefined> {
    return this.sharedRepository.getOne(collectionId, id, identifier);
  }

  @Query(() => [ InformationType ])
  public informationTypes(@Args() { collectionId }: CollectionIdArgs): Promise<InformationType[]> {
    return InformationType.find({
      where: {
        collectionId
      }
    });
  }
}
