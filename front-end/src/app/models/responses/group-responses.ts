import { Group } from '../group';
import { Response } from './response';

export type CreateGroupsResponse = Response & { groups: Group[] };
