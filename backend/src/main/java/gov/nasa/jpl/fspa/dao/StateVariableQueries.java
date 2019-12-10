package gov.nasa.jpl.fspa.dao;

public class StateVariableQueries {
    public static String GET_STATE_VARIABLES = " select * from state_variables";

    public static String POST_STATE_VARIABLE = " insert into state_variables " +
                                               " (identifier, name, type, units, source, description) " +
                                               " values " +
                                               " (?, ?, ?, ?, ?, ?) ";

    public static String PUT_STATE_VARIABLE = " update state_variables " +
                                              " set " +
                                              " identifier = ?, " +
                                              " name = ?, " +
                                              " type = ?, " +
                                              " units = ?, " +
                                              " source = ?, " +
                                              " description = ? " +
                                              " where id = ? ";
}
