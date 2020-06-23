import { CollectionState, initialState, reducer } from './collection.reducer';
import { CollectionActions } from '../actions';
import { mockCollectionMap } from '../mocks';

describe('CollectionReducer', () => {
  describe('fetchCollectionsSuccess', () => {
    it('should set collectionMap after fetching the collections', () => {
      const collectionMap = {
        ...mockCollectionMap
      };

      const collectionState: CollectionState = reducer(
        { ...initialState },
        CollectionActions.fetchCollectionsSuccess({
          collectionMap
        })
      );

      expect(collectionState).toEqual({
        ...initialState,
        collectionMap: mockCollectionMap,
        selectedCollectionId: 1
      });
    });
  });

  describe('setSelectedCollection', () => {
    it('should set selctedCollectionId on collection selection', () => {
      const id = 1;

      const collectionState: CollectionState = reducer(
        { ...initialState },
        CollectionActions.setSelectedCollection({
          id
        })
      );

      expect(collectionState).toEqual({
        ...initialState,
        selectedCollectionId: 1
      });
    });
  });
});
