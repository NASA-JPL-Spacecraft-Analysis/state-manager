package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;

public class StateEnumerationUpload extends StateEnumeration {
    @CsvBindByName(required = true)
    private String stateIdentifier;

    public String getStateIdentifier() {
        return stateIdentifier;
    }

    public void setStateIdentifier(String stateIdentifier) {
        this.stateIdentifier = stateIdentifier;
    }
}
