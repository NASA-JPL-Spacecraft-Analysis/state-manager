import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CollectionState } from '../reducers/collection.reducer';
import { CollectionMap } from '../models';

export const getCollectionState = createFeatureSelector<CollectionState>(
  'collection'
);

export const getCollectionMap = createSelector(
  getCollectionState,
  (state: CollectionState): CollectionMap => state.collectionMap
);

export const getSelectedCollectionId = createSelector(
  getCollectionState,
  (state: CollectionState): string => state.selectedCollectionId
);
