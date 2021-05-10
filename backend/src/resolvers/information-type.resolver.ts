import { Resolver, Query, Arg, Mutation, Args } from 'type-graphql';
import { getConnection } from 'typeorm';

import { CollectionIdArgs, IdentifierArgs } from '../args';
import { CreateInformationTypesInput } from '../inputs';
import { InformationType } from '../models';
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
      this.validationService.checkInformationType(data.informationTypes);

      informationType.collectionId = data.collectionId;
    }

    const informationTypes = InformationType.create(data.informationTypes);

    for (const informationType of informationTypes) {
      await informationType.save();
    }

    return informationTypes;
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
