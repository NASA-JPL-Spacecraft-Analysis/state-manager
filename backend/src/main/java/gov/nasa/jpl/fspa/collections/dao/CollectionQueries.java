package gov.nasa.jpl.fspa.collections.dao;

public class CollectionQueries {
    public static final String CREATE_COLLECTION = " insert into collections "
                                                 + " (name) "
                                                 + " values "
                                                 + " (?) ";

    public static final String GET_COLLECTIONS = " select * from collections ";

    public static final String UPDATE_COLLECTION = " update collections "
                                                 + " set name = ? "
                                                 + " where id = ? ";
}
