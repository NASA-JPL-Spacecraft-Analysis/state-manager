import { Event } from './event';
import { GroupUpload, GroupUploadMappings, MappingsUpload } from './group';
import { InformationType } from './information-type';
import { RelationshipUpload } from './relationship';
import { State } from './state';
import { StateEnumerationUpload } from './state-enumeration';

export type ParseTypes =
  | Event[]
  | GroupUpload[]
  | GroupUploadMappings[]
  | InformationType[]
  | MappingsUpload[]
  | RelationshipUpload[]
  | State[]
  | StateEnumerationUpload[];
