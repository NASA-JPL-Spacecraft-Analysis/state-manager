import { Service } from 'typedi';

import { AllTypesUnion, Command, CommandArgument, Constraint, Event, Group, GroupMapping, GroupMappingUnion, InformationType, State, StateEnumeration } from '../models';

@Service()
export class GroupService {
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

    if (groupIds.length > 0) {
      return GroupMapping.createQueryBuilder('groupMapping')
        .where('groupMapping.groupId in (:...groupIds)', { groupIds })
        .getMany();
    }

    return [];
  }

  public async getItemByMapping(groupMapping: GroupMapping): Promise<typeof AllTypesUnion | undefined> {
    const command = await Command.findOne({ where: { id: groupMapping.itemId } });

    if (command) {
      return command;
    }

    const commandArgument = await CommandArgument.findOne({ where: { id: groupMapping.itemId } });

    if (commandArgument) {
      return commandArgument;
    }

    const constraint = await Constraint.findOne({ where: { id: groupMapping.itemId } });

    if (constraint) {
      return constraint;
    }

    const event = await Event.findOne({ where: { id: groupMapping.itemId } });

    if (event) {
      return event;
    }

    const group = await Group.findOne({ where: { id: groupMapping.itemId } });

    if (group) {
      return group;
    }

    const informationType = await InformationType.findOne({ where: { id: groupMapping.itemId } });

    if (informationType) {
      return informationType;
    }

    const state = await State.findOne({ where: { id: groupMapping.itemId } });

    if (state) {
      return state;
    }

    const stateEnumeration = await StateEnumeration.findOne({ where: { id: groupMapping.itemId } });

    if (stateEnumeration) {
      return stateEnumeration;
    }

    return undefined;
  }
}
