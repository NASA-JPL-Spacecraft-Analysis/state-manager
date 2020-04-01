package gov.nasa.jpl.fspa.model;

public class StateHistory extends StateVariable{
    private Integer stateId;
    private String updated;

    public StateHistory() {}

    public StateHistory(StateVariable stateVariable) {
        this.setStateId(stateVariable.getId());
        this.setIdentifier(stateVariable.getIdentifier());
        this.setDisplayName(stateVariable.getDisplayName());
        this.setType(stateVariable.getType());
        this.setUnits(stateVariable.getUnits());
        this.setSource(stateVariable.getSource());
        this.setSubsystem(stateVariable.getSubsystem());
        this.setDescription(stateVariable.getDescription());
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
