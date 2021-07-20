import { createReducer, on } from '@ngrx/store';

import { CommandActions, FileUploadActions } from '../actions';
import { Command, CommandArgumentMap, CommandHistory, CommandMap, IdentifierMap } from '../models';

export interface CommandState {
  commandArgumentMap: CommandArgumentMap;
  commandHistory: CommandHistory[];
  commandIdentifierMap: IdentifierMap,
  commandMap: CommandMap,
  selectedCommandId: string
}

export const initialState: CommandState = {
  commandArgumentMap: undefined,
  commandHistory: undefined,
  commandIdentifierMap: undefined,
  commandMap: undefined,
  selectedCommandId: undefined
};

export const reducer = createReducer(
  initialState,
  on(CommandActions.createCommandSuccess, (state, { command }) => createOrUpdateCommandSuccess(state, command)),
  on(CommandActions.deleteArgumentsSuccess, (state, { deletedArgumentIds }) => {
    const commandArgumentMap = {
      ...state.commandArgumentMap
    };
    const commandMap = state.commandMap;

    for (const deletedArgumentId of deletedArgumentIds) {
      delete commandArgumentMap[deletedArgumentId];
    }

    // Remove any deleted arguments from the commandMap.
    for (const id of Object.keys(commandMap)) {
      commandMap[id].arguments.filter((argument) => deletedArgumentIds.indexOf(argument.id) === -1);
    }

    return {
      ...state,
      commandArgumentMap,
      commandMap
    };
  }),
  on(CommandActions.setCommandHistory, (state, { commandHistory }) => ({
    ...state,
    commandHistory
  })),
  on(CommandActions.setCommands, (state, { commands }) => {
    const commandArgumentMap = {};
    const commandIdentifierMap = {};
    const commandMap = {};

    for (const command of commands) {
      for (const commandArgument of command.arguments) {
        commandArgumentMap[commandArgument.id] = commandArgument;
      }

      commandIdentifierMap[command.identifier] = command.id;
      commandMap[command.id] = command;
    }

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
  on(CommandActions.updateCommandSuccess, (state, { command }) => createOrUpdateCommandSuccess(state, command)),
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

const createOrUpdateCommandSuccess = (state: CommandState, command: Command): CommandState => {
  const commandIdentifierMap = {
    ...state.commandIdentifierMap
  };

  for (const identifier of Object.keys(commandIdentifierMap)) {
    // Remove the old identifier from our map
    if (commandIdentifierMap[identifier] === command.id) {
      delete commandIdentifierMap[identifier];
    }
  }

  const commandArgumentMap = {};

  if (command.arguments) {
    for (const argument of command.arguments) {
      commandArgumentMap[argument.id] = argument;
    }
  }

  return {
    ...state,
    commandArgumentMap: {
      ...state.commandArgumentMap,
      ...commandArgumentMap
    },
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
};
