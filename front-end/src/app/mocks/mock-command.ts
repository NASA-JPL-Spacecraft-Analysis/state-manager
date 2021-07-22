import { Command, CommandArgument, CommandHistory, IdentifierMap } from '../models';

export const mockCommand: Command = {
  arguments: [],
  collectionId: '1',
  description: 'Mock command description',
  displayName: 'Mock Command',
  editable: true,
  externalLink: 'http://mock-command.com',
  id: '1',
  identifier: 'MOCK_COMMAND',
  type: 'command'
};

export const mockCommandArgument: CommandArgument = {
  commandId: "2",
  id: "1",
  name: "Mock Command Argument",
  sortOrder: 1
};

export const mockCommandWithArgument: Command = {
  arguments: [ mockCommandArgument ],
  collectionId: '1',
  description: 'Mock command with argument description',
  displayName: 'Mock Command With Argument',
  editable: true,
  externalLink: 'http://mock-command.com',
  id: '2',
  identifier: 'MOCK_COMMAND_WITH_ARGUMENT',
  type: 'command'
};

export const mockCommandHistory: CommandHistory[] = [
  {
    ...mockCommand,
    commandId: mockCommand.id,
    updated: new Date()
  }
];

export const mockCommands: Command[] = [
  {
    ...mockCommand
  }
];

export const mockCommandIdentifierMap: IdentifierMap = {
  [mockCommand.identifier]: mockCommand.id
};
