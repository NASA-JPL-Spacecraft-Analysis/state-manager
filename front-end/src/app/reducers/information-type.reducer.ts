import { createReducer, on } from '@ngrx/store';

import { InformationType, InformationTypeMap } from '../models';
import { FileUploadActions, InformationTypeActions } from '../actions';

export interface InformationTypeState {
  informationTypeMap: InformationTypeMap;
}

export const initialState: InformationTypeState = {
  informationTypeMap: null
};

export const reducer = createReducer(
  initialState,
  on(InformationTypeActions.clearInformationTypes, ({}) => ({
    ...initialState
  })),
  on(InformationTypeActions.setInformationTypes, (state, { informationTypes }) => ({
    ...state,
    informationTypeMap: {
      ...mapInformationTypes(informationTypes)
    }
  })),
  on(FileUploadActions.uploadInformationTypesSuccess, (state, { informationTypes }) => ({
    ...state,
    informationTypeMap: {
      ...state.informationTypeMap,
      ...mapInformationTypes(informationTypes)
    }
  }))
);

const mapInformationTypes = (informationTypes: InformationType[]): InformationTypeMap => {
  const informationTypeMap = {};

  for (const informationType of informationTypes) {
    informationTypeMap[informationType.id] = informationType;
  }

  return informationTypeMap;
};
