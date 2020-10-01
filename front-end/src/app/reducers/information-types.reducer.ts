import { createReducer, on } from '@ngrx/store';

import { InformationTypes, InformationTypesMap, StringTMap } from '../models';
import { FileUploadActions, InformationTypesActions } from '../actions';

export interface InformationTypesState {
  informationTypes: InformationTypesMap;
}

export const initialState: InformationTypesState = {
  informationTypes: null
};

export const reducer = createReducer(
  initialState,
  on(InformationTypesActions.setInformationTypes, (state, { informationTypes }) => {
    const informationTypesMap = new Map<number, StringTMap<InformationTypes>>();

    for (const informationType of informationTypes) {
      informationTypesMap[informationType.id] = informationType;
    }

    return {
      ...state,
      informationTypes: {
        ...informationTypesMap
      }
    };
  }),
  on(FileUploadActions.uploadInformationTypesSuccess, (state, { informationTypes }) => ({
    ...state,
    informationTypes: {
      ...state.informationTypes,
      ...informationTypes
    }
  }))
);
