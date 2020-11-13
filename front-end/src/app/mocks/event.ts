import { Event } from '../models';

export const mockEvents: Event[] = [
  {
    id: 1,
    collectionId: 1,
    identifier: 'TEST_EVENT_1',
    displayName: 'Test Event 1',
    description: 'Test event description',
    externalLink: 'https://test.com',
    editable: true
  }
];

export const mockEventHistory: Event[] = [
  {
    id: 1,
    collectionId: 1,
    identifier: 'TEST_EVENT_1',
    displayName: 'Test Event 1',
    description: 'Test event description',
    externalLink: 'https://test.com',
    editable: true,
    eventId: 1,
    updated: new Date()
  }
];
