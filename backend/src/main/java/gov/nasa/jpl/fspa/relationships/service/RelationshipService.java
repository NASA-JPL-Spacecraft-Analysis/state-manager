package gov.nasa.jpl.fspa.relationships.service;

import gov.nasa.jpl.fspa.model.Relationship;
import gov.nasa.jpl.fspa.model.RelationshipHistory;

import java.util.List;
import java.util.Map;

public interface RelationshipService {
    Map<Integer, Relationship> getRelationships();

    Map<Integer, RelationshipHistory> getRelationshipHistory();

    Relationship modifyRelationship(Relationship relationship);

    Map<Integer, Relationship> saveRelationships(List<Relationship> relationshipList);
}
