import { Relationship } from '../relationship';
import { Response } from './response';

export type RelationshipResponse = Response & { relationship: Relationship };

export type RelationshipsResponse = Response & { relationships: Relationship[] };
