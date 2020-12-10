import { StringTMap } from './string-t-map';

export interface Collection {
  id: string;
  name: string;
}

export type CollectionMap = StringTMap<Collection>;
