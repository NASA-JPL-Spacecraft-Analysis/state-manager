package gov.nasa.jpl.fspa.collections.dao;

import gov.nasa.jpl.fspa.model.Collection;
import gov.nasa.jpl.fspa.util.DatabaseUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class CollectionDaoImpl implements CollectionDao {
    @Override
    public Collection createCollection(String collectionName) {
        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(CollectionQueries.CREATE_COLLECTION, Statement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setString(1, collectionName);

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            Collection collection = new Collection();

            if (resultSet.next()) {
                collection.setId(resultSet.getInt(1));
                collection.setName(collectionName);
            }

            return collection;
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Collection> getCollections() {
        List<Collection> collectionList = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(CollectionQueries.GET_COLLECTIONS);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                Collection collection = new Collection();

                collection.setId(Integer.valueOf(resultSet.getString("id")));
                collection.setName(resultSet.getString("name"));

                collectionList.add(collection);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return collectionList;
    }

    @Override
    public Collection updateCollection(int collectionId, String collectionName) {
        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(CollectionQueries.UPDATE_COLLECTION)) {

            preparedStatement.setString(1, collectionName);
            preparedStatement.setInt(2, collectionId);

            preparedStatement.executeUpdate();

            Collection collection = new Collection();

            collection.setId(collectionId);
            collection.setName(collectionName);

            return collection;
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return null;
    }
}