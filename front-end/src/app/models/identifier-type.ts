import { Node } from './node';
import { StringTMap } from './string-t-map';

export interface IdentifierType extends Node {
  collectionId: string;
  displayName: string;
  editable: boolean;
  externalLink: string;
  identifier: string;
  type: string;
}

export type IdentifierMap = StringTMap<string>;
