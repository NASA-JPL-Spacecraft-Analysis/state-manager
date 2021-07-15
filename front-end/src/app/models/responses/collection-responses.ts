import { Collection } from '../collection';
import { Response } from './response';

export type CollectionResponse = Response & { collection?: Collection };
