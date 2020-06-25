package gov.nasa.jpl.fspa.model;

public class StateHistory extends State {
    private Integer stateId;
    private String updated;

    public StateHistory() {}

    public StateHistory(State state) {
        this.setCollectionId(state.getCollectionId());
        this.setIdentifier(state.getIdentifier());
        this.setDisplayName(state.getDisplayName());
        this.setType(state.getType());
        this.setUnits(state.getUnits());
        this.setSource(state.getSource());
        this.setSubsystem(state.getSubsystem());
        this.setDescription(state.getDescription());
    }

    public Integer getStateId() {
        return stateId;
    }

    public void setStateId(Integer stateId) {
        this.stateId = stateId;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }
}
