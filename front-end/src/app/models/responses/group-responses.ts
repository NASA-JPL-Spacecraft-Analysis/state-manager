import { Group, GroupMapping } from '../group';
import { Response } from './response';

export type CreateGroupMappingsResponse = Response & { groupMappings: GroupMapping[] };

export type CreateGroupsResponse = Response & { groups: Group[] };
