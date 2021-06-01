import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InformationTypeState } from '../reducers/information-type.reducer';

export const getInformationTypesState = createFeatureSelector<InformationTypeState>(
  'informationTypes'
);

export const getInformationTypes = createSelector(
  getInformationTypesState,
  (state: InformationTypeState) => 
    state.informationTypeMap ? Object.values(state.informationTypeMap) : undefined
);

export const getInformationTypeMap = createSelector(
  getInformationTypesState,
  (state: InformationTypeState) => state.informationTypeMap
);
