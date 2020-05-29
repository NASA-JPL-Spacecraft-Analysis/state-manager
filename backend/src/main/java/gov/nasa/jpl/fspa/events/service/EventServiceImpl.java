package gov.nasa.jpl.fspa.events.service;

import gov.nasa.jpl.fspa.events.dao.EventDao;
import gov.nasa.jpl.fspa.events.dao.EventDaoImpl;
import gov.nasa.jpl.fspa.model.Event;
import gov.nasa.jpl.fspa.model.EventHistory;
import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EventServiceImpl implements EventService {
    private final EventDao eventDao;

    public EventServiceImpl() {
        this.eventDao = new EventDaoImpl();
    }

    @Override
    public Map<Integer, EventHistory> getEventHistoryMap() {
        List<EventHistory> eventHistoryList = eventDao.getEventHistoryList();
        Map<Integer, EventHistory> eventHistoryMap = new HashMap<>();

        for (EventHistory eventHistory: eventHistoryList) {
            eventHistoryMap.put(eventHistory.getId(), eventHistory);
        }

        return eventHistoryMap;
    }

    @Override
    public Map<Integer, Event> getEventMap() {
        List<Event> eventList = eventDao.getEventList();
        Map<Integer, Event> eventMap = new HashMap<>();

        for (Event event: eventList) {
            eventMap.put(event.getId(), event);
        }

        return eventMap;
    }

    @Override
    public Event modifyEvent(Event event) {
        return eventDao.modifyEvent(event);
    }

    @Override
    public Map<Integer, Event> saveUploadedEvents(List<Event> eventList) {
        for (Event event: eventList) {
            modifyEvent(event);
        }

        return getEventMap();
    }
}
