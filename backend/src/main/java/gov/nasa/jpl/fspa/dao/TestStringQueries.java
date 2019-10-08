package gov.nasa.jpl.fspa.dao;

public class TestStringQueries {
    public static String TEST_STRINGS = " select * from test_strings ";

    public static String POST_NEW_DATA = " insert into test_strings " +
                                         " (data) " +
                                         " values " +
                                         " (?) ";
}
