import { EventMap } from '../models';

export const mockEventMap: EventMap = {
  [1]: {
    id: 1,
    identifier: 'TEST_EVENT_1',
    displayName: 'Test Event 1',
    description: 'Test event description',
    externalLink: 'https://test.com',
    editable: true
  }
};

export const mockEventHistoryMap: EventMap = {
  [1]: {
    id: 1,
    identifier: 'TEST_EVENT_1',
    displayName: 'Test Event 1',
    description: 'Test event description',
    externalLink: 'https://test.com',
    editable: true,
    eventId: 1,
    updated: new Date()
  }
};
