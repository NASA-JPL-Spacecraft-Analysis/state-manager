import { Command, CommandHistory, CommandMap, IdentifierMap } from '../models';

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
