package gov.nasa.jpl.fspa.events.service;

import gov.nasa.jpl.fspa.model.Event;
import gov.nasa.jpl.fspa.model.EventHistory;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface EventService {
    Map<Integer, EventHistory> getEventHistoryMap(int collectionId);

    Set<String> getEventIdentifiers(int collectionId);

    Map<Integer, Event> getEventMap(int collectionId);

    Map<String, Integer> getMappedIdentifiers(int collectionId);

    Event modifyEvent(Event event);

    Map<Integer, Event> saveUploadedEvents(List<Event> eventList, int collectionId);
}
