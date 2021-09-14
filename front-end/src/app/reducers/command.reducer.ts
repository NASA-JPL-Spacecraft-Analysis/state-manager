import { createReducer, on } from '@ngrx/store';

import { CommandActions, FileUploadActions } from '../actions';
import { Command, CommandArgumentHistory, CommandArgumentMap, CommandHistory, CommandMap, IdentifierMap } from '../models';

export interface CommandState {
  commandArgumentHistory: CommandArgumentHistory[];
  commandArgumentMap: CommandArgumentMap;
  commandHistory: CommandHistory[];
  commandIdentifierMap: IdentifierMap,
  commandMap: CommandMap,
  selectedCommandId: string
}

export const initialState: CommandState = {
  commandArgumentHistory: undefined,
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

    for (const commandId of Object.keys(commandArgumentMap)) {
      commandArgumentMap[commandId] =
        commandArgumentMap[commandId].filter((argument) => !deletedArgumentIds.includes(argument.id));
    }

    return {
      ...state,
      commandArgumentMap
    };
  }),
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
  on(CommandActions.setCommandArguments, (state, { commandArguments }) => {
    const commandArgumentMap = {};

    for (const commandArgument of commandArguments) {
      if (!commandArgumentMap[commandArgument.commandId]) {
        commandArgumentMap[commandArgument.commandId] = [];
      }

      commandArgumentMap[commandArgument.commandId].push(commandArgument);
    }

    return {
      ...state,
      commandArgumentMap
    };
  }),
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
  const commandArgumentMap = {};
  commandArgumentMap[command.id] = command.arguments;

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
    commandArgumentMap: {
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
    },
    selectedCommandId: command.id
  };
};
