import { createReducer, on } from '@ngrx/store';

import { CollectionMap } from '../models';
import { CollectionActions } from '../actions';

export interface CollectionState {
  collectionMap: CollectionMap;
  selectedCollectionId: number;
}

export const initialState: CollectionState = {
  collectionMap: null,
  selectedCollectionId: null
};

export const reducer = createReducer(
  initialState,
  on(CollectionActions.fetchCollectionsSuccess, (state, { collectionMap }) => ({
    ...state,
    collectionMap: {
      ...collectionMap
    }
  })),
  on(CollectionActions.setSelectedCollection, (state, { id }) => ({
    ...state,
    selectedCollectionId: id
  }))
);
