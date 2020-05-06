package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;

public class StateEnumerationUpload {
    @CsvBindByName(required = true)
    private String stateIdentifier;

    @CsvBindByName(required = true)
    private String label;

    @CsvBindByName(required = true)
    private int value;

    public String getStateIdentifier() {
        return stateIdentifier;
    }

    public void setStateIdentifier(String stateIdentifier) {
        this.stateIdentifier = stateIdentifier;
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
