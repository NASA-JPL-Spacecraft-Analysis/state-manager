package gov.nasa.jpl.fspa.dao;

import gov.nasa.jpl.fspa.model.Relationship;

import java.util.List;

public interface RelationshipDao {
    List<Relationship> getRelationships();

    Relationship saveRelationship(Relationship relationship);
}
