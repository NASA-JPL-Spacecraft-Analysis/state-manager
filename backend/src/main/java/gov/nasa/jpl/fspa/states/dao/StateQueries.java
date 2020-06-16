package gov.nasa.jpl.fspa.states.dao;

public class StateQueries {
    public static int BATCH_SIZE = 1000;

    public static String GET_STATES = " select * from states where collection_id = ? ";

    public static String GET_STATE_ENUMERATIONS = " select * from state_enumerations where collection_id = ? ";

    public static String GET_STATE_HISTORY = " select * from state_history where collection_id = ? ";

    public static String GET_STATE_ENUMERATIONS_BY_STATE_ID = " select * from state_enumerations "
                                                            + " where state_id = ? ";

    public static String GET_IDENTIFIERS = " select id, identifier from states where collection_id = ? ";

    public static String CREATE_STATE_ENUMERATIONS = " insert into state_enumerations "
                                                   + " (collection_id, state_id, label, value) "
                                                   + " values "
                                                   + " (?, ?, ?, ?) ";

    public static String DELETE_STATE_ENUMERATIONS = " delete from state_enumerations "
                                                   + " where id = ? ";

    public static String CREATE_STATE = " insert into states "
                                      + " (collection_id, identifier, display_name, type, units, source, subsystem, description) "
                                      + " values "
                                      + " (?, ?, ?, ?, ?, ?, ?, ?) ";

    public static String CREATE_STATE_HISTORY = " insert into state_history"
                                              + " (collection_id, state_id, identifier, display_name, type, units, source, subsystem, description, updated) "
                                              + " values "
                                              + " (?, ?, ?, ?, ?, ?, ?, ?, ?, now()) ";

    public static String UPDATE_STATE = " update states "
                                      + " set "
                                      + " collection_id = ?, "
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
                                                   + " collection_id = ?, "
                                                   + " state_id = ?, "
                                                   + " label = ?, "
                                                   + " value = ? "
                                                   + " where id = ? ";
}
