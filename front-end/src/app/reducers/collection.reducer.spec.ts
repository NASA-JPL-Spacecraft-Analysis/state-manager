import { CollectionState, initialState, reducer } from './collection.reducer';
import { CollectionActions } from '../actions';
import { mockCollectionMap } from '../mocks';

describe('CollectionReducer', () => {
  describe('createCollectionSuccess', () => {
    it('should set collectionMap and selectedCollectionId after creating a collection', () => {
      const collection = {
        id: 2,
        name: 'Created Collection'
      };

      const collectionState: CollectionState = reducer(
        { ...initialState },
        CollectionActions.createCollectionSuccess({
          collection
        })
      );

      expect(collectionState).toEqual({
        ...initialState,
        collectionMap: {
          [collection.id]: collection
        },
        selectedCollectionId: 2
      });
    });
  });

  describe('deleteCollectionSuccess', () => {
    it('should remove the deleted collection from collectionMap', () => {
      const collectionState: CollectionState = reducer(
        { ...initialState, collectionMap: mockCollectionMap },
        CollectionActions.deleteCollectionSuccess({
          id: 1
        })
      );

      expect(collectionState).toEqual({
        ...initialState,
        collectionMap: {},
        selectedCollectionId: null
      });
    });
  });

  describe('editCollectionSuccess', () => {
    it('should edit the collection\'s name', () => {
      const collection = {
        id: 1,
        name: 'Edited collection'
      };

      const collectionState: CollectionState = reducer(
        { ...initialState, collectionMap: mockCollectionMap },
        CollectionActions.editCollectionSuccess({
          collection
        })
      );

      expect(collectionState).toEqual({
        ...initialState,
        collectionMap: {
          [collection.id]: collection
        }
      });
    });
  });

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
