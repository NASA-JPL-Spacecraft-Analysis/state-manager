package gov.nasa.jpl.fspa.relationships.dao;

public class RelationshipQueries {
    public static String CREATE_RELATIONSHIP = " insert into relationships "
                                             + " (display_name, description, subject_type, target_type, subject_type_id, target_type_id) "
                                             + " values "
                                             + " (?, ?, ?, ?, ?, ?) ";

    public static String CREATE_RELATIONSHIP_HISTORY = " insert into relationship_history "
                                                     + " (relationship_id, display_name, description, subject_type, target_type, subject_type_id, target_type_id, updated) "
                                                     + " values "
                                                     + " (?, ?, ?, ?, ?, ?, ?, now()) ";

    public static String GET_RELATIONSHIPS = " select * from relationships ";

    public static String GET_RELATIONSHIP_HISTORY = " select * from relationship_history ";

    public static String UPDATE_RELATIONSHIP = " update relationships "
                                             + " set "
                                             + " display_name = ?, "
                                             + " description = ?, "
                                             + " subject_type = ?, "
                                             + " target_type = ?, "
                                             + " subject_type_id = ?, "
                                             + " target_type_id = ? "
                                             + " where id = ? ";
}
