import { createReducer, on } from '@ngrx/store';

import { InformationTypesMap } from '../models';
import { FileUploadActions, InformationTypesActions } from '../actions';

export interface InformationTypesState {
  informationTypes: InformationTypesMap;
}

export const initialState: InformationTypesState = {
  informationTypes: null
};

export const reducer = createReducer(
  initialState,
  on(InformationTypesActions.setInformationTypes, (state, { informationTypes }) => ({
    ...state,
    informationTypes: {
      ...informationTypes
    }
  })),
  on(FileUploadActions.uploadInformationTypesSuccess, (state, { informationTypes }) => ({
    ...state,
    informationTypes: {
      ...state.informationTypes,
      ...informationTypes
    }
  }))
);
