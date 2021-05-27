import { Resolver, Query, Arg, Mutation, Args } from 'type-graphql';
import { getConnection } from 'typeorm';

import { CollectionIdArgs, IdentifierArgs } from '../args';
import { CreateInformationTypesInput } from '../inputs';
import { InformationType, informationTypes } from '../models';
import { SharedRepository } from '../repositories';
import { ValidationService } from '../service';

@Resolver()
export class InformationTypeResolver {
  private sharedRepository: SharedRepository<InformationType>;

  constructor(
    private readonly validationService: ValidationService
  ) {
    this.sharedRepository = new SharedRepository<InformationType>(getConnection(), InformationType);
  }

  @Mutation(() => [ InformationType ])
  public async createInformationTypes(@Arg('data') data: CreateInformationTypesInput): Promise<InformationType[]> {
    for (const informationType of data.informationTypes) {
      informationType.collectionId = data.collectionId;
    }

    const informationTypeList = InformationType.create(data.informationTypes);

    this.validationService.hasValidType(informationTypeList, informationTypes);

    for (const informationType of informationTypeList) {
      await informationType.save();
    }

    return informationTypeList;
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
