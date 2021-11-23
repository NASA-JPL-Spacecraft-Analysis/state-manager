import { Event, EventHistory, IdentifierMap } from '../models';

export const mockEvent1: Event = {
  id: '1',
  collectionId: '1',
  identifier: 'TEST_EVENT_1',
  displayName: 'Test Event 1',
  description: 'Test event description',
  externalLink: 'https://test.com',
  editable: true,
  type: 'evr'
};

export const mockEvent1History: EventHistory = {
  id: '1',
  collectionId: '1',
  identifier: 'TEST_EVENT_1',
  displayName: 'Test Event 1',
  description: 'Test event description',
  externalLink: 'https://test.com',
  editable: true,
  eventId: '1',
  type: 'predict_event',
  updated: new Date()
};

export const mockEventIdentifierMap: IdentifierMap = {
  [mockEvent1.identifier]: [
    {
      id: mockEvent1.id,
      type: mockEvent1.type
    }
  ]
};

export const mockEvents: Event[] = [
  mockEvent1
];

export const mockEventHistory: EventHistory[] = [
  mockEvent1History
];
