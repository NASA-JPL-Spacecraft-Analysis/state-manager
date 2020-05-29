package gov.nasa.jpl.fspa.events.dao;

public class EventQueries {
    public static String CREATE_EVENT = " insert into events "
                                      + " (identifier, display_name, description, external_link) "
                                      + " values "
                                      + " (?, ?, ?, ?) ";


    public static String CREATE_EVENT_HISTORY = " insert into event_history "
                                      + " (event_id, identifier, display_name, description, external_link, editable, updated) "
                                      + " values "
                                      + " (?, ?, ?, ?, ?, ?, now()) ";

    public static String GET_EVENT_HISTORY_LIST = " select * from event_history ";

    public static String GET_EVENT_LIST = " select * from events ";

    public static String UPDATE_EVENT = " update events "
                                      + " set "
                                      + " identifier = ?, "
                                      + " display_name = ?, "
                                      + " description = ?, "
                                      + " external_link = ? "
                                      + " where id = ? ";
}
