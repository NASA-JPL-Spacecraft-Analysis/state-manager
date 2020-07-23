package gov.nasa.jpl.fspa.collections.service;

import gov.nasa.jpl.fspa.model.Collection;

import java.util.Map;

public interface CollectionService {
    Collection createCollection(String collectionName);

    Map<Integer, Collection> getCollections();
}
