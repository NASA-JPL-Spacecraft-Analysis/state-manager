package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;

public class StateEnumerationUpload {
    @CsvBindByName(required = true)
    private String identifier;

    @CsvBindByName(required = true)
    private String label;

    @CsvBindByName(required = true)
    private int value;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
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
