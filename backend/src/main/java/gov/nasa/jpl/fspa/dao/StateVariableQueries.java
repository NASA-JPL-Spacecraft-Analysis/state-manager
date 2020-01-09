package gov.nasa.jpl.fspa.dao;

public class StateVariableQueries {
    public static int BATCH_SIZE = 1000;

    public static String GET_STATE_VARIABLES = " select * from state_variables ";

    public static String GET_STATE_ENUMERATIONS = " select * from state_enumerations ";

    public static String GET_IDENTIFIERS = " select id, identifier from state_variables ";

    public static String CREATE_STATE_VARIABLE = " insert into state_variables " +
                                               " (identifier, displayName, type, units, source, description) " +
                                               " values " +
                                               " (?, ?, ?, ?, ?, ?) ";

    public static String PUT_STATE_VARIABLE = " update state_variables " +
                                              " set " +
                                              " identifier = ?, " +
                                              " displayName = ?, " +
                                              " type = ?, " +
                                              " units = ?, " +
                                              " source = ?, " +
                                              " description = ? " +
                                              " where id = ? ";
}
