import { createAction, props } from '@ngrx/store';

import { CollectionMap } from '../models';

export const fetchCollectionsFailure = createAction(
  '[collection] fetchCollectionMapFailure',
  props<{ error: Error }>()
);

export const fetchCollectionsSuccess = createAction(
  '[collection] fetchCollections',
  props<{ collectionMap: CollectionMap }>()
);

export const setSelectedCollection = createAction(
  '[collection] setSelectedCollection',
  props<{ id: number }>()
);
