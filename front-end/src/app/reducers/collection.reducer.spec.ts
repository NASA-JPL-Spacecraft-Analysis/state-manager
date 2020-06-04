import { CollectionState, initialState, reducer } from './collection.reducer';
import { CollectionActions } from '../actions';
import { CollectionMap } from '../models';
import { mockCollectioNMap } from '../mocks';

describe('CollectionReducer', () => {
  describe('fetchCollectionsSuccess', () => {
    it('should set collectionMap after fetching the collections', () => {
      const collectionMap: CollectionMap = {
        ...mockCollectioNMap
      };

      const state: CollectionState = reducer(
        { ...initialState },
        CollectionActions.fetchCollectionsSuccess({
          collectionMap
        })
      );

      expect(state).toEqual({
        ...initialState,
        collectionMap
      });
    });
  });

  describe('setSelectedCollection', () => {
    it('should set selctedCollectionId on collection selection', () => {
      const state: CollectionState = reducer(
        { ...initialState },
        CollectionActions.setSelectedCollection({
          id: 1
        })
      );

      expect(state).toEqual({
        ...initialState,
        selectedCollectionId: 1
      });
    });
  });
});
