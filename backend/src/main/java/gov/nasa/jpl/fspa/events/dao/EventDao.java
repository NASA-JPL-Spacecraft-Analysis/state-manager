package gov.nasa.jpl.fspa.events.dao;

import gov.nasa.jpl.fspa.model.Event;
import gov.nasa.jpl.fspa.model.EventHistory;
import gov.nasa.jpl.fspa.model.Identifier;

import java.util.List;

public interface EventDao {
    List<EventHistory> getEventHistoryList();

    List<Event> getEventList();

    List<Identifier> getIdentifiers();

    Event modifyEvent(Event event);
}
