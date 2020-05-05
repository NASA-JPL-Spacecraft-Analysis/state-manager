package gov.nasa.jpl.fspa.relationships.dao;

import gov.nasa.jpl.fspa.dao.StateVariableQueries;
import gov.nasa.jpl.fspa.model.*;
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

                relationships.add(setRelationship(resultSet, relationship));
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return relationships;
    }

    public List<RelationshipHistory> getRelationshipHistory() {
        List<RelationshipHistory> relationshipHistoryList = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(RelationshipQueries.GET_RELATIONSHIP_HISTORY);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                RelationshipHistory relationshipHistory = new RelationshipHistory();

                setRelationship(resultSet, relationshipHistory);

                relationshipHistory.setRelationshipId(Integer.valueOf(resultSet.getString("relationship_id")));
                relationshipHistory.setUpdated(DatabaseUtil.convertMysqlDate(resultSet.getString("updated")));

                relationshipHistoryList.add(relationshipHistory);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return relationshipHistoryList;
    }

    @Override
    public Relationship modifyRelationship(Relationship relationship) {
        String query;

        if (relationship.getId() == null) {
            // Create a state variable.
            query = RelationshipQueries.CREATE_RELATIONSHIP;
        } else {
            // Edit a state variable.
            query = RelationshipQueries.UPDATE_RELATIONSHIP;
        }

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            setRelationshipPreparedStatement(preparedStatement, relationship);

            if (relationship.getId() != null) {
                preparedStatement.setInt(7, relationship.getId());
            }

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

    @Override
    public void saveRelationshipList(List<Relationship> relationshipList) {
        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(RelationshipQueries.CREATE_RELATIONSHIP, PreparedStatement.RETURN_GENERATED_KEYS)) {
            int relationshipCounter = 0;

            for (Relationship relationship: relationshipList) {
                setRelationshipPreparedStatement(preparedStatement, relationship);

                preparedStatement.addBatch();

                relationshipCounter++;

                if (relationshipCounter % StateVariableQueries.BATCH_SIZE == 0 || relationshipCounter == relationshipList.size()) {
                    preparedStatement.executeBatch();
                }
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    private void saveRelationshipHistory(Relationship relationship) {
        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(RelationshipQueries.CREATE_RELATIONSHIP_HISTORY)) {
            preparedStatement.setInt(1, relationship.getId());
            preparedStatement.setString(2, relationship.getDisplayName());
            preparedStatement.setString(3, relationship.getDescription());
            preparedStatement.setInt(4, relationship.getSubjectType().ordinal());
            preparedStatement.setInt(5, relationship.getTargetType().ordinal());
            preparedStatement.setInt(6, relationship.getSubjectTypeId());
            preparedStatement.setInt(7, relationship.getTargetTypeId());

            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private Relationship setRelationship(ResultSet resultSet, Relationship relationship) {
        try {
            InformationTypesEnum[] informationTypesEnumValues = InformationTypesEnum.values();

            relationship.setId(Integer.parseInt(resultSet.getString("id")));
            relationship.setDisplayName(resultSet.getString("display_name"));
            relationship.setDescription(resultSet.getString("description"));
            relationship.setSubjectType(informationTypesEnumValues[Integer.parseInt(resultSet.getString("subject_type"))]);
            relationship.setTargetType(informationTypesEnumValues[Integer.parseInt(resultSet.getString("target_type"))]);
            relationship.setSubjectTypeId(Integer.valueOf(resultSet.getString("subject_type_id")));
            relationship.setTargetTypeId(Integer.valueOf(resultSet.getString("target_type_id")));
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return relationship;
    }

    private void setRelationshipPreparedStatement(PreparedStatement preparedStatement, Relationship relationship) {
        try {
            preparedStatement.setString(1, relationship.getDisplayName());
            preparedStatement.setString(2, relationship.getDescription());
            preparedStatement.setInt(3, relationship.getSubjectType().ordinal());
            preparedStatement.setInt(4, relationship.getTargetType().ordinal());
            preparedStatement.setInt(5, relationship.getSubjectTypeId());
            preparedStatement.setInt(6, relationship.getTargetTypeId());
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
