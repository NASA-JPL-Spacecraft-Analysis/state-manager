package gov.nasa.jpl.fspa.model;

public class Identifier {
    private int stateVariableId;
    private String identifier;

    public int getStateVariableId() {
        return stateVariableId;
    }

    public void setStateVariableId(int stateVariableId) {
        this.stateVariableId = stateVariableId;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
}
