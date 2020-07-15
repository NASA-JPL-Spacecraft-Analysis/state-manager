package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;

public class IdentifierType {
    protected Integer id;

    @CsvBindByName(required = true)
    protected String identifier;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
}
