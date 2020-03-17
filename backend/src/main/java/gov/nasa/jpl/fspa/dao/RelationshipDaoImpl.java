package gov.nasa.jpl.fspa.dao;

import gov.nasa.jpl.fspa.model.Relationship;
import gov.nasa.jpl.fspa.util.DatabaseUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RelationshipDaoImpl implements RelationshipDao {
    @Override
    public List<Relationship> getRelationships() {
        List<Relationship> relationships = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(RelationshipQueries.GET_RELATIONSHIPS);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                Relationship relationship = new Relationship();

                relationship.setId(Integer.valueOf(resultSet.getString("id")));
                relationship.setDisplayName(resultSet.getString("display_name"));
                relationship.setDescription(resultSet.getString("description"));

                if (resultSet.getString("subject_state_id") != null) {
                    relationship.setSubjectStateId(Integer.valueOf(resultSet.getString("subject_state_id")));
                }

                if (resultSet.getString("target_state_id") != null) {
                    relationship.setSubjectStateId(Integer.valueOf(resultSet.getString("target_state_id")));
                }

                relationship.setTargetName(resultSet.getString("target_name"));
                relationship.setType(resultSet.getString("type"));

                relationships.add(relationship);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return relationships;
    }

    @Override
    public Relationship saveRelationship(Relationship relationship) {
        String query;

        if (relationship.getId() == null) {
            // Create a state variable.
            query = RelationshipQueries.CREATE_RELATIONSHIP;
        } else {
            // Edit a state variable.
            query = RelationshipQueries.UPDATE_RELATIONSHIP;
        }

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query,
                     Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setString(1, relationship.getDisplayName());
            preparedStatement.setString(2, relationship.getDescription());

            if (relationship.getSubjectStateId() == null) {
                preparedStatement.setNull(3, Types.INTEGER);
            } else {
                preparedStatement.setInt(3, relationship.getSubjectStateId());
            }

            if (relationship.getTargetStateId() == null) {
                preparedStatement.setNull(4, Types.INTEGER);
            } else {
                preparedStatement.setInt(4, relationship.getTargetStateId());
            }

            preparedStatement.setString(5, relationship.getTargetName());
            preparedStatement.setString(6, relationship.getType());

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();

            if (resultSet.next()) {
                relationship.setId(resultSet.getInt(1));
            }

            saveRelationshipHistory(relationship);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return relationship;
    }

    private void saveRelationshipHistory(Relationship relationship) {
        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(RelationshipQueries.CREATE_RELATIONSHIP_HISTORY)) {
            preparedStatement.setInt(1, relationship.getId());
            preparedStatement.setString(2, relationship.getDisplayName());
            preparedStatement.setString(3, relationship.getDescription());

            if (relationship.getSubjectStateId() == null) {
                preparedStatement.setNull(4, Types.INTEGER);
            } else {
                preparedStatement.setInt(4, relationship.getSubjectStateId());
            }

            if (relationship.getTargetStateId() == null) {
                preparedStatement.setNull(5, Types.INTEGER);
            } else {
                preparedStatement.setInt(5, relationship.getTargetStateId());
            }

            preparedStatement.setString(6, relationship.getTargetName());
            preparedStatement.setString(7, relationship.getType());

            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
