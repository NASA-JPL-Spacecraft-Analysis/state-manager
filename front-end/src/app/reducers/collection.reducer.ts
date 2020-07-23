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
  on(CollectionActions.createCollectionSuccess, (state, { collection }) => ({
    ...state,
    collectionMap: {
      ...state.collectionMap,
      [collection.id]: {
        ...collection
      }
    },
    selectedCollectionId: collection.id
  })),
  on(CollectionActions.editCollectionSuccess, (state, { collection }) => ({
    ...state,
    collectionMap: {
      ...state.collectionMap,
      [collection.id]: {
        ...collection
      }
    }
  })),
  on(CollectionActions.fetchCollectionsSuccess, (state, { collectionMap }) => {
    const keys = Object.keys(collectionMap);
    let selectedCollectionId: number;

    if (keys.length > 0) {
      selectedCollectionId = Number(keys[0]);
    }

    return {
      ...state,
      collectionMap: {
        ...collectionMap
      },
      selectedCollectionId
    };
  }),
  on(CollectionActions.setSelectedCollection, (state, { id }) => ({
    ...state,
    selectedCollectionId: id
  }))
);
