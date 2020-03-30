package gov.nasa.jpl.fspa.model;

public class StateHistory extends StateVariable{
    private Integer stateId;
    private String updated;

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
