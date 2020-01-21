package gov.nasa.jpl.fspa.model;

public class StateEnumeration {
    private int id;
    private int stateVariableId;
    private String label;
    private int value;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStateVariableId() {
        return stateVariableId;
    }

    public void setStateVariableId(int stateVariableId) {
        this.stateVariableId = stateVariableId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
