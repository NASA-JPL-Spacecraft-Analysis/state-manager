package gov.nasa.jpl.fspa.relationships.service;

import gov.nasa.jpl.fspa.model.RelationshipHistory;
import gov.nasa.jpl.fspa.relationships.dao.RelationshipDao;
import gov.nasa.jpl.fspa.relationships.dao.RelationshipDaoImpl;
import gov.nasa.jpl.fspa.model.Relationship;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RelationshipServiceImpl implements RelationshipService {
    private final RelationshipDao relationshipDao;

    public RelationshipServiceImpl() {
        relationshipDao = new RelationshipDaoImpl();
    }

    @Override
    public Map<Integer, Relationship> getRelationships() {
        List<Relationship> relationships = relationshipDao.getRelationships();
        Map<Integer, Relationship> relationshipMap = new HashMap<>();

        for (Relationship relationship: relationships) {
            relationshipMap.put(relationship.getId(), relationship);
        }

        return relationshipMap;
    }

    @Override
    public Map<Integer, RelationshipHistory> getRelationshipHistory() {
        List<RelationshipHistory> relationshipHistoryList = relationshipDao.getRelationshipHistory();
        Map<Integer, RelationshipHistory> relationshipHistoryMap = new HashMap<>();

        for (RelationshipHistory relationshipHistory: relationshipHistoryList) {
            relationshipHistoryMap.put(relationshipHistory.getId(), relationshipHistory);
        }

        return relationshipHistoryMap;
    }


    @Override
    public Relationship modifyRelationship(Relationship relationship) {
        return relationshipDao.modifyRelationship(relationship);
    }

    @Override
    public Map<Integer, Relationship> saveRelationships(List<Relationship> relationshipList) {
        relationshipDao.saveRelationshipList(relationshipList);

        return getRelationships();
    }
}
