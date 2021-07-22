import { reduce } from 'rxjs/operators';
import { CommandActions, FileUploadActions } from '../actions';
import { mockCommand, mockCommandArgument, mockCommandHistory, mockCommandIdentifierMap, mockCommands, mockCommandWithArgument } from '../mocks';
import { CommandState, reducer, initialState } from './command.reducer';

describe('CommandReducer', () => {
  describe('createCommandSuccess', () => {
    it('should add the new command to commandIdentifierMap, commandMap, and set the selected command id.', () => {
      const commandState: CommandState = reducer(
        {
          ...initialState
        },
        CommandActions.createCommandSuccess({
          command: mockCommand
        })
      );

      expect(commandState).toEqual({
        ...initialState,
        commandArgumentMap: {
          [mockCommand.id]: []
        },
        commandIdentifierMap: {
          [mockCommand.identifier]: mockCommand.id
        },
        commandMap: {
          [mockCommand.id]: {
            ...mockCommand
          }
        },
        selectedCommandId: mockCommand.id
      })
    });
  });

  describe('deleteArgumentsSuccess', () => {
    it('should delete mockCommandWithArgument\'s argument', () => {
      const commandState: CommandState = reducer(
        {
          ...initialState,
          commandArgumentMap: {
            [mockCommandWithArgument.id]: [
              { ...mockCommandArgument}
            ]
          }
        },
        CommandActions.deleteArgumentsSuccess({
          deletedArgumentIds: [ mockCommandArgument.id ]
        })
      );

      expect(commandState).toEqual({
        ...initialState,
        commandArgumentMap: {
          [mockCommandWithArgument.id]: []
        }
      })
    });
  });

  describe('saveCommandArgumentsSuccess', () => {
    it('should save the command arguments after they\'re uploaded', () => {
      const commandState: CommandState = reducer(
        {
          ...initialState,
          commandArgumentMap: {
            [mockCommandWithArgument.id]: []
          }
        },
        CommandActions.saveCommandArgumentsSuccess({
          commandArguments: [ mockCommandArgument ]
        })
      );

      expect(commandState).toEqual({
        ...initialState,
        commandArgumentMap: {
          [mockCommandWithArgument.id]: [
            mockCommandArgument
          ]
        }
      })
    });
  });

  describe('setCommandHistory', () => {
    it('should set commandHistory when it finishes loading', () => {
      const commandState: CommandState = reducer(
        {
          ...initialState
        },
        CommandActions.setCommandHistory({
          commandHistory: mockCommandHistory
        })
      );

      expect(commandState).toEqual({
        ...initialState,
        commandHistory: [
          ...mockCommandHistory
        ]
      })
    });
  });

  describe('setCommands', () => {
    it('should add the commands to commandIdentifierMap and commandMap', () => {
      const commandState: CommandState = reducer(
        {
          ...initialState
        },
        CommandActions.setCommands({
          commands: mockCommands
        })
      );

      expect(commandState).toEqual({
        ...initialState,
        commandArgumentMap: {
          [mockCommand.id]: []
        },
        commandIdentifierMap: {
          [mockCommand.identifier]: mockCommand.id
        },
        commandMap: {
          [mockCommand.id]: {
            ...mockCommand
          }
        }
      })
    });
  });

  describe('setSelectedCommand', () => {
    it('should set the selected command', () => {
      const commandState: CommandState = reducer(
        {
          ...initialState
        },
        CommandActions.setSelectedCommand({
          id: mockCommand.id
        })
      );

      expect(commandState).toEqual({
        ...initialState,
        selectedCommandId: mockCommand.id
      })
    });
  });

  describe('updateCommandSuccess', () => {
    it('should remove the old command identifier from commandIdentifierMap and update the command in commandMap', () => {
      const updatedMockCommand = {
        ...mockCommand,
        identifier: 'UPDATED_MOCK_COMMAND'
      };

      const commandState: CommandState = reducer(
        {
          ...initialState,
          commandIdentifierMap: {
            ...mockCommandIdentifierMap
          }
        },
        CommandActions.updateCommandSuccess({
          command: updatedMockCommand
        })
      );

      expect(commandState).toEqual({
        ...initialState,
        commandArgumentMap: {
          [mockCommand.id]: []
        },
        commandIdentifierMap: {
          [updatedMockCommand.identifier]: updatedMockCommand.id
        },
        commandMap: {
          [mockCommand.id]: {
            ...updatedMockCommand
          }
        },
        selectedCommandId: mockCommand.id
      })
    });
  });

  describe('uploadCommandSuccess', () => {
    it('should add the new command to commandIdentifierMap, commandMap, and set the selected command id.', () => {
      const commandState: CommandState = reducer(
        {
          ...initialState
        },
        FileUploadActions.uploadCommandsSuccess({
          commands: mockCommands
        })
      );

      expect(commandState).toEqual({
        ...initialState,
        commandIdentifierMap: {
          [mockCommand.identifier]: mockCommand.id
        },
        commandMap: {
          [mockCommand.id]: {
            ...mockCommand
          }
        }
      })
    });
  });
});
