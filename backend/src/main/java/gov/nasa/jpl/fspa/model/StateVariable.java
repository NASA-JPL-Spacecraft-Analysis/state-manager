package gov.nasa.jpl.fspa.model;

public class StateVariable {
    private Integer id;
    private String identifier;
    private String name;
    private String type; // enum?
    private String units; // enum?
    private String source; // enum?
    private String description;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    /**
     * Surround each property with double quotes to support csv exporting.
     *
     * @return
     */
    @Override
    public String toString() {
        return "\"" + id
                + "\",\"" + identifier
                + "\",\"" + name
                + "\",\"" + type
                + "\",\"" + units
                + "\",\"" + source
                + "\",\"" + description
                + "\"\n";
    }
}
