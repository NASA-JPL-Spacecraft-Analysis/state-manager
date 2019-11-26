package gov.nasa.jpl.fspa.dao;

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
                stateVariable.setName(resultSet.getString("name"));
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
    public int postStateVariable(StateVariable stateVariable) {
        int id = -1;

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(StateVariableQueries.POST_STATE_VARIABLE,
                     Statement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setString(1, stateVariable.getIdentifier());
            preparedStatement.setString(2, stateVariable.getName());
            preparedStatement.setString(3, stateVariable.getType());
            preparedStatement.setString(4, stateVariable.getUnits());
            preparedStatement.setString(5, stateVariable.getSource());
            preparedStatement.setString(6, stateVariable.getDescription());

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();

            resultSet.next();

            id = resultSet.getInt(1);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return id;
    }
}
