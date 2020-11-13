import { Collection, CollectionMap } from '../models';

const collection: Collection = {
  id: 1,
  name: 'Test Collection 1'
};

export const mockCollectionMap: CollectionMap = {
  [1]: collection
};

export const mockCollections: Collection[] = [
  collection
];

