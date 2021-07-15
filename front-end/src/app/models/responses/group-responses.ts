import { Group, GroupMapping } from '../group';
import { Response } from './response';

export type GroupMappingsResponse = Response & { groupMappings?: GroupMapping[] };

export type GroupResponse = Response & { group?: Group };

export type GroupsResponse = Response & { groups?: Group[] };
