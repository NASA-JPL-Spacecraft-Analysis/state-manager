package gov.nasa.jpl.fspa.states.dao;

import gov.nasa.jpl.fspa.model.*;
import gov.nasa.jpl.fspa.util.DatabaseUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class StateDaoImpl implements StateDao {
    @Override
    public List<State> getStates(int collectionId) {
        List<State> stateList = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(StateQueries.GET_STATES)) {

            preparedStatement.setInt(1, collectionId);

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                stateList.add(setState(resultSet, new State()));
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return stateList;
    }

    @Override
    public State createState(int collectionId, State state) {
        String query;

        if (state.getId() == null) {
            // Create a state.
            query = StateQueries.CREATE_STATE;
        } else {
            // Edit a state.
            query = StateQueries.UPDATE_STATE;
        }

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query,
                     Statement.RETURN_GENERATED_KEYS)) {
            state.setCollectionId(collectionId);

            setStatePreparedStatement(preparedStatement, state);

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();

            if (resultSet.next()) {
                state.setId(resultSet.getInt(1));
            }

            saveStateHistory(state);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return state;
    }

    @Override
    public List<StateEnumeration> getStateEnumerations(int collectionId) {
        List<StateEnumeration> stateEnumerations = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(StateQueries.GET_STATE_ENUMERATIONS)) {

            preparedStatement.setInt(1, collectionId);

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                stateEnumerations.add(setStateEnumeration(resultSet));
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return stateEnumerations;
    }

    public List<StateEnumeration> getStateEnumerationsByStateId(Integer id) {
        List<StateEnumeration> stateEnumerations = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(StateQueries.GET_STATE_ENUMERATIONS_BY_STATE_ID)) {

            statement.setInt(1, id);

            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                stateEnumerations.add(setStateEnumeration(resultSet));
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return stateEnumerations;
    }

    @Override
    public List<StateHistory> getStateHistory(int collectionId) {
        List<StateHistory> stateHistoryList = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(StateQueries.GET_STATE_HISTORY)) {

            preparedStatement.setInt(1, collectionId);

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                StateHistory stateHistory = new StateHistory(setState(resultSet, new State()));

                stateHistory.setId(Integer.parseInt(resultSet.getString("id")));
                stateHistory.setStateId(Integer.parseInt(resultSet.getString("state_id")));
                stateHistory.setUpdated(DatabaseUtil.convertMysqlDate(resultSet.getString("updated")));

                stateHistoryList.add(stateHistory);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return stateHistoryList;
    }

    @Override
    public List<Identifier> getStateIdentifiers(int collectionId) {
        List<Identifier> stateIdentifierList = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(StateQueries.GET_IDENTIFIERS)) {

            preparedStatement.setInt(1, collectionId);

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Identifier identifier = new Identifier();

                identifier.setItemId(Integer.parseInt(resultSet.getString("id")));
                identifier.setIdentifier(resultSet.getString("identifier"));

                stateIdentifierList.add(identifier);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return stateIdentifierList;
    }

    @Override
    public void deleteStateEnumerations(Collection<StateEnumeration> stateEnumerations) {
        if (stateEnumerations.size() == 0) {
            return;
        }

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(StateQueries.DELETE_STATE_ENUMERATIONS)) {
            // some drivers have limits on batch length, so run batch every 1000
            int stateEnumerationCounter = 0;

            for (StateEnumeration stateEnumeration: stateEnumerations) {
                preparedStatement.setInt(1, stateEnumeration.getId());

                preparedStatement.addBatch();

                stateEnumerationCounter++;

                if (stateEnumerationCounter % StateQueries.BATCH_SIZE == 0 || stateEnumerationCounter == stateEnumerations.size()) {
                    preparedStatement.executeBatch();
                }
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void saveStateEnumerations(List<StateEnumeration> stateEnumerations) {
        if (stateEnumerations.size() == 0) {
            return;
        }

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(StateQueries.CREATE_STATE_ENUMERATIONS)) {
            // some drivers have limits on batch length, so run batch every 1000
            int stateEnumerationCounter = 0;

            for (StateEnumeration stateEnumeration: stateEnumerations) {
                setStateEnumerationPreparedStatement(preparedStatement, stateEnumeration);

                preparedStatement.addBatch();

                stateEnumerationCounter++;

                if (stateEnumerationCounter % StateQueries.BATCH_SIZE == 0 || stateEnumerationCounter == stateEnumerations.size()) {
                    preparedStatement.executeBatch();
                }
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void updateStateEnumerations(List<StateEnumeration> stateEnumerations) {
        if (stateEnumerations.size() == 0) {
            return;
        }

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(StateQueries.UPDATE_STATE_ENUMERATIONS)) {
            // some drivers have limits on batch length, so run batch every 1000
            int stateEnumerationCounter = 0;

            for (StateEnumeration stateEnumeration: stateEnumerations) {
                setStateEnumerationPreparedStatement(preparedStatement, stateEnumeration);

                preparedStatement.setInt(5, stateEnumeration.getId());

                preparedStatement.addBatch();

                stateEnumerationCounter++;

                if (stateEnumerationCounter % StateQueries.BATCH_SIZE == 0 || stateEnumerationCounter == stateEnumerations.size()) {
                    preparedStatement.executeBatch();
                }
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    private void saveStateHistory(State state) {
        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(StateQueries.CREATE_STATE_HISTORY)) {
            StateHistory stateHistory = new StateHistory(state);

            stateHistory.setCollectionId(state.getCollectionId());
            stateHistory.setStateId(state.getId());

            setStateHistoryPreparedStatement(preparedStatement, stateHistory);

            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void setStateEnumerationPreparedStatement(PreparedStatement preparedStatement, StateEnumeration stateEnumeration) {
        try {
            preparedStatement.setInt(1, stateEnumeration.getCollectionId());
            preparedStatement.setInt(2, stateEnumeration.getStateId());
            preparedStatement.setString(3, stateEnumeration.getLabel());
            preparedStatement.setInt(4, stateEnumeration.getValue());
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    private void setStateHistoryPreparedStatement(PreparedStatement preparedStatement, StateHistory stateHistory) {
        try {
            preparedStatement.setInt(1, stateHistory.getCollectionId());
            preparedStatement.setInt(2, stateHistory.getStateId());
            preparedStatement.setString(3, stateHistory.getIdentifier());
            preparedStatement.setString(4, stateHistory.getDisplayName());
            preparedStatement.setString(5, stateHistory.getType());
            preparedStatement.setString(6, stateHistory.getUnits());
            preparedStatement.setString(7, stateHistory.getSource());
            preparedStatement.setString(8, stateHistory.getSubsystem());
            preparedStatement.setString(9, stateHistory.getDescription());
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private StateEnumeration setStateEnumeration(ResultSet resultSet) {
        StateEnumeration stateEnumeration = new StateEnumeration();

        try {
            stateEnumeration.setId(Integer.parseInt(resultSet.getString("id")));
            stateEnumeration.setCollectionId(Integer.parseInt(resultSet.getString("collection_id")));
            stateEnumeration.setStateId(Integer.parseInt(resultSet.getString("state_id")));
            stateEnumeration.setLabel(resultSet.getString("label"));
            stateEnumeration.setValue(Integer.parseInt(resultSet.getString("value")));
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return stateEnumeration;
    }

    private State setState(ResultSet resultSet, State state) {
        try {
            state.setId(Integer.valueOf(resultSet.getString("id")));
            state.setIdentifier(resultSet.getString("identifier"));
            state.setDisplayName(resultSet.getString("display_name"));
            state.setType(resultSet.getString("type"));
            state.setUnits(resultSet.getString("units"));
            state.setSource(resultSet.getString("source"));
            state.setSubsystem(resultSet.getString("subsystem"));
            state.setDescription(resultSet.getString("description"));
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return state;
    }

    private void setStatePreparedStatement(PreparedStatement preparedStatement, State state) {
        try {
            preparedStatement.setInt(1, state.getCollectionId());
            preparedStatement.setString(2, state.getIdentifier());
            preparedStatement.setString(3, state.getDisplayName());
            preparedStatement.setString(4, state.getType());
            preparedStatement.setString(5, state.getUnits());
            preparedStatement.setString(6, state.getSource());
            preparedStatement.setString(7, state.getSubsystem());
            preparedStatement.setString(8, state.getDescription());

            // If we're editing our state, we need to set the id.
            if (state.getId() != null) {
                preparedStatement.setInt(9, state.getId());
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
