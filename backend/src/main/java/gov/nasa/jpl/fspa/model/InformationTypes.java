package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvCustomBindByName;
import gov.nasa.jpl.fspa.util.ConvertIntegerToEnum;

public class InformationTypes {
    private Integer id;

    @CsvCustomBindByName(converter = ConvertIntegerToEnum.class)
    private InformationTypesEnum type;

    @CsvBindByName(required = true)
    private String identifier;

    @CsvBindByName
    private String displayName;

    @CsvBindByName
    private String description;

    @CsvBindByName
    private String externalLink;

    public InformationTypesEnum getType() {
        return type;
    }

    public void setType(InformationTypesEnum type) {
        this.type = type;
    }

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
}
