import { UserInputError } from 'apollo-server';
import { Service } from 'typedi';

import { ErrorConstants } from '../constants';
import { IdentifierType } from '../models';

@Service()
export class ValidationService {
  /**
   * Checks each item and ensures that they all have a valid type.
   *
   * @param items The list of items.
   * @param types A set of valid types.
   * @returns True if each item in the list has a valid type.
   */
  public hasValidType(items: IdentifierType[], types: Set<string>): boolean {
    for (const item of items) {
      if (!types.has(item.type)) {
        throw new UserInputError(ErrorConstants.invalidTypesError(item.identifier, types));
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
        throw new UserInputError(ErrorConstants.duplicateIdentifierError(identifier));
      }
    }

    return false;
  }
}
