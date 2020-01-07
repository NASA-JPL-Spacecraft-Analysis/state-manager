package gov.nasa.jpl.fspa.model;

import java.util.List;

public class StateVariable {
    private Integer id;
    private String identifier;
    private String displayName;
    private String type; // enum?
    private String units; // enum?
    private String source; // enum?
    private String description;
    private List<StateEnumeration> enumarations;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUnits() {
        return units;
    }

    public void setUnits(String units) {
        this.units = units;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<StateEnumeration> getEnumarations() {
        return enumarations;
    }

    public void setEnumarations(List<StateEnumeration> enumarations) {
        this.enumarations = enumarations;
    }

    /**
     * Surround each property with double quotes to support csv exporting.
     *
     * @return
     */
    @Override
    public String toString() {
        return "\"" + id
                + "\",\"" + identifier
                + "\",\"" + displayName
                + "\",\"" + type
                + "\",\"" + units
                + "\",\"" + source
                + "\",\"" + description
                + "\"\n";
    }
}
