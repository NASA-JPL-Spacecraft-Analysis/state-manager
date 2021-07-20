import { State } from '../state';
import { StateEnumeration } from '../state-enumeration';
import { Response } from './response';

export type DeleteEnumerationsResponse = Response & { deletedEnumerationIds: string[] };

export type StateResponse = Response & { state: State };

export type StatesResponse = Response & { states: State[] };

export type EnumerationsResponse = Response & { enumerations: StateEnumeration[] };
