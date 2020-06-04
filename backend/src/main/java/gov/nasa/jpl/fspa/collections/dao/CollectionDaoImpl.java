package gov.nasa.jpl.fspa.collections.dao;

import gov.nasa.jpl.fspa.model.Collection;
import gov.nasa.jpl.fspa.util.DatabaseUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class CollectionDaoImpl implements CollectionDao {
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
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return collectionList;
    }
}
