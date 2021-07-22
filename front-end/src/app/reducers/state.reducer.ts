import { createReducer, on } from '@ngrx/store';

import { StateActions } from '../actions';
import {
  IdentifierMap,
  State,
  StateEnumerationMap,
  StateMap
} from '../models';

export interface StateState {
  selectedStateId: string;
  stateEnumerationMap: StateEnumerationMap;
  stateHistoryMap: StateMap;
  stateIdentifierMap: IdentifierMap;
  stateMap: StateMap;
}

export const initialState: StateState = {
  selectedStateId: undefined,
  stateEnumerationMap: undefined,
  stateHistoryMap: undefined,
  stateIdentifierMap: undefined,
  stateMap: undefined
};

export const reducer = createReducer(
  initialState,
  on(StateActions.createStateSuccess, (stateState, { state }) => createOrUpdateStateSuccess(stateState, state)),
  on(StateActions.createStatesSuccess, (stateState, { states }) => ({
    ...stateState,
    stateMap: {
      ...stateState.stateMap,
      ...mapStates(states)
    }
  })),
  on(StateActions.deleteEnumerationsSuccess, (state, { deletedEnumerationIds }) => {
    const stateEnumerationMap = {
      ...state.stateEnumerationMap
    };
    const stateMap = state.stateMap;

    for (const deletedEnumerationId of deletedEnumerationIds) {
      delete stateEnumerationMap[deletedEnumerationId];
    }

    // Remove any deleted arguments from the stateMap.
    for (const id of Object.keys(stateMap)) {
      stateMap[id].enumerations.filter((enumeration) => deletedEnumerationIds.indexOf(enumeration.id) === -1);
    }

    return {
      ...state,
      stateEnumerationMap,
      stateMap
    };
  }),
  on(StateActions.saveEnumerationsSuccess, (stateState, { stateEnumerations }) => {
    const stateEnumerationMap = {};

    for (const enumeration of stateEnumerations) {
      if (!stateEnumerationMap[enumeration.stateId]) {
        stateEnumerationMap[enumeration.stateId] = [];
      }

      stateEnumerationMap[enumeration.stateId].push(enumeration);
    }

    return {
      ...stateState,
      stateEnumerationMap: {
        ...stateState.stateEnumerationMap,
        ...stateEnumerationMap
      }
    };
  }),
  on(StateActions.setSelectedState, (stateState, { id }) => ({
    ...stateState,
    selectedStateId: id
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
    const stateEnumerationMap = {};
    const stateMap = {};
    const stateIdentifierMap = {};

    for (const state of states) {
      stateMap[state.id] = state;
      stateIdentifierMap[state.identifier] = state.id;
      stateEnumerationMap[state.id] = state.enumerations;
    }

    return {
      ...stateState,
      stateEnumerationMap,
      stateIdentifierMap,
      stateMap
    };
  }),
  on(StateActions.updateStateSuccess, (stateState, { state }) => createOrUpdateStateSuccess(stateState, state))
);

const createOrUpdateStateSuccess = (stateState: StateState, state: State): StateState => {
  const stateEnumerationMap = {
    ...stateState.stateEnumerationMap
  };

  // Overwrite the current list of enumerations for the created or updated state.
  stateEnumerationMap[state.id] = state.enumerations;

  const stateIdentifierMap = {
    ...stateState.stateIdentifierMap
  };

  for (const identifier of Object.keys(stateIdentifierMap)) {
    if (stateIdentifierMap[identifier] === state.id) {
      delete stateIdentifierMap[identifier];
    }
  }

  return {
    ...stateState,
    selectedStateId: state.id,
    stateEnumerationMap: {
      ...stateEnumerationMap
    },
    stateIdentifierMap: {
      ...stateState.stateIdentifierMap,
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
