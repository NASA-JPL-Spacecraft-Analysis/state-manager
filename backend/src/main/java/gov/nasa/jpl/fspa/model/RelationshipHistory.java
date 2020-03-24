package gov.nasa.jpl.fspa.model;

public class RelationshipHistory extends Relationship {
    private Integer relationshipId;
    private String updated;

    public Integer getRelationshipId() {
        return relationshipId;
    }

    public void setRelationshipId(Integer relationshipId) {
        this.relationshipId = relationshipId;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }
}
