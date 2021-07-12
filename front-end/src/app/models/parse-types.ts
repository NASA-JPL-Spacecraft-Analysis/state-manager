import { Event } from './event';
import { GroupUpload, GroupUploadMappings, MappingsUpload } from './group';
import { InformationTypes } from './information-types';
import { RelationshipUpload } from './relationship';
import { State } from './state';
import { StateEnumerationUpload } from './state-enumeration';

export type ParseTypes =
  | Event[]
  | GroupUpload[]
  | GroupUploadMappings[]
  | InformationTypes[]
  | MappingsUpload[]
  | RelationshipUpload[]
  | State[]
  | StateEnumerationUpload[];
