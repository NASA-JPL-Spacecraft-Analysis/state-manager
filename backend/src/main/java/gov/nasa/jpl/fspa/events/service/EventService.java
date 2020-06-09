package gov.nasa.jpl.fspa.events.service;

import gov.nasa.jpl.fspa.model.Event;
import gov.nasa.jpl.fspa.model.EventHistory;

import java.util.List;
import java.util.Map;

public interface EventService {
    Map<Integer, EventHistory> getEventHistoryMap(Integer collectionId);

    Map<Integer, Event> getEventMap(Integer collectionId);

    Map<String, Integer> getMappedIdentifiers();

    Event modifyEvent(Event event);

    Map<Integer, Event> saveUploadedEvents(List<Event> eventList);
}
