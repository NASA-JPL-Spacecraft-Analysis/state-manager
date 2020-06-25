package gov.nasa.jpl.fspa.informationtypes.dao;

import gov.nasa.jpl.fspa.model.InformationTypes;
import gov.nasa.jpl.fspa.model.InformationTypesEnum;
import gov.nasa.jpl.fspa.util.DatabaseUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class InformationTypesDaoImpl implements InformationTypesDao {
    @Override
    public List<InformationTypes> getInformationTypes(int collectionId) {
        List<InformationTypes> informationTypesList = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(InformationTypesQueries.GET_INFORMATION_TYPES)) {

            InformationTypesEnum[] informationTypesEnumValues = InformationTypesEnum.values();

            preparedStatement.setInt(1, collectionId);

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                InformationTypes informationTypes = new InformationTypes();

                informationTypes.setId(Integer.valueOf(resultSet.getString("id")));
                informationTypes.setCollectionId(Integer.valueOf(resultSet.getString("collection_id")));
                informationTypes.setType(informationTypesEnumValues[Integer.parseInt(resultSet.getString("type"))]);
                informationTypes.setIdentifier(resultSet.getString("identifier"));
                informationTypes.setDisplayName(resultSet.getString("display_name"));
                informationTypes.setDescription(resultSet.getString("description"));
                informationTypes.setExternalLink(resultSet.getString("external_link"));

                informationTypesList.add(informationTypes);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return informationTypesList;
    }

    @Override
    public InformationTypes saveInformationTypes(InformationTypes informationTypes) {
        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(InformationTypesQueries.CREATE_INFORMATION_TYPES, Statement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setInt(1, informationTypes.getCollectionId());
            preparedStatement.setInt(2, informationTypes.getType().ordinal());
            preparedStatement.setString(3, informationTypes.getIdentifier());
            preparedStatement.setString(4, informationTypes.getDisplayName());
            preparedStatement.setString(5, informationTypes.getDescription());
            preparedStatement.setString(6, informationTypes.getExternalLink());

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();

            if (resultSet.next()) {
                informationTypes.setId(resultSet.getInt(1));
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return informationTypes;
    }
}
