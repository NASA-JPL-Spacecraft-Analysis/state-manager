package gov.nasa.jpl.fspa.events.service;

import gov.nasa.jpl.fspa.events.dao.EventDao;
import gov.nasa.jpl.fspa.events.dao.EventDaoImpl;
import gov.nasa.jpl.fspa.model.Event;
import gov.nasa.jpl.fspa.model.EventHistory;
import gov.nasa.jpl.fspa.model.Identifier;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EventServiceImpl implements EventService {
    private final EventDao eventDao;

    public EventServiceImpl() {
        this.eventDao = new EventDaoImpl();
    }

    @Override
    public Map<Integer, EventHistory> getEventHistoryMap(Integer collectionId) {
        return mapEventList(eventDao.getEventHistoryList(collectionId));
    }

    @Override
    public Map<Integer, Event> getEventMap(Integer collectionId) {
        return mapEventList(eventDao.getEvents(collectionId));
    }

    @Override
    public Map<String, Integer> getMappedIdentifiers() {
        Map<String, Integer> mappedIdentifiers = new HashMap<>();
        List<Identifier> identifiers = eventDao.getIdentifiers();

        for (Identifier identifier: identifiers) {
            mappedIdentifiers.put(identifier.getIdentifier(), identifier.getItemId());
        }

        return mappedIdentifiers;
    }

    @Override
    public Event modifyEvent(Event event) {
        return eventDao.modifyEvent(event);
    }

    @Override
    public Map<Integer, Event> saveUploadedEvents(List<Event> eventList) {
        List<Event> savedEventList = new ArrayList<>();

        for (Event event: eventList) {
            savedEventList.add(modifyEvent(event));
        }

        return mapEventList(savedEventList);
    }

    private <T extends Event> Map<Integer, T> mapEventList(List<T> eventList) {
        Map<Integer, T> eventMap = new HashMap<>();

        for (T event: eventList) {
            eventMap.put(event.getId(), event);
        }

        return eventMap;
    }
}
