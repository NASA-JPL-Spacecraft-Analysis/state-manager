import { Resolver, FieldResolver, Root, ResolverInterface } from 'type-graphql';

import { Relationship, IdentifierType } from '../models';

@Resolver(() => IdentifierType)
export class IdentifierTypeResolver implements ResolverInterface<IdentifierType> {
  @FieldResolver()
  public async relationships(@Root() identifierType: IdentifierType): Promise<Relationship[]> {
    // Find the relationships that the item is a part of.
    const relationships = await Relationship.find({
      where: [
        {
          subjectTypeId: identifierType.id
        },
        {
          targetTypeId: identifierType.id
        }
      ]
    });

    return relationships;
  }
}
