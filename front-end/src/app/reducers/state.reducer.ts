import { createReducer, on } from '@ngrx/store';

import { StateActions, FileUploadActions } from '../actions';
import {
  State,
  StateEnumerationMap,
  StateMap
} from '../models';

export interface StateState {
  stateIdentifiers: Set<string>;
  selectedState: State;
  stateEnumerationMap: StateEnumerationMap;
  stateHistoryMap: StateMap;
  stateMap: StateMap;
}

export const initialState: StateState = {
  stateIdentifiers: new Set<string>(),
  selectedState: null,
  stateEnumerationMap: null,
  stateHistoryMap: null,
  stateMap: null
};

export const reducer = createReducer(
  initialState,
  on(StateActions.createStateSuccess, (stateState, { state }) => {
    return modifyState(stateState, state);
  }),
  on(StateActions.createStatesSuccess, (stateState, { stateMap }) => ({
    ...stateState,
    stateMap: {
      ...stateMap
    }
  })),
  on(StateActions.editStateSuccess, (stateState, { state }) => {
    return modifyState(stateState, state);
  }),
  on(StateActions.saveEnumerationsSuccess, (state, { enumerations }) => {
    const stateEnumerationMap: StateEnumerationMap = {};
    let stateId = null;

    for (const enumeration of enumerations) {
      stateId = enumeration.stateId;

      if (stateEnumerationMap[stateId] === undefined) {
        stateEnumerationMap[stateId] = [];
      }

      stateEnumerationMap[stateId].push(enumeration);
    }

    return {
      ...state,
      stateEnumerationMap: {
        ...stateEnumerationMap
      }
    };
  }),
  on(StateActions.setStateIdentifiers, (appState, { stateIdentifiers }) => {
    const stateIdentifierSet = new Set<string>();

    if (stateIdentifiers) {
      for (const stateIdentifier of stateIdentifiers) {
        stateIdentifierSet.add(stateIdentifier);
      }
    }

    return {
      ...appState,
      stateIdentifiers: stateIdentifierSet
    };
  }),
  on(StateActions.setStateEnumerations, (stateState, { stateEnumerationMap }) => ({
    ...stateState,
    stateEnumerationMap: {
      ...stateEnumerationMap
    }
  })),
  on(StateActions.setStateHistory, (stateState, { stateHistoryMap }) => ({
    ...stateState,
    stateHistoryMap
  })),
  on(StateActions.setStates, (stateState, { stateMap }) => ({
    ...stateState,
    stateMap
  })),
  on(StateActions.setSelectedState, (stateState, { state }) => ({
    ...stateState,
    selectedState: state
  })),
  on(FileUploadActions.uploadStateEnumerationsSuccess, (state, { stateEnumerationMap }) => ({
    ...state,
    stateEnumerationMap: {
      ...stateEnumerationMap
    }
  })),
  on(FileUploadActions.uploadStatesSuccess, (stateState, { stateMap }) => ({
    ...stateState,
    stateMap: {
      ...stateState.stateMap,
      ...stateMap
    }
  }))
);

function modifyState(stateState: StateState, state: State): StateState {
  return {
    ...stateState,
    selectedState: state,
    stateMap: {
      ...stateState.stateMap,
      [state.id]: {
        ...state
      }
    }
  };
}
