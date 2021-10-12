import { IdentifierMap, IdentifierType, StringTMap } from '../models';

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
