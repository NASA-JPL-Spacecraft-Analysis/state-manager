package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;

public class InformationTypesUpload extends InformationTypes {
    @CsvBindByName(required = true)
    private String informationType;

    public String getInformationType() {
        return informationType;
    }

    public void setInformationType(String informationType) {
        this.informationType = informationType;
    }
}
