package gov.nasa.jpl.fspa.events.dao;

import gov.nasa.jpl.fspa.dao.StateVariableQueries;
import gov.nasa.jpl.fspa.model.Event;
import gov.nasa.jpl.fspa.model.EventHistory;
import gov.nasa.jpl.fspa.model.Identifier;
import gov.nasa.jpl.fspa.util.DatabaseUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class EventDaoImpl implements EventDao {
    @Override
    public List<EventHistory> getEventHistoryList() {
        List<EventHistory> eventHistoryList = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(EventQueries.GET_EVENT_HISTORY_LIST);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                EventHistory eventHistory = new EventHistory();

                setEvent(resultSet, eventHistory);

                eventHistory.setEventId(Integer.parseInt(resultSet.getString("event_id")));
                eventHistory.setUpdated(DatabaseUtil.convertMysqlDate(resultSet.getString("updated")));

                eventHistoryList.add(eventHistory);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return eventHistoryList;
    }

    @Override
    public List<Event> getEventList() {
        List<Event> eventList = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(EventQueries.GET_EVENT_LIST);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                Event event = new Event();

                setEvent(resultSet, event);

                eventList.add(event);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return eventList;
    }

    @Override
    public List<Identifier> getIdentifiers() {
        List<Identifier> identifiers = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(EventQueries.GET_IDENTIFIERS);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                Identifier identifier = new Identifier();

                identifier.setItemId(Integer.parseInt(resultSet.getString("id")));
                identifier.setIdentifier(resultSet.getString("identifier"));

                identifiers.add(identifier);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return identifiers;
    }

    @Override
    public Event modifyEvent(Event event) {
        String query;

        if (event.getId() == null) {
            query = EventQueries.CREATE_EVENT;
        } else {
            query = EventQueries.UPDATE_EVENT;
        }

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setString(1, event.getIdentifier());
            preparedStatement.setString(2, event.getDisplayName());
            preparedStatement.setString(3, event.getDescription());
            preparedStatement.setString(4, event.getExternalLink());

            if (event.getId() != null) {
                preparedStatement.setInt(5, event.getId());
            }

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();

            if (resultSet.next()) {
                event.setId(resultSet.getInt(1));
            }

            saveEventHistory(event);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return event;
    }

    private void saveEventHistory(Event event) {
        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(EventQueries.CREATE_EVENT_HISTORY)) {
            preparedStatement.setInt(1, event.getId());
            preparedStatement.setString(2, event.getIdentifier());
            preparedStatement.setString(3, event.getDisplayName());
            preparedStatement.setString(4, event.getDescription());
            preparedStatement.setString(5, event.getExternalLink());
            preparedStatement.setBoolean(6, event.getEditable());

            preparedStatement.executeUpdate();
        } catch (Exception e) {
                 e.printStackTrace();
        }
    }

    private void setEvent(ResultSet resultSet, Event event) {
        try {
            event.setId(Integer.valueOf(resultSet.getString("id")));
            event.setIdentifier(resultSet.getString("identifier"));
            event.setDisplayName(resultSet.getString("display_name"));
            event.setDescription(resultSet.getString("description"));
            event.setExternalLink(resultSet.getString("external_link"));
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
