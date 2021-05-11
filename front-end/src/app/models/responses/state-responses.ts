import { State } from '../state';
import { Response } from './response';

export type CreateStateResponse = Response & { state: State };

export type CreateStatesResponse = Response & { states: State[] };
