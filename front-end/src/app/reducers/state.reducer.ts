import { createReducer, on } from '@ngrx/store';

import { StateActions, FileUploadActions } from '../actions';
import {
  State,
  StateEnumerationMap,
  StateMap
} from '../models';

export interface StateState {
  stateIdentifierMap: Map<string, number>;
  selectedState: State;
  stateEnumerationMap: StateEnumerationMap;
  stateHistoryMap: StateMap;
  stateMap: StateMap;
}

export const initialState: StateState = {
  stateIdentifierMap: null,
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
  on(StateActions.setStates, (stateState, { stateMap }) => {
    const stateIdentifierMap = new Map<string, number>();

    for (const key of Object.keys(stateMap)) {
      stateIdentifierMap[stateMap[key].identifier] = key;
    }

    return {
      ...stateState,
      stateIdentifierMap: {
        ...stateIdentifierMap
      },
      stateMap: {
        ...stateMap
      }
    };
  }),
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
  const stateIdentifierMap = {
    ...stateState.stateIdentifierMap
  };

  for (const identifier of Object.keys(stateIdentifierMap)) {
    // Remove the old identifier from our map
    if (Number(stateIdentifierMap[identifier]) === state.id) {
      delete stateIdentifierMap[identifier];
    }
  }

  return {
    ...stateState,
    selectedState: state,
    stateIdentifierMap: {
      ...stateIdentifierMap,
      [state.identifier]: state.id
    },
    stateMap: {
      ...stateState.stateMap,
      [state.id]: {
        ...state
      }
    }
  };
}
