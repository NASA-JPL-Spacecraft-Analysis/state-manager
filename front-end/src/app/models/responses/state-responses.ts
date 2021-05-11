import { State } from '../state';
import { StateEnumeration } from '../state-enumeration';
import { Response } from './response';

export type CreateStateResponse = Response & { state: State };

export type CreateStatesResponse = Response & { states: State[] };

export type SaveEnumerationsResponse = Response & { enumerations: StateEnumeration[] };
