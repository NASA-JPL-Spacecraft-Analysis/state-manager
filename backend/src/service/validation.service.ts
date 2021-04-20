import { UserInputError } from 'apollo-server';
import { Service } from 'typedi';

import { CreateInformationTypeInput } from '../inputs';
import { IdentifierType, InformationTypeEnum } from '../models';

@Service()
export class ValidationService {
  /**
   * Looks at the passed information types and makes sure all their types are included in our enum.
   *
   * @param informationTypes The list of infomration types we're checking.
   */
  public checkInformationType(informationTypes: CreateInformationTypeInput[]): boolean | undefined {
    for (const informationType of informationTypes) {
      if (!Object.values(InformationTypeEnum).includes(informationType.informationType)) {
        throw new UserInputError(
          `An invalid information type was passed for ${String(informationType.displayName)}, please fix this value and try again`);
      }
    }

    return true;
  }

  /**
   * Checks to make sure we're not saving a duplicate identifier.
   *
   * @param items The list of our current items that have identifiers.
   * @param id The optional id that we're updating.
   * @param identifier The identifier of the new/updated id.
   */
  public isDuplicateIdentifier(items: IdentifierType[], identifier: string | undefined, id?: string): boolean {
    for (const item of items) {
      if (item.id !== id && item.identifier === identifier) {
        throw new UserInputError(`Duplicate identifier ${identifier} provided, please provide a unique identiifer and try again`);
      }
    }

    return false;
  }
}
