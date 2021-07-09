import { EventActions } from '../actions';
import { mockEvent1, mockEventIdentifierMap } from '../mocks';
import { EventState, initialState, reducer } from './event.reducer';

describe('EventReducer', () => {
  describe('createEventSuccess', () => {
    it('should add the created event to the eventIdentifierMap, eventMap, and set it as the selected event', () => {
      const eventState: EventState = reducer(
        { ...initialState },
        EventActions.createEventSuccess({
          event: mockEvent1
        })
      );

      expect(eventState).toEqual({
        ...initialState,
        eventIdentifierMap: {
          [mockEvent1.identifier]: mockEvent1.id
        },
        eventMap: {
          [mockEvent1.id]: {
            ...mockEvent1
          }
        },
        selectedEvent: mockEvent1
      });
    });
  });

  describe('updateEventSuccess', () => {
    it('should update the eventIdentifierMap, eventMap, and set the updated event as the selected event', () => {
      const eventState: EventState = reducer(
        { ...initialState },
        EventActions.updateEventSuccess({
          event: mockEvent1
        })
      );

      expect(eventState).toEqual({
        ...initialState,
        eventIdentifierMap: {
          [mockEvent1.identifier]: mockEvent1.id
        },
        eventMap: {
          [mockEvent1.id]: {
            ...mockEvent1
          }
        },
        selectedEvent: mockEvent1
      });
    });

    it('should remove the outdated identifier from the eventIdentifierMap when an event is updated', () => {
      const newIdentifier = 'UPDATED_MOCK_EVENT_IDENTIFIER_1';
      const eventState: EventState = reducer(
        {
          ...initialState,
          eventIdentifierMap: mockEventIdentifierMap
        },
        EventActions.updateEventSuccess({
          event: {
            ...mockEvent1,
            identifier: newIdentifier
          }
        })
      );

      expect(eventState).toEqual({
        ...initialState,
        eventIdentifierMap: {
          [newIdentifier]: mockEvent1.id
        },
        eventMap: {
          [mockEvent1.id]: {
            ...mockEvent1,
            identifier: newIdentifier
          }
        },
        selectedEvent: {
          ...mockEvent1,
          identifier: newIdentifier
        }
      });
    });
  });
});
