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
    }
  })),
  on(CollectionActions.deleteCollectionSuccess, (state, { id }) => {
    const collectionMap = {
      ...state.collectionMap
    };

    delete collectionMap[id];

    return {
      ...state,
      collectionMap: {
        ...collectionMap
      }
    };
  }),
  on(CollectionActions.editCollectionSuccess, (state, { collection }) => ({
    ...state,
    collectionMap: {
      ...state.collectionMap,
      [collection.id]: {
        ...collection
      }
    }
  })),
  on(CollectionActions.fetchCollectionsSuccess, (state, { collectionMap }) => ({
    ...state,
    collectionMap: {
      ...collectionMap
    },
    selectedCollectionId: getFirstCollection(collectionMap)
  })),
  on(CollectionActions.setSelectedCollection, (state, { id }) => {
    if (!id) {
      id = getFirstCollection(state.collectionMap);
    }

    return {
      ...state,
      selectedCollectionId: id
    };
  })
);

function getFirstCollection(collectionMap: CollectionMap): number {
  if (collectionMap) {
    const keys = Object.keys(collectionMap);

    if (keys.length > 0) {
      return Number(keys[0]);
    }
  }

  return -1;
}
