package gov.nasa.jpl.fspa.dao;

import gov.nasa.jpl.fspa.model.Relationship;
import gov.nasa.jpl.fspa.model.RelationshipHistory;

import java.util.List;

public interface RelationshipDao {
    List<Relationship> getRelationships();

    List<RelationshipHistory> getRelationshipHistory();

    Relationship saveRelationship(Relationship relationship);
}
