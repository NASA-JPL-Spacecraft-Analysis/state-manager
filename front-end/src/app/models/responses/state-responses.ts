import { State } from '../state';
import { Response } from './response';

export type CreateStateResponse = Response & { state: State };
