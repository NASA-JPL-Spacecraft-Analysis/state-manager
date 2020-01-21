package gov.nasa.jpl.fspa.dao;

import gov.nasa.jpl.fspa.model.Identifier;
import gov.nasa.jpl.fspa.model.StateEnumeration;
import gov.nasa.jpl.fspa.model.StateVariable;
import gov.nasa.jpl.fspa.util.DatabaseUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StateVariableDaoImpl implements StateVariableDao {
    @Override
    public List<StateVariable> getStateVariables() {
        List<StateVariable> stateVariables = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(StateVariableQueries.GET_STATE_VARIABLES);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                StateVariable stateVariable = new StateVariable();

                stateVariable.setId(Integer.valueOf(resultSet.getString("id")));
                stateVariable.setIdentifier(resultSet.getString("identifier"));
                stateVariable.setDisplayName(resultSet.getString("displayName"));
                stateVariable.setType(resultSet.getString("type"));
                stateVariable.setUnits(resultSet.getString("units"));
                stateVariable.setSource(resultSet.getString("source"));
                stateVariable.setDescription(resultSet.getString("description"));

                stateVariables.add(stateVariable);
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
            query = StateVariableQueries.PUT_STATE_VARIABLE;
        }

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query,
                     Statement.RETURN_GENERATED_KEYS)) {
            setStateVariablePreparedStatement(preparedStatement, stateVariable);

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();

            if (!resultSet.next()) {
                throw new Exception("Insert unsuccessful");
            }

            stateVariable.setId(resultSet.getInt(1));
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

    private void setStateVariablePreparedStatement(PreparedStatement preparedStatement, StateVariable stateVariable) {
        try {
            preparedStatement.setString(1, stateVariable.getIdentifier());
            preparedStatement.setString(2, stateVariable.getDisplayName());
            preparedStatement.setString(3, stateVariable.getType());
            preparedStatement.setString(4, stateVariable.getUnits());
            preparedStatement.setString(5, stateVariable.getSource());
            preparedStatement.setString(6, stateVariable.getDescription());

            // If we're editing our state variable, we need to set the id.
            if (stateVariable.getId() != null) {
                preparedStatement.setInt(7, stateVariable.getId());
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
