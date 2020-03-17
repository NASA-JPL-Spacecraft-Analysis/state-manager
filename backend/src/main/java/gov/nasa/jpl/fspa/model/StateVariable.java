package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;

public class StateVariable {
    private Integer id;

    @CsvBindByName(required = true)
    private String identifier;

    @CsvBindByName(required = true)
    private String displayName;

    @CsvBindByName(required = true)
    private String type; // enum?

    @CsvBindByName(required = true)
    private String units; // enum?

    @CsvBindByName(required = true)
    private String source; // enum?

    @CsvBindByName(required = true)
    private String subsystem;

    @CsvBindByName
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

    public String getSubsystem() {
        return subsystem;
    }

    public void setSubsystem(String subsystem) {
        this.subsystem = subsystem;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Surround each property with double quotes to support csv exporting.
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
