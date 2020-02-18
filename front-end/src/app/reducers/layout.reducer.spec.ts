import { initialState, reducer, LayoutState } from './layout.reducer';
import { LayoutActions } from '../actions';

describe('LayoutReducer', () => {
  describe('toggleSidenav', () => {
    it('should set showSidenav to true', () => {
      const state: LayoutState = reducer(
        { ...initialState },
        LayoutActions.toggleSidenav({ showSidenav: true })
      );

      expect(state).toEqual({
        ...initialState,
        showSidenav: true
      });
    });

    it('should set showSidenav to false', () => {
      const state: LayoutState = reducer(
        { ...initialState },
        LayoutActions.toggleSidenav({ showSidenav: false })
      );

      expect(state).toEqual({
        ...initialState,
        showSidenav: false
      });
    });
  });
});
