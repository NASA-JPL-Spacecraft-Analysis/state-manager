import { createReducer, on } from '@ngrx/store';

import { CommandActions, FileUploadActions } from '../actions';
import { mapItems } from '../functions/helpers';
import { CommandArgumentHistory, CommandArgumentMap, CommandHistory, CommandMap } from '../models';

export interface CommandState {
  commandArgumentHistory: CommandArgumentHistory[];
  commandArgumentMap: CommandArgumentMap;
  commandHistory: CommandHistory[];
  commandMap: CommandMap;
  commandTypes: string[];
  selectedCommandId: string;
}

export const initialState: CommandState = {
  commandArgumentHistory: undefined,
  commandArgumentMap: undefined,
  commandHistory: undefined,
  commandMap: undefined,
  commandTypes: undefined,
  selectedCommandId: undefined
};

export const reducer = createReducer(
  initialState,
  on(CommandActions.saveCommandArgumentsSuccess, (state, { commandArguments }) => {
    const commandArgumentMap = {};

    for (const argument of commandArguments) {
      if (!commandArgumentMap[argument.commandId]) {
        commandArgumentMap[argument.commandId] = [];
      }

      commandArgumentMap[argument.commandId].push(argument);
    }

    return {
      ...state,
      commandArgumentMap: {
        ...state.commandArgumentMap,
        ...commandArgumentMap
      }
    };
  }),
  on(CommandActions.setCommandArgumentHistory, (state, { commandArgumentHistory }) => ({
    ...state,
    commandArgumentHistory
  })),
  on(CommandActions.setCommandHistory, (state, { commandHistory }) => ({
    ...state,
    commandHistory
  })),
  on(CommandActions.setCommands, (state, { commands }) => ({
    ...state,
    commandMap: {
      ...mapItems(commands) as CommandMap
    }
  })),
  on(CommandActions.setCommandTypes, (state, { commandTypes }) => ({
    ...state,
    commandTypes: [
      ...commandTypes
    ]
  })),
  on(CommandActions.setSelectedCommand, (state, { id }) => ({
    ...state,
    selectedCommandId: id
  })),
  on(FileUploadActions.uploadCommandsSuccess, (state, { commands }) => ({
    ...state,
    commandMap: {
      ...state.commandMap,
      ...mapItems(commands) as CommandMap
    }
  }))
);
