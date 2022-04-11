import { UserInputError } from 'apollo-server';
import { Service } from 'typedi';

import { ErrorConstants } from '../constants';
import { Event, Group, GroupMapping, GroupMappingUnion, GroupType, InformationType, State } from '../models';

@Service()
export class GroupService {
  // TODO: See if we can add memoization so that we cache results without each class handling that.
  public async findGroupItem(collectionId: string, identifier: string, type: string): Promise<GroupType> {
    let item: GroupType | undefined;

    switch (type) {
    case Event.name:
      item = await Event.findOne({
        where: {
          collectionId,
          identifier
        }
      });
      break;
    case Group.name:
      item = await Group.findOne({
        where: {
          collectionId,
          identifier
        }
      });
      break;
    case InformationType.name:
      item = await InformationType.findOne({
        where: {
          collectionId,
          identifier
        }
      });
      break;
    case State.name:
      item = await State.findOne({
        where: {
          collectionId,
          identifier
        }
      });
      break;
    }


    if (!item) {
      throw new UserInputError(ErrorConstants.itemNotFoundError(identifier, type));
    }

    return item;
  }

  /**
   * Gets a list of group mappings, sorted ASC by their sortOrder.
   *
   * @param groupId The ID of the group we are getting the mappings for.
   * @returns A list of sorted group mappings.
   */
  public async getGroupMappings(groupId: string): Promise<GroupMapping[]> {
    return GroupMapping.find({
      where: {
        groupId
      },
      order: {
        sortOrder: 'ASC'
      }
    });
  }

  public async getGroupMappingsByCollectionId(collectionId: string): Promise<GroupMapping[]> {
    const groups = await Group.find({
      where: {
        collectionId
      }
    });

    const groupIds = groups.map((group) => group.id);

    return GroupMapping.createQueryBuilder('groupMapping')
      .where('groupMapping.groupId in (:...groupIds)', { groupIds })
      .getMany();
  }

  public async getItemByMapping(groupMapping: GroupMapping): Promise<typeof GroupMappingUnion | undefined> {
    const event = await Event.findOne({ where: { id: groupMapping.itemId }});

    if (event) {
      return event;
    }

    const group = await Group.findOne({ where: { id: groupMapping.itemId }});

    if (group) {
      return group;
    }

    const informationType = await InformationType.findOne({ where: { id: groupMapping.itemId }});

    if (informationType) {
      return informationType;
    }

    const state = await State.findOne({ where: { id: groupMapping.itemId }});

    if (state) {
      return state;
    }

    return undefined;
  }
}
