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
  on(StateActions.saveEnumerationsSuccess, (stateState, { enumerations }) => ({
    ...stateState,
    stateEnumerationMap: {
      ...mapEnumerations(enumerations)
    }
  })),
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
  on(StateActions.updateStateSuccess, (stateState, { state }) => createOrUpdateStateSuccess(stateState, state))
);

const createOrUpdateStateSuccess = (stateState: StateState, state: State): StateState => {
  const stateEnumerationMap = {};

  if (state.enumerations) {
    for (const enumeration of state.enumerations) {
      stateEnumerationMap[enumeration.id] = enumeration;
    }
  }

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
      ...stateState.stateEnumerationMap,
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
