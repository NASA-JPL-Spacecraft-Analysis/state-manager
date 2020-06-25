package gov.nasa.jpl.fspa.events.dao;

public class EventQueries {
    public static String CREATE_EVENT = " insert into events "
                                      + " (identifier, collection_id, display_name, description, external_link) "
                                      + " values "
                                      + " (?, ?, ?, ?, ?) ";


    public static String CREATE_EVENT_HISTORY = " insert into event_history "
                                      + " (event_id, collection_id, identifier, display_name, description, external_link, editable, updated) "
                                      + " values "
                                      + " (?, ?, ?, ?, ?, ?, ?, now()) ";

    public static String GET_EVENT_HISTORY_LIST = " select * from event_history where collection_id = ? ";

    public static String GET_EVENT_LIST = " select * from events where collection_id = ? ";

    public static String GET_IDENTIFIERS = " select id, identifier from events ";

    public static String UPDATE_EVENT = " update events "
                                      + " set "
                                      + " identifier = ?, "
                                      + " collection_id = ?, "
                                      + " display_name = ?, "
                                      + " description = ?, "
                                      + " external_link = ? "
                                      + " where id = ? ";
}
