package gov.nasa.jpl.fspa.dao;

public class StateVariableQueries {
    public static int BATCH_SIZE = 1000;

    public static String GET_STATE_VARIABLES = " select * from state_variables ";

    public static String GET_STATE_ENUMERATIONS = " select * from state_enumerations ";

    public static String GET_STATE_HISTORY = " select * from state_history ";

    public static String GET_STATE_ENUMERATIONS_BY_STATE_VARIABLE_ID = " select * from state_enumerations "
                                                                     + " where state_variable_id = ? ";

    public static String GET_IDENTIFIERS = " select id, identifier from state_variables ";

    public static String CREATE_STATE_ENUMERATIONS = " insert into state_enumerations "
                                                   + " (state_variable_id, label, value) "
                                                   + " values "
                                                   + " (?, ?, ?) ";

    public static String DELETE_STATE_ENUMERATIONS = " delete from state_enumerations "
                                                   + " where id = ? ";

    public static String CREATE_STATE_VARIABLE = " insert into state_variables "
                                               + " (identifier, display_name, type, units, source, subsystem, description) "
                                               + " values "
                                               + " (?, ?, ?, ?, ?, ?, ?) ";

    public static String CREATE_STATE_HISTORY = " insert into state_history"
                                              + " (state_id, identifier, display_name, type, units, source, subsystem, description, updated) "
                                              + " values "
                                              + " (?, ?, ?, ?, ?, ?, ?, ?, now()) ";

    public static String UPDATE_STATE_VARIABLE = " update state_variables "
                                               + " set "
                                               + " identifier = ?, "
                                               + " display_name = ?, "
                                               + " type = ?, "
                                               + " units = ?, "
                                               + " source = ?, "
                                               + " subsystem = ?, "
                                               + " description = ? "
                                               + " where id = ? ";

    public static String UPDATE_STATE_ENUMERATIONS = " update state_enumerations "
                                                   + " set "
                                                   + " state_variable_id = ?, "
                                                   + " label = ?, "
                                                   + " value = ? "
                                                   + " where id = ? ";
}
