import { Node } from './node';

export interface IdentifierType extends Node {
  collectionId: string;
  displayName: string;
  editable: boolean;
  externalLink: string;
  identifier: string;
  type: string;
}
