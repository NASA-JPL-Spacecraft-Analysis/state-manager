import { createReducer, on } from '@ngrx/store';

import { StateActions } from '../actions';
import {
  IdentifierMap,
  State,
  StateEnumeration,
  StateEnumerationMap,
  StateMap
} from '../models';

export interface StateState {
  stateIdentifierMap: IdentifierMap;
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
  on(StateActions.createStateSuccess, (stateState, { state }) => modifyState(stateState, state)),
  on(StateActions.createStatesSuccess, (stateState, { states }) => ({
    ...stateState,
    stateMap: {
      ...stateState.stateMap,
      ...mapStates(states)
    }
  })),
  on(StateActions.updateStateSuccess, (stateState, { state }) => modifyState(stateState, state)),
  on(StateActions.saveEnumerationsSuccess, (stateState, { enumerations }) => ({
    ...stateState,
    stateEnumerationMap: {
      ...mapEnumerations(enumerations)
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
    const stateIdentifierMap = {};

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

const modifyState = (stateState: StateState, state: State): StateState => {
  const stateIdentifierMap = {
    ...stateState.stateIdentifierMap
  };

  for (const identifier of Object.keys(stateIdentifierMap)) {
    // Remove the old identifier from our map
    if (stateIdentifierMap[identifier] === state.id) {
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
};

const mapStates = (states: State[]): StateMap => {
  const stateMap = {};

  for (const state of states) {
    stateMap[state.id] = state;
  }

  return stateMap;
};

const mapEnumerations = (stateEnumerations: StateEnumeration[]): StateEnumerationMap => {
  const stateEnumerationMap = {};

  for (const stateEnumeration of stateEnumerations) {
    if (!stateEnumerationMap[stateEnumeration.id]) {
      stateEnumerationMap[stateEnumeration.id] = [];
    }

    stateEnumerationMap[stateEnumeration.id].push(stateEnumeration);
  }

  return stateEnumerationMap;
};
