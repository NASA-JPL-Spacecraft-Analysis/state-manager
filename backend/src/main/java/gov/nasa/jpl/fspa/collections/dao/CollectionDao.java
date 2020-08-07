package gov.nasa.jpl.fspa.collections.dao;

import gov.nasa.jpl.fspa.model.Collection;

import java.util.List;

public interface CollectionDao {
    Collection createCollection(String collectionName);

    int deleteCollection(int collectionId);

    List<Collection> getCollections();

    Collection updateCollection(int collectionId, String collectionName);
}
