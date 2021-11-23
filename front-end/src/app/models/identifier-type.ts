import { Node } from './node';
import { StringTMap } from './string-t-map';

export interface IdentifierType extends Node {
  collectionId: string;
  description: string;
  displayName: string;
  editable: boolean;
  externalLink: string;
  identifier: string;
  type: string;
}

export type IdentifierMap = StringTMap<IdentifierComparison[]>;
export interface IdentifierComparison {
  id: string;
  type: string;
}

export enum IdentifierTypeEnum {
  'command' = 'command',
  'commandArgument' = 'commandArgument',
  'constraint' = 'constraint',
  'event' = 'event',
  'informationType' = 'informationType',
  'state' = 'state'
};
