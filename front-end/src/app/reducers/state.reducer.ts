import { createReducer, on } from '@ngrx/store';

import { StateActions, FileUploadActions } from '../actions';
import {
  State,
  StateEnumeration,
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
  on(StateActions.createStatesSuccess, (stateState, { states }) => ({
    ...stateState,
    stateMap: {
      ...stateState.stateMap,
      ...mapStates(states)
    }
  })),
  on(StateActions.updateStateSuccess, (stateState, { state }) => {
    return modifyState(stateState, state);
  }),
  on(StateActions.saveEnumerationsSuccess, (stateState, { enumerations }) => ({
    ...stateState,
    stateEnumerationMap: {
      ...mapEnumerations(enumerations)
    }
  })),
  on(StateActions.setStateEnumerations, (stateState, { stateEnumerations }) => ({
    ...stateState,
    stateEnumerationMap: {
      ...mapEnumerations(stateEnumerations)
    }
  })),
  on(StateActions.setStateHistory, (stateState, { stateHistory }) => {
    const stateHistoryMap = {};

    for (const stateHistoryItem of stateHistory) {
      stateHistoryMap[stateHistoryItem.id] = stateHistoryItem;
    }

    return {
      ...stateState,
      stateHistoryMap
    };
  }),
  on(StateActions.setStates, (stateState, { states }) => {
    const stateMap = {};
    const stateIdentifierMap = new Map<string, number>();

    for (const state of states) {
      stateMap[state.id] = state;
      stateIdentifierMap[state.identifier] = state.id;
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

function mapStates(states: State[]): StateMap {
  const stateMap = {};

  for (const state of states) {
    stateMap[state.id] = state;
  }

  return stateMap;
}

function mapEnumerations(stateEnumerations: StateEnumeration[]): StateEnumerationMap {
  const stateEnumerationMap = {};

  for (const stateEnumeration of stateEnumerations) {
    if (!stateEnumerationMap[stateEnumeration.id]) {
      stateEnumerationMap[stateEnumeration.id] = [];
    }

    stateEnumerationMap[stateEnumeration.id].push(stateEnumeration);
  }

  return stateEnumerationMap;
}
