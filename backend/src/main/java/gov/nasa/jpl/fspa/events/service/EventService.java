package gov.nasa.jpl.fspa.events.service;

import gov.nasa.jpl.fspa.model.Event;
import gov.nasa.jpl.fspa.model.EventHistory;

import java.util.List;
import java.util.Map;

public interface EventService {
    Map<Integer, EventHistory> getEventHistoryMap(int collectionId);

    Map<Integer, Event> getEventMap(int collectionId);

    Map<String, Integer> getMappedIdentifiers(int collectionId);

    Event modifyEvent(int collectionId, Event event);

    Map<Integer, Event> saveUploadedEvents(List<Event> eventList, int collectionId);
}
