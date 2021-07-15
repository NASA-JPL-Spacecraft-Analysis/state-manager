import { CommandActions, FileUploadActions } from '../actions';
import { mockCommand, mockCommandHistory, mockCommandIdentifierMap, mockCommands } from '../mocks';
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
        commandIdentifierMap: {
          [updatedMockCommand.identifier]: updatedMockCommand.id
        },
        commandMap: {
          [mockCommand.id]: {
            ...updatedMockCommand
          }
        }
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
