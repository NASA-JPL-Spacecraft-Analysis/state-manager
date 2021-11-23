import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import { StateActions } from '../actions';
import {
  IdentifierMap,
  State,
  StateEnumerationHistory,
  StateEnumerationMap,
  StateMap
} from '../models';
import { mapIdentifiers, mapItems } from '../functions/helpers';

export interface StateState {
  selectedStateId: string;
  stateEnumerationHistory: StateEnumerationHistory[];
  stateEnumerationMap: StateEnumerationMap;
  stateHistoryMap: StateMap;
  stateIdentifierMap: IdentifierMap;
  stateMap: StateMap;
}

export const initialState: StateState = {
  selectedStateId: undefined,
  stateEnumerationHistory: undefined,
  stateEnumerationMap: undefined,
  stateHistoryMap: undefined,
  stateIdentifierMap: undefined,
  stateMap: undefined
};

export const reducer = createReducer(
  initialState,
  on(StateActions.createStateSuccess, (stateState, { state }) => modifyState(stateState, state)),
  on(StateActions.createStatesSuccess, (stateState, { states }) => ({
    ...stateState,
    stateIdentifierMap: {
      ...mapIdentifiers(states)
    },
    stateMap: {
      ...mapItems(states) as StateMap
    }
  })),
  on(StateActions.deleteEnumerationsSuccess, (state, { deletedEnumerationIds }) => {
    const stateEnumerationMap = {
      ...state.stateEnumerationMap
    };

    for (const stateId of Object.keys(stateEnumerationMap)) {
      stateEnumerationMap[stateId] =
        stateEnumerationMap[stateId].filter((enumeration) => !deletedEnumerationIds.includes(enumeration.id));
    }

    return {
      ...state,
      stateEnumerationMap
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
  on(StateActions.setStateEnumerationHistory, (stateState, { stateEnumerationHistory }) => ({
    ...stateState,
    stateEnumerationHistory
  })),
  on(StateActions.setStateEnumerations, (stateState, { stateEnumerations }) => {
    const stateEnumerationMap = {};

    for (const stateEnumeration of stateEnumerations) {
      if (!stateEnumerationMap[stateEnumeration.stateId]) {
        stateEnumerationMap[stateEnumeration.stateId] = [];
      }

      stateEnumerationMap[stateEnumeration.stateId].push(stateEnumeration);
    }

    return {
      ...stateState,
      stateEnumerationMap
    };
  }),
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
  on(StateActions.setStates, (stateState, { states }) => ({
    ...stateState,
    stateIdentifierMap: {
      ...mapIdentifiers(states)
    },
    stateMap: {
      ...mapItems(states) as StateMap
    }
  })),
  on(StateActions.updateStateSuccess, (stateState, { state }) => modifyState(stateState, state))
);

const modifyState = (stateState: StateState, state: State): StateState => {
  const stateEnumerationMap = {
    ...stateState.stateEnumerationMap
  };

  // Overwrite the current list of enumerations for the created or updated state.
  stateEnumerationMap[state.id] = state.enumerations;

  const stateIdentifierMap = cloneDeep(stateState.stateIdentifierMap);

  for (const identifier of Object.keys(stateIdentifierMap)) {
    let index = 0;

    for (const item of stateIdentifierMap[identifier]) {
      if (item.id === state.id) {
        stateIdentifierMap[identifier] = stateIdentifierMap[identifier].splice(index, 1);
      }

      index++;
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
      [state.identifier]: [
        ...stateIdentifierMap[state.identifier],
        {
          id: state.id,
          type: state.type
        }
      ]
    },
    stateMap: {
      ...stateState.stateMap,
      [state.id]: {
        ...state
      }
    }
  };
};
