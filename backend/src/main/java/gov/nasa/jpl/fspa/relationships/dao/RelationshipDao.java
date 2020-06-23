package gov.nasa.jpl.fspa.relationships.dao;

import gov.nasa.jpl.fspa.model.Relationship;
import gov.nasa.jpl.fspa.model.RelationshipHistory;

import java.util.List;

public interface RelationshipDao {
    List<Relationship> getRelationships(int collectionId);

    List<RelationshipHistory> getRelationshipHistory(int collectionId);

    Relationship modifyRelationship(int collectionId, Relationship relationship);
}
