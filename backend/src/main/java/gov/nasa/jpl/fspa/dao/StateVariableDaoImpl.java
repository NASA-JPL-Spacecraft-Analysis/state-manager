package gov.nasa.jpl.fspa.dao;

import gov.nasa.jpl.fspa.model.*;
import gov.nasa.jpl.fspa.util.DatabaseUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class StateVariableDaoImpl implements StateVariableDao {
    @Override
    public List<StateVariable> getStateVariables() {
        List<StateVariable> stateVariables = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(StateVariableQueries.GET_STATE_VARIABLES);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                stateVariables.add(setStateVariable(resultSet, new StateVariable()));
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return stateVariables;
    }

    @Override
    public StateVariable createStateVariable(StateVariable stateVariable) {
        String query;

        if (stateVariable.getId() == null) {
            // Create a state variable.
            query = StateVariableQueries.CREATE_STATE_VARIABLE;
        } else {
            // Edit a state variable.
            query = StateVariableQueries.UPDATE_STATE_VARIABLE;
        }

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query,
                     Statement.RETURN_GENERATED_KEYS)) {
            setStateVariablePreparedStatement(preparedStatement, stateVariable);

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();

            if (resultSet.next()) {
                stateVariable.setId(resultSet.getInt(1));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return stateVariable;
    }

    @Override
    public void createStateVariables(List<StateVariable> stateVariables) {
        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(StateVariableQueries.CREATE_STATE_VARIABLE)) {
            // some drivers have limits on batch length, so run batch every 1000
            int stateVariableCounter = 0;

            for (StateVariable stateVariable: stateVariables) {
                setStateVariablePreparedStatement(preparedStatement, stateVariable);

                preparedStatement.addBatch();

                stateVariableCounter++;

                if (stateVariableCounter % StateVariableQueries.BATCH_SIZE == 0 || stateVariableCounter == stateVariables.size()) {
                    preparedStatement.executeBatch();
                }
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public List<StateEnumeration> getStateEnumerations() {
        List<StateEnumeration> stateEnumerations = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(StateVariableQueries.GET_STATE_ENUMERATIONS);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                StateEnumeration stateEnumeration = new StateEnumeration();

                stateEnumeration.setId(Integer.parseInt(resultSet.getString("id")));
                stateEnumeration.setStateVariableId(Integer.parseInt(resultSet.getString("state_variable_id")));
                stateEnumeration.setLabel(resultSet.getString("label"));
                stateEnumeration.setValue(Integer.parseInt(resultSet.getString("value")));

                stateEnumerations.add(stateEnumeration);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return stateEnumerations;
    }

    public List<StateEnumeration> getStateEnumerationsByStateVariableId(Integer id) {
        List<StateEnumeration> stateEnumerations = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(StateVariableQueries.GET_STATE_ENUMERATIONS_BY_STATE_VARIABLE_ID)) {

            statement.setInt(1, id);

            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                StateEnumeration stateEnumeration = new StateEnumeration();

                stateEnumeration.setId(Integer.parseInt(resultSet.getString("id")));
                stateEnumeration.setStateVariableId(Integer.parseInt(resultSet.getString("state_variable_id")));
                stateEnumeration.setLabel(resultSet.getString("label"));
                stateEnumeration.setValue(Integer.parseInt(resultSet.getString("value")));

                stateEnumerations.add(stateEnumeration);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return stateEnumerations;
    }

    @Override
    public List<StateHistory> getStateHistory() {
        List<StateHistory> stateHistoryList = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(StateVariableQueries.GET_STATE_HISTORY);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                StateHistory stateHistory = new StateHistory();

                stateHistory.setStateId(Integer.valueOf(resultSet.getString("state_id")));
                stateHistory.setUpdated(DatabaseUtil.convertMysqlDate(resultSet.getString("updated")));

                stateHistoryList.add(stateHistory);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return stateHistoryList;
    }

    @Override
    public List<Identifier> getIdentifiers() {
        List<Identifier> identifiers = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(StateVariableQueries.GET_IDENTIFIERS);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                Identifier identifier = new Identifier();

                identifier.setStateVariableId(Integer.parseInt(resultSet.getString("id")));
                identifier.setIdentifier(resultSet.getString("identifier"));

                identifiers.add(identifier);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return identifiers;
    }

    @Override
    public void deleteStateEnumerations(Collection<StateEnumeration> stateEnumerations) {
        if (stateEnumerations.size() == 0) {
            return;
        }

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(StateVariableQueries.DELETE_STATE_ENUMERATIONS)) {
            // some drivers have limits on batch length, so run batch every 1000
            int stateEnumerationCounter = 0;

            for (StateEnumeration stateEnumeration: stateEnumerations) {
                preparedStatement.setInt(1, stateEnumeration.getId());

                preparedStatement.addBatch();

                stateEnumerationCounter++;

                if (stateEnumerationCounter % StateVariableQueries.BATCH_SIZE == 0 || stateEnumerationCounter == stateEnumerations.size()) {
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
             PreparedStatement preparedStatement = connection.prepareStatement(StateVariableQueries.CREATE_STATE_ENUMERATIONS)) {
            // some drivers have limits on batch length, so run batch every 1000
            int stateEnumerationCounter = 0;

            for (StateEnumeration stateEnumeration: stateEnumerations) {
                setStateEnumerationPreparedStatement(preparedStatement, stateEnumeration);

                preparedStatement.addBatch();

                stateEnumerationCounter++;

                if (stateEnumerationCounter % StateVariableQueries.BATCH_SIZE == 0 || stateEnumerationCounter == stateEnumerations.size()) {
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
             PreparedStatement preparedStatement = connection.prepareStatement(StateVariableQueries.UPDATE_STATE_ENUMERATIONS)) {
            // some drivers have limits on batch length, so run batch every 1000
            int stateEnumerationCounter = 0;

            for (StateEnumeration stateEnumeration: stateEnumerations) {
                setStateEnumerationPreparedStatement(preparedStatement, stateEnumeration);

                preparedStatement.setInt(4, stateEnumeration.getId());

                preparedStatement.addBatch();

                stateEnumerationCounter++;

                if (stateEnumerationCounter % StateVariableQueries.BATCH_SIZE == 0 || stateEnumerationCounter == stateEnumerations.size()) {
                    preparedStatement.executeBatch();
                }
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    private void setStateEnumerationPreparedStatement(PreparedStatement preparedStatement, StateEnumeration stateEnumeration) {
        try {
            preparedStatement.setInt(1, stateEnumeration.getStateVariableId());
            preparedStatement.setString(2, stateEnumeration.getLabel());
            preparedStatement.setInt(3, stateEnumeration.getValue());
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    private StateVariable setStateVariable(ResultSet resultSet, StateVariable stateVariable) {
        try {
            stateVariable.setId(Integer.valueOf(resultSet.getString("id")));
            stateVariable.setIdentifier(resultSet.getString("identifier"));
            stateVariable.setDisplayName(resultSet.getString("displayName"));
            stateVariable.setType(resultSet.getString("type"));
            stateVariable.setUnits(resultSet.getString("units"));
            stateVariable.setSource(resultSet.getString("source"));
            stateVariable.setSubsystem(resultSet.getString("subsystem"));
            stateVariable.setDescription(resultSet.getString("description"));
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return stateVariable;
    }

    private void setStateVariablePreparedStatement(PreparedStatement preparedStatement, StateVariable stateVariable) {
        try {
            preparedStatement.setString(1, stateVariable.getIdentifier());
            preparedStatement.setString(2, stateVariable.getDisplayName());
            preparedStatement.setString(3, stateVariable.getType());
            preparedStatement.setString(4, stateVariable.getUnits());
            preparedStatement.setString(5, stateVariable.getSource());
            preparedStatement.setString(6, stateVariable.getSubsystem());
            preparedStatement.setString(7, stateVariable.getDescription());

            // If we're editing our state variable, we need to set the id.
            if (stateVariable.getId() != null) {
                preparedStatement.setInt(8, stateVariable.getId());
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
