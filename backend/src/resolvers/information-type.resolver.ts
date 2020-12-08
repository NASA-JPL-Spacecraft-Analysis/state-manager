import { Resolver, Query, Arg, Mutation, Args } from 'type-graphql';

import { CollectionIdArgs, IdArgs } from '../args';
import { CreateInformationTypesInput } from '../inputs';
import { InformationType } from '../models';
import { ValidationService } from '../service';

@Resolver()
export class InformationTypeResolver {
  constructor(
    private readonly validationService: ValidationService
  ) {}

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
  public informationType(@Args() { id }: IdArgs): Promise<InformationType | undefined> {
    return InformationType.findOne({
      where: {
        id
      }
    });
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
