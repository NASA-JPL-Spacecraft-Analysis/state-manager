import { Event } from './event';
import { GroupUpload } from './group';
import { InformationTypes } from './information-types';
import { RelationshipUpload } from './relationship';
import { State } from './state';
import { StateEnumerationUpload } from './state-enumeration';

export type ParseTypes =
  | Event[]
  | GroupUpload[]
  | InformationTypes[]
  | RelationshipUpload[]
  | State[]
  | StateEnumerationUpload[];
