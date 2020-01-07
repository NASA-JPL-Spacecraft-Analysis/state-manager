package gov.nasa.jpl.fspa.model;

public class StateEnumeration {
    private int id;
    private int stateVariableId;
    private String enumValue;
    private String value;

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

    public String getEnumValue() {
        return enumValue;
    }

    public void setEnumValue(String enumValue) {
        this.enumValue = enumValue;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
