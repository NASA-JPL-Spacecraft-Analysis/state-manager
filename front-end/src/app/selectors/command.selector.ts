import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CommandState } from '../reducers/command.reducer';

export const getCommandState = createFeatureSelector<CommandState>('commands');

export const getCommandArgumentMap = createSelector(
  getCommandState,
  (state: CommandState) => state.commandArgumentMap
);

export const getCommandArguments = createSelector(
  getCommandState,
  (state: CommandState) =>
    state.selectedCommandId ? state.commandArgumentMap[state.selectedCommandId] : []
);

export const getCommandArgumentHistory = createSelector(
  getCommandState,
  (state: CommandState) => state.commandArgumentHistory
);

export const getCommandHistory = createSelector(
  getCommandState,
  (state: CommandState) => state.commandHistory
);

export const getCommandMap = createSelector(
  getCommandState,
  (state: CommandState) => state.commandMap
);

export const getCommands = createSelector(
  getCommandState,
  (state: CommandState) =>
    state.commandMap ? Object.values(state.commandMap) : undefined
);

export const getCommandTypes = createSelector(
  getCommandState,
  (state: CommandState) => state.commandTypes
);

export const getSelectedCommand = createSelector(
  getCommandState,
  (state: CommandState) =>
    state.selectedCommandId ? state.commandMap[state.selectedCommandId] : undefined
);
