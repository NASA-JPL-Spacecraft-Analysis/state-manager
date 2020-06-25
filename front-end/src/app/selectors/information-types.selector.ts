import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InformationTypesState } from '../reducers/information-types.reducer';

export const getInformationTypesState = createFeatureSelector<InformationTypesState>(
  'informationTypes'
);

export const getInformationTypes = createSelector(
  getInformationTypesState,
  (state: InformationTypesState) => state.informationTypes
);
