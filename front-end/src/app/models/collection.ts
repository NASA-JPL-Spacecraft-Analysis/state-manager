import { StringTMap } from './string-t-map';

export interface Collection {
  id: number;
  name: string;
}

export type CollectionMap = StringTMap<Collection>;
