package gov.nasa.jpl.fspa.events.dao;

import gov.nasa.jpl.fspa.model.Event;
import gov.nasa.jpl.fspa.model.EventHistory;

import java.util.List;

public interface EventDao {
    List<EventHistory> getEventHistoryList();

    List<Event> getEventList();

    Event modifyEvent(Event event);
}
