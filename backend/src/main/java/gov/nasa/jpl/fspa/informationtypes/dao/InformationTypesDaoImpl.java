package gov.nasa.jpl.fspa.informationtypes.dao;

import gov.nasa.jpl.fspa.dao.StateVariableQueries;
import gov.nasa.jpl.fspa.model.InformationTypes;
import gov.nasa.jpl.fspa.model.InformationTypesEnum;
import gov.nasa.jpl.fspa.util.DatabaseUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class InformationTypesDaoImpl implements InformationTypesDao {
    @Override
    public List<InformationTypes> getInformationTypes() {
        List<InformationTypes> informationTypesList = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(InformationTypesQueries.GET_INFORMATION_TYPES);
             ResultSet resultSet = statement.executeQuery()) {

            InformationTypesEnum[] informationTypesEnumValues = InformationTypesEnum.values();

            while (resultSet.next()) {
                InformationTypes informationTypes = new InformationTypes();

                informationTypes.setId(Integer.valueOf(resultSet.getString("id")));
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
    public void saveInformationTypes(List<InformationTypes> informationTypesList) {
        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(InformationTypesQueries.CREATE_INFORMATION_TYPES)) {
            int informationTypesCounter = 0;

            for (InformationTypes informationTypes: informationTypesList) {
                System.out.println(informationTypes.getType().ordinal());

                preparedStatement.setInt(1, informationTypes.getType().ordinal());
                preparedStatement.setString(2, informationTypes.getIdentifier());
                preparedStatement.setString(3, informationTypes.getDisplayName());
                preparedStatement.setString(4, informationTypes.getDescription());
                preparedStatement.setString(5, informationTypes.getExternalLink());

                preparedStatement.addBatch();

                informationTypesCounter++;

                if (informationTypesCounter % StateVariableQueries.BATCH_SIZE == 0 || informationTypesCounter == informationTypesList.size()) {
                    preparedStatement.executeBatch();
                }
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
