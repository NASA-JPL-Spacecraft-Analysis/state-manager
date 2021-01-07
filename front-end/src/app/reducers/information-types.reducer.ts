import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

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
  on(InformationTypesActions.setInformationTypes, (state, { informationTypes }) => ({
    ...state,
    informationTypes: {
      ...mapInformationTypes(undefined, informationTypes)
    }
  })),
  on(FileUploadActions.uploadInformationTypesSuccess, (state, { informationTypes }) => {
    const informationTypeMap = cloneDeep(state.informationTypes);

    return {
      ...state,
      informationTypes: {
        ...mapInformationTypes(informationTypeMap, informationTypes)
      }
    };
  })
);

function mapInformationTypes(informationTypesMap: InformationTypesMap, informationTypes: InformationTypes[]): InformationTypesMap {
  if (!informationTypesMap) {
    informationTypesMap = new Map<number, StringTMap<InformationTypes>>();
  }

  for (const informationType of informationTypes) {
    if (informationTypesMap[informationType.informationType] === undefined) {
      informationTypesMap[informationType.informationType] = {};
    }

    informationTypesMap[informationType.informationType][informationType.id] = informationType;
  }

  return informationTypesMap;
}
