package gov.nasa.jpl.fpsa.dao;

import gov.nasa.jpl.fpsa.util.DatabaseUtil;
import gov.nasas.jpl.fpsa.model.TestString;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TestStringDaoImpl implements TestStringDao {
    @Override
    public List<TestString> getTestStrings() {
        List<TestString> testStrings = new ArrayList<>();

        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement statement = connection.prepareStatement(TestStringQueries.TEST_STRINGS);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                TestString testString = new TestString();

                testString.setId(Integer.valueOf(resultSet.getString("id")));
                testString.setData(resultSet.getString("data"));

                testStrings.add(testString);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return testStrings;
    }

    @Override
    public void postNewData(String data) {
        try (Connection connection = DatabaseUtil.getDataSource().getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(TestStringQueries.POST_NEW_DATA)) {

            preparedStatement.setString(1, data);

            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
