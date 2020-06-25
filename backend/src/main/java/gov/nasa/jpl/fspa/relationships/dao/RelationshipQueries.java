package gov.nasa.jpl.fspa.relationships.dao;

public class RelationshipQueries {
    public static String CREATE_RELATIONSHIP = " insert into relationships "
                                             + " (collection_id, display_name, description, subject_type, target_type, subject_type_id, target_type_id) "
                                             + " values "
                                             + " (?, ?, ?, ?, ?, ?, ?) ";

    public static String CREATE_RELATIONSHIP_HISTORY = " insert into relationship_history "
                                                     + " (collection_id, display_name, description, subject_type, target_type, subject_type_id, target_type_id, relationship_id, updated) "
                                                     + " values "
                                                     + " (?, ?, ?, ?, ?, ?, ?, ?, now()) ";

    public static String GET_RELATIONSHIPS = " select * from relationships where collection_id = ? ";

    public static String GET_RELATIONSHIP_HISTORY = " select * from relationship_history where collection_id = ? ";

    public static String UPDATE_RELATIONSHIP = " update relationships "
                                             + " set "
                                             + " collection_id = ?, "
                                             + " display_name = ?, "
                                             + " description = ?, "
                                             + " subject_type = ?, "
                                             + " target_type = ?, "
                                             + " subject_type_id = ?, "
                                             + " target_type_id = ? "
                                             + " where id = ? ";
}
