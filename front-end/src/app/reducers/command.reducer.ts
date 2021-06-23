import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';

import { CommandActions, FileUploadActions } from '../actions';
import { CommandHistory, CommandMap, IdentifierMap } from '../models';

export interface CommandState {
  commandHistory: CommandHistory[];
  commandIdentifierMap: IdentifierMap,
  commandMap: CommandMap,
  selectedCommandId: string
}

export const initialState: CommandState = {
  commandHistory: undefined,
  commandIdentifierMap: undefined,
  commandMap: undefined,
  selectedCommandId: undefined
};

export const reducer = createReducer(
  initialState,
  on(CommandActions.createCommandSuccess, (state, { command }) => ({
    ...state,
    commandIdentifierMap: {
      ...state.commandIdentifierMap,
      [command.identifier]: command.id
    },
    commandMap: {
      ...state.commandMap,
      [command.id]: {
        ...command
      }
    },
    selectedCommandId: command.id
  })),
  on(CommandActions.setCommandHistory, (state, { commandHistory }) => ({
    ...state,
    commandHistory
  })),
  on(CommandActions.setCommands, (state, { commands }) => {
    const commandIdentifierMap = {};
    const commandMap = {};

    for (const command of commands) {
      commandIdentifierMap[command.identifier] = command.id;
      commandMap[command.id] = command;
    }

    console.log(commandMap);

    return {
      ...state,
      commandIdentifierMap,
      commandMap
    };
  }),
  on(CommandActions.setSelectedCommand, (state, { id }) => ({
    ...state,
    selectedCommandId: id
  })),
  on(CommandActions.updateCommandSuccess, (state, { command }) => {
    const commandIdentifierMap = {
      ...state.commandIdentifierMap
    };

    for (const identifier of Object.keys(commandIdentifierMap)) {
      // Remove the old identifier from our map
      if (commandIdentifierMap[identifier] === command.id) {
        delete commandIdentifierMap[identifier];
      }
    }

    return {
      ...state,
      commandIdentifierMap: {
        ...commandIdentifierMap,
        [command.identifier]: command.id
      },
      commandMap: {
        ...state.commandMap,
        [command.id]: {
          ...command
        }
      }
    };
  }),
  on(FileUploadActions.uploadCommandsSuccess, (state, { commands }) => {
    const commandIdentifierMap = {};
    const commandMap = {};

    for (const command of commands) {
      commandIdentifierMap[command.identifier] = command.id;
      commandMap[command.id] = command;
    }

    return {
      ...state,
      commandIdentifierMap: {
        ...state.commandIdentifierMap,
        ...commandIdentifierMap
      },
      commandMap: {
        ...state.commandMap,
        ...commandMap
      }
    };
  })
);
