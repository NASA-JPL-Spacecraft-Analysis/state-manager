package gov.nasa.jpl.fspa.events.service;

import gov.nasa.jpl.fspa.model.Event;
import gov.nasa.jpl.fspa.model.EventHistory;

import java.util.Map;

public interface EventService {
    Map<Integer, EventHistory> getEventHistoryMap();

    Map<Integer, Event> getEventMap();

    Event modifyEvent(Event event);
}
