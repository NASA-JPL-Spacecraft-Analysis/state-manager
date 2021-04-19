import { Event } from './event';
import { Group } from './group';
import { InformationTypes } from './information-types';
import { RelationshipUpload } from './relationship';
import { State } from './state';
import { StateEnumerationUpload } from './state-enumeration';

export type ParseTypes =
  | Event[]
  | Group[]
  | InformationTypes[]
  | RelationshipUpload[]
  | State[]
  | StateEnumerationUpload[];
