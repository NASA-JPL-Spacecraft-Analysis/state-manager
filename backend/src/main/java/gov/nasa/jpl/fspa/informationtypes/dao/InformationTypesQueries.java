package gov.nasa.jpl.fspa.informationtypes.dao;

public class InformationTypesQueries {
    public static String CREATE_INFORMATION_TYPES = " insert into information_types "
                                                  + " (collection_id, type, identifier, display_name, description, external_link) "
                                                  + " values "
                                                  + " (?, ?, ?, ?, ?, ?) ";

    public static String GET_INFORMATION_TYPES = " select * from information_types where collection_id = ? ";
}
