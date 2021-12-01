import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import { CommandActions, FileUploadActions } from '../actions';
import { mapIdentifiers, mapItems } from '../functions/helpers';
import { Command, CommandArgumentHistory, CommandArgumentMap, CommandHistory, CommandMap, IdentifierMap } from '../models';

export interface CommandState {
  commandArgumentHistory: CommandArgumentHistory[];
  commandArgumentMap: CommandArgumentMap;
  commandHistory: CommandHistory[];
  commandIdentifierMap: IdentifierMap;
  commandMap: CommandMap;
  selectedCommandId: string;
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
  on(CommandActions.createCommandSuccess, (state, { command }) => modifyCommand(state, command)),
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
  on(CommandActions.setCommands, (state, { commands }) => ({
    ...state,
    commandMap: {
      ...mapItems(commands) as CommandMap
    },
    commandIdentifierMap: {
      ...mapIdentifiers(commands)
    }
  })),
  on(CommandActions.setSelectedCommand, (state, { id }) => ({
    ...state,
    selectedCommandId: id
  })),
  on(CommandActions.updateCommandSuccess, (state, { command }) => modifyCommand(state, command)),
  on(FileUploadActions.uploadCommandsSuccess, (state, { commands }) => ({
    ...state,
    commandMap: {
      ...state.commandMap,
      ...mapItems(commands) as CommandMap
    },
    commandIdentifierMap: {
      ...state.commandIdentifierMap,
      ...mapIdentifiers(commands)
    }
  }))
);

const modifyCommand = (state: CommandState, command: Command): CommandState => {
  const commandArgumentMap = {};
  commandArgumentMap[command.id] = command.arguments;

  const commandIdentifierMap = cloneDeep(state.commandIdentifierMap);

  for (const identifier of Object.keys(commandIdentifierMap)) {
    let index = 0;

    for (const item of commandIdentifierMap[identifier]) {
      if (item.id === command.id) {
        commandIdentifierMap[identifier] = commandIdentifierMap[identifier].splice(index, 1);
      }

      index++;
    }
  }

  const currentIdentifierMap =
        commandIdentifierMap[command.identifier] ? commandIdentifierMap[command.identifier] : [];

  return {
    ...state,
    commandArgumentMap: {
      ...commandArgumentMap
    },
    commandIdentifierMap: {
      ...currentIdentifierMap,
      [command.identifier]: [
        ...commandIdentifierMap[command.identifier],
        {
          id: command.id,
          type: command.type
        }
      ]
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
