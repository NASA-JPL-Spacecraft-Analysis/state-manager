import { UserInputError } from 'apollo-server';
import { Service } from 'typedi';
import { GroupService } from '.';

import { ErrorConstants } from '../constants';
import { IdentifierType, Relationship } from '../models';

@Service()
export class ValidationService {
  constructor(
    private readonly groupService: GroupService
  ) { }

  /**
   * Checks all of a collections groups and relationships to see if the items can be deleted.
   *
   * @param items The list of items that we are trying to delete.
   * @param collectionId The collection id the items are part of.
   * @returns An exception if the items cannot be deleted, or true if they can.
   */
  public async canBeDeleted(items: IdentifierType[], collectionId: string): Promise<boolean> {
    const relationshipSet = new Set();

    const relationships = await Relationship.find({
      where: {
        collectionId
      }
    });

    // Create a set of every item id that is in a relationship.
    for (const relationship of relationships) {
      relationshipSet.add(relationship.subjectTypeId);
      relationshipSet.add(relationship.targetTypeId);
    }

    await this.isItemInGroup(items, collectionId);

    for (const item of items) {
      if (relationshipSet.has(item.id)) {
        throw new UserInputError(ErrorConstants.itemInRelationshipError(item.identifier, item.type));
      }
    }

    return true;
  }

  public async canRelationshipsBeDeleted(relationships: Relationship[], collectionId: string): Promise<boolean> {
    await this.isItemInGroup(relationships, collectionId);

    return true;
  }

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
   * @param identifier The identifier of the new/updated id.
   * @param type The type of the item we're checking.
   */
  public isDuplicateIdentifier(items: IdentifierType[], identifier: string, type: string | undefined): boolean {
    for (const item of items) {
      if (item.identifier === identifier && item.type === type) {
        throw new UserInputError(ErrorConstants.duplicateIdentifierError(identifier));
      }
    }

    return false;
  }

  private async isItemInGroup(items: IdentifierType[] | Relationship[], collectionId: string): Promise<boolean> {
    const groupSet = new Set();

    // Create a set of every item id that is in a group.
    for (const group of await this.groupService.getGroupMappingsByCollectionId(collectionId)) {
      const groupMappings = await this.groupService.getGroupMappings(group.id);

      groupMappings.map((groupMapping) => groupSet.add(groupMapping.itemId));
    }

    for (const item of items) {
      if (groupSet.has(item.id)) {
        if (item instanceof Relationship) {
          throw new UserInputError(ErrorConstants.itemInGroupError(item.displayName, 'relationship'));
        } else {
          throw new UserInputError(ErrorConstants.itemInGroupError(item.identifier, item.type));
        }
      }
    }

    return false;
  }
}
