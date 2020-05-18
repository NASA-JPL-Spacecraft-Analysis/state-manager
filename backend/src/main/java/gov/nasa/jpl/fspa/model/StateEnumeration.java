package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;

public class StateEnumeration {
    private Integer id;
    private int stateVariableId;

    @CsvBindByName(required = true)
    private String label;

    @CsvBindByName(required = true)
    private int value;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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
