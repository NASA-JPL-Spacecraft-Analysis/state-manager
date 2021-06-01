import { IdentifierType } from './identifier-type';
import { StringTMap } from './string-t-map';

export interface InformationType extends IdentifierType {}

export type InformationTypeMap = StringTMap<InformationType>;

export const informationTypes: string[] = [
  'goal',
  'model'
];
