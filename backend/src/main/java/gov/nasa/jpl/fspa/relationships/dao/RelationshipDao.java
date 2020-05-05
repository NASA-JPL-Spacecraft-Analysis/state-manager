package gov.nasa.jpl.fspa.relationships.dao;

import gov.nasa.jpl.fspa.model.Relationship;
import gov.nasa.jpl.fspa.model.RelationshipHistory;

import java.util.List;

public interface RelationshipDao {
    List<Relationship> getRelationships();

    List<RelationshipHistory> getRelationshipHistory();

    Relationship modifyRelationship(Relationship relationship);

    void saveRelationshipList(List<Relationship> relationshipList);
}
