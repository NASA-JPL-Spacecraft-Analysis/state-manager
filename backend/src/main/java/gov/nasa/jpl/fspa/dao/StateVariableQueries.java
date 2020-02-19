package gov.nasa.jpl.fspa.dao;

public class StateVariableQueries {
    public static int BATCH_SIZE = 1000;

    public static String GET_RELATIONSHIPS = " select * from relationships ";

    public static String GET_STATE_VARIABLES = " select * from state_variables ";

    public static String GET_STATE_ENUMERATIONS = " select * from state_enumerations ";

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
                                               + " (identifier, displayName, type, units, source, description) "
                                               + " values "
                                               + " (?, ?, ?, ?, ?, ?) ";

    public static String CREATE_RELATIONSHIP = " insert into relationships "
                                             + " (display_name, description, subject_state_id, target_state_id) "
                                             + " values "
                                             + " (?, ?, ?, ?) ";

    public static String UPDATE_RELATIONSHIP = " update relationships "
                                             + " set "
                                             + " display_name = ? "
                                             + " description = ? "
                                             + " subject_state_id = ? "
                                             + " target_state_id = ? ";

    public static String UPDATE_STATE_VARIABLE = " update state_variables "
                                               + " set "
                                               + " identifier = ?, "
                                               + " displayName = ?, "
                                               + " type = ?, "
                                               + " units = ?, "
                                               + " source = ?, "
                                               + " description = ? "
                                               + " where id = ? ";

    public static String UPDATE_STATE_ENUMERATIONS = " update state_enumerations "
                                                   + " set "
                                                   + " state_variable_id = ?, "
                                                   + " label = ?, "
                                                   + " value = ? "
                                                   + " where id = ? ";
}
