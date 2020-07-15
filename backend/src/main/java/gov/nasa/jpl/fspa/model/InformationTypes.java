package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;

public class InformationTypes extends IdentifierType {
    private Integer collectionId;
    private InformationTypesEnum type;

    @CsvBindByName
    private String displayName;

    @CsvBindByName
    private String description;

    @CsvBindByName
    private String externalLink;

    public Integer getCollectionId() {
        return collectionId;
    }

    public void setCollectionId(Integer collectionId) {
        this.collectionId = collectionId;
    }

    public InformationTypesEnum getType() {
        return type;
    }

    public void setType(InformationTypesEnum type) {
        this.type = type;
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
}
