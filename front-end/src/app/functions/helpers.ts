import {
  AutoCompleteType,
  IdentifierMap,
  IdentifierType,
  StringTMap,
  StateEnumerationMap,
  AutoCompleteSetType,
  CommandMap
} from '../models';

export const mapIdentifiers = (items: IdentifierType[]): IdentifierMap => {
  const itemIdentifierMap = {};

  for (const item of items) {
    if (!itemIdentifierMap[item.identifier]) {
      itemIdentifierMap[item.identifier] = [];
    }

    itemIdentifierMap[item.identifier].push({
      id: item.id,
      type: item.type
    });
  }

  return itemIdentifierMap;
};

export const mapItems = (items: IdentifierType[]): StringTMap<IdentifierType> => {
  const itemMap = {};

  for (const item of items) {
    itemMap[item.id] = item;
  }

  return itemMap;
};

export const populateItems = (
  itemList: AutoCompleteSetType,
  items: Record<string, AutoCompleteType>
): AutoCompleteSetType => {
  if (itemList && items) {
    for (const item of Object.values(items)) {
      itemList.add(item);
    }
  }

  return itemList;
};

export const populateItemsWithList = (
  itemList: AutoCompleteSetType,
  itemMap: StateEnumerationMap
): AutoCompleteSetType => {
  if (itemList && itemMap && Object.keys(itemMap).length > 0) {
    for (const newItemList of Object.values(itemMap)) {
      for (const item of newItemList) {
        itemList.add(item);
      }
    }
  }

  return itemList;
};

export const populateItemsWithCommandsAndChildren = (
  itemList: AutoCompleteSetType,
  commandMap: CommandMap
): AutoCompleteSetType => {
  if (itemList && commandMap && Object.keys(commandMap).length > 0) {
    for (const command of Object.values(commandMap)) {
      itemList.add(command);

      for (const commandArgument of command.arguments) {
        itemList.add(commandArgument);

        for (const commandArgumentEnumeration of commandArgument.enumerations) {
          itemList.add(commandArgumentEnumeration);
        }
      }
    }
  }

  return itemList;
};

/**
 * We have different types of things in our autocomplete, so make sure we know how to
 * get the name of each differing type.
 *
 * @param item The item that we need the name of
 * @returns The item's name
 */
export const getItemNameOrIdentifier = (
  item: AutoCompleteType,
  withPrefix: boolean = true
): string => {
  let value = '';

  if (item) {
    if ('commandArgumentId' in item) {
      if (withPrefix) {
        value = 'command_arugment_enumeration - ';
      }

      return value + item.label;
    } else if ('commandId' in item) {
      if (withPrefix) {
        value = 'command_arugment - ';
      }

      return (value += item.name);
    } else if ('stateId' in item) {
      if (withPrefix) {
        value = 'state_enumeration - ';
      }

      return value + item.label;
    } else if ('identifier' in item) {
      if ('type' in item) {
        // Everything else has an identifier, so return that.
        if (withPrefix) {
          value += item.type + ' - ';
        }

        return (value += item.identifier);
      } else {
        // If there isn't a type, it's a group.
        if (withPrefix) {
          value += 'group - ';
        }

        return (value += item.identifier);
      }
    }
  }
};
