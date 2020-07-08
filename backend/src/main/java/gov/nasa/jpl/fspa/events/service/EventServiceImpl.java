package gov.nasa.jpl.fspa.events.service;

import gov.nasa.jpl.fspa.events.dao.EventDao;
import gov.nasa.jpl.fspa.events.dao.EventDaoImpl;
import gov.nasa.jpl.fspa.model.Event;
import gov.nasa.jpl.fspa.model.EventHistory;
import gov.nasa.jpl.fspa.model.Identifier;
import gov.nasa.jpl.fspa.service.ValidationService;
import gov.nasa.jpl.fspa.service.ValidationServiceImpl;

import java.util.*;

public class EventServiceImpl implements EventService {
    private final EventDao eventDao;
    private final ValidationService validationService;

    public EventServiceImpl() {
        eventDao = new EventDaoImpl();
        validationService = new ValidationServiceImpl();
    }

    @Override
    public Map<Integer, EventHistory> getEventHistoryMap(int collectionId) {
        return mapEventList(eventDao.getEventHistoryList(collectionId));
    }

    @Override
    public Map<Integer, Event> getEventMap(int collectionId) {
        return mapEventList(eventDao.getEvents(collectionId));
    }

    @Override
    public Map<String, Integer> getMappedIdentifiers(int collectionId) {
        Map<String, Integer> mappedIdentifiers = new HashMap<>();
        List<Identifier> identifiers = eventDao.getIdentifiers(collectionId);

        for (Identifier identifier: identifiers) {
            mappedIdentifiers.put(identifier.getIdentifier(), identifier.getItemId());
        }

        return mappedIdentifiers;
    }

    @Override
    public Event modifyEvent(int collectionId, Event event) {
        List<Event> eventList = new ArrayList<>();

        eventList.add(event);

        List<String> duplicateIdentifierList = validationService.getDuplicateIdentifiers(eventList, getMappedIdentifiers(collectionId));

        if (duplicateIdentifierList.isEmpty()) {
            return eventDao.modifyEvent(event);
        }

        return null;
    }

    @Override
    public Map<Integer, Event> saveUploadedEvents(List<Event> eventList, int collectionId) {
        List<Event> savedEventList = new ArrayList<>();

        for (Event event: eventList) {
            // Before saving each event, set the collection id.
            event.setCollectionId(collectionId);

            savedEventList.add(modifyEvent(collectionId, event));
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
