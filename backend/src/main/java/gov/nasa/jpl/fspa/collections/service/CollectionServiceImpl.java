package gov.nasa.jpl.fspa.collections.service;

import gov.nasa.jpl.fspa.collections.dao.CollectionDao;
import gov.nasa.jpl.fspa.collections.dao.CollectionDaoImpl;
import gov.nasa.jpl.fspa.model.Collection;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CollectionServiceImpl implements CollectionService {
    private final CollectionDao collectionDao;

    public CollectionServiceImpl() {
        collectionDao = new CollectionDaoImpl();
    }

    @Override
    public Collection createCollection(String collectionName) {
        return collectionDao.createCollection(collectionName);
    }

    @Override
    public Map<Integer, Collection> getCollections() {
        List<Collection> collectionList = collectionDao.getCollections();
        Map<Integer, Collection> collectionMap = new HashMap<>();

        for (Collection collection: collectionList) {
            collectionMap.put(collection.getId(), collection);
        }

        return collectionMap;
    }
}
