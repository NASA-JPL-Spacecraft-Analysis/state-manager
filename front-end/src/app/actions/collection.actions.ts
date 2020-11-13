import { createAction, props } from '@ngrx/store';

import { Collection } from '../models';

export const createCollection = createAction(
  '[collection] createCollection',
  props<{ name: string }>()
);

export const createCollectionSuccess = createAction(
  '[collection] createCollectionSuccess',
  props<{ collection: Collection }>()
);

export const createCollectionFailure = createAction(
  '[collection] createCollectionFailure',
  props<{ error: Error }>()
);

export const deleteCollection = createAction(
  '[collection] deleteCollection',
  props<{ id: number, name: string }>()
);

export const deleteCollectionSuccess = createAction(
  '[collection] deleteCollectionSuccess',
  props<{ id: number }>()
);

export const deleteCollectionFailure = createAction(
  '[collection] deleteCollectionFailure',
  props<{ error: Error }>()
);

export const updateCollection = createAction(
  '[collection] updateCollection',
  props<{ collectionId: number, name: string }>()
);

export const updateCollectionSuccess = createAction(
  '[collection] updateCollectionSuccess',
  props<{ collection: Collection }>()
);

export const updateCollectionFailure = createAction(
  '[collection] updateCollectionFailure',
  props<{ error: Error }>()
);

export const fetchCollectionsFailure = createAction(
  '[collection] fetchCollectionMapFailure',
  props<{ error: Error }>()
);

export const fetchCollectionsSuccess = createAction(
  '[collection] fetchCollections',
  props<{ collections: Collection[] }>()
);

export const setSelectedCollection = createAction(
  '[collection] setSelectedCollection',
  props<{ id: number }>()
);
