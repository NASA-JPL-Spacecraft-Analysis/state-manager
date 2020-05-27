package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;

public class Event {
    private Integer id;

    @CsvBindByName(required = true)
    private String identifier;

    @CsvBindByName(required = true)
    private String displayName;

    @CsvBindByName
    private String description;

    @CsvBindByName
    private String externalLink;
    private boolean editable;

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

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExternalLink() {
        return externalLink;
    }

    public void setExternalLink(String externalLink) {
        this.externalLink = externalLink;
    }

    public boolean getEditable() {
        return editable;
    }

    public void setEditable(boolean editable) {
        this.editable = editable;
    }
}
