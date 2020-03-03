package gov.nasa.jpl.fspa.model;

public class Relationship {
    private Integer id;
    private String displayName;
    private String description;
    private Integer subjectStateId;
    private Integer targetStateId;
    private String type;
    private String targetName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getSubjectStateId() {
        return subjectStateId;
    }

    public void setSubjectStateId(Integer subjectStateId) {
        this.subjectStateId = subjectStateId;
    }

    public Integer getTargetStateId() {
        return targetStateId;
    }

    public void setTargetStateId(Integer targetStateId) {
        this.targetStateId = targetStateId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTargetName() {
        return targetName;
    }

    public void setTargetName(String targetName) {
        this.targetName = targetName;
    }
}
