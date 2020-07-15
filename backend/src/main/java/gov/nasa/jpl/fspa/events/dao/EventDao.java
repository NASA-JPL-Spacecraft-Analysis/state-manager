package gov.nasa.jpl.fspa.events.dao;

import gov.nasa.jpl.fspa.model.Event;
import gov.nasa.jpl.fspa.model.EventHistory;
import gov.nasa.jpl.fspa.model.Identifier;

import java.util.List;

public interface EventDao {
    List<EventHistory> getEventHistoryList(int collectionId);

    List<Event> getEvents(int collectionId);

    List<Identifier> getIdentifiers(int collectionId);

    Event modifyEvent(Event event);
}
